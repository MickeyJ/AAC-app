require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

router.get('/me', (req, res, next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    db.User()
      .where({user_id: payload.id})
      .first()
      .then(user =>{
        if(user){
          delete user.password_hash;
          db.Category()
            .where({user_category_id: user.user_id})
            .then(category =>{
              const category_ids = category.map(c =>  c.category_id);
              db.Phrase()
                .whereIn('category_phrase_id', category_ids)
                .then(phrase =>{
                  category.map(x =>{
                    x.phrases = phrase.filter( phrase =>
                      x.category_id === phrase.category_phrase_id
                    )
                  });
                  res.status(201).send({user, category, token});
                });
            })
        } else {
          res.status(422).send({ message: 'User Verification Error' });
        }
      })
  } else {
    res.status(401).send({ message: 'No Authorization Header' });
  }
});

router.post('/register', function(req, res, next) {

  const newUser = req.body;
  newUser.password_hash = bcrypt.hashSync(newUser.password, 10);
  delete newUser.password;

  db.User()
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

});

router.post('/login', function(req, res, next) {
  db.User()
    .whereRaw('lower(email) = ?', req.body.email.toLowerCase())
    .first()
    .then(user =>{
      if(user){
        if(bcrypt.compareSync(req.body.password, user.password_hash)){
          delete user.password_hash;

          const id = user.user_id;
          const token = jwt.sign({id}, process.env.JWT_SECRET);

          db.Category()
          .where({user_category_id: id})
          .then(category =>{

            // const category_ids = [];
            const category_ids = category.map(c =>  c.category_id);

            db.Phrase()
            .whereIn('category_phrase_id', category_ids)
            .then(phrase =>{

              category.map(x =>{
                x.phrases = phrase.filter( phrase =>
                  x.category_id === phrase.category_phrase_id
                )
              });
              res.status(201).send({user, category, token});
            });
          })
        } else {
          res.status(422).send('Email or password does not match');
        }
      } else {
        res.status(422).send('Email or password does not match');
      }
    });

});

module.exports = router;
