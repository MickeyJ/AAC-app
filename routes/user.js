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
    db.getMe(req, res, payload, token, db.getCategory, db.getPhrases)
  }
  else res.status(401).send({ message: 'No Authorization Header' });
});

router.post('/register', function(req, res, next) {
  const newUser = req.body;
  newUser.password_hash = bcrypt.hashSync(newUser.password, 10);
  delete newUser.password;
  db.setUser(res, newUser);
});


router.post('/login', function(req, res, next) {
  db.getUser(req, res, db.getCategory, db.getPhrases)
});


module.exports = router;
