const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const { User } = require('./sequelize');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  console.log(req.cookies)
  next();
})

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
})

app.post('/api/login', async function(req, res) {
  const {username, password} = req.body;
  const user = await User.findOne({raw: true, where: {username, password}});
  res.cookie('loginToken', user.userId, {
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
  });
  res.json({
    data: {
      haha: 'haha'
    }
  })
})

app.listen(8080, function() {
  console.log('server start');
});
