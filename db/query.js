const db = require('./');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getMe = function(rec, res, payload, token, cb1, cb2){
  return db.User()
    .where({user_id: payload.id})
    .first()
    .then(user =>{
      if(user) {
        delete user.password_hash;
        const id = user.user_id;
        cb1(res, user, id, token, cb2)
      }
      else res.status(422).send({ message: 'User Verification Error' });
    });
};

exports.setUser = function(res, newUser){
  return db.User()
    .whereRaw('lower(email) = ?', newUser.email.toLowerCase())
    .then(existingUser =>{
      if(!existingUser.length){
        db.User()
          .insert(newUser)
          .returning('*')
          .then(userCred =>{
            const user = userCred[0];
            const id = user.user_id;
            const token = jwt.sign({id}, process.env.JWT_SECRET);
            delete user.password_hash;
            res.status(201).send({user, token});
          })
      } else {
        res.status(422).send('Email Already Exists');
      }
    });

};

exports.getUser = function(rec, res, cb1, cb2){
  return db.User()
    .whereRaw('lower(email) = ?', rec.body.email.toLowerCase())
    .first()
    .then(user =>{
      if(user) {
        if (bcrypt.compareSync(rec.body.password, user.password_hash)) {
          delete user.password_hash;
          const id = user.user_id;
          const token = jwt.sign({id}, process.env.JWT_SECRET);
          cb1(res, user, id, token, cb2)
        }
        else res.status(422).send('Email or password does not match');
      }
      else res.status(422).send('Email or password does not match');
    });
};

exports.getCategory = function(res, user, id, token, cb){
  return db.Category()
    .where({user_category_id: id})
    .then(category =>{
      const category_ids = category.map(c =>  c.category_id);
      cb(res, user, token, category, category_ids)
    })
};

exports.getPhrases = function(res, user, token, category, category_ids){
  return db.Phrase()
    .whereIn('category_phrase_id', category_ids)
    .then(phrase =>{
      category.map(x =>{
        x.phrases = phrase.filter( phrase =>
          x.category_id === phrase.category_phrase_id
        )
      });
      res.status(201).send({user, category, token});
    });
};