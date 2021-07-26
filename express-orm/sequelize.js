const Seuqelize = require('sequelize');
const UserModel = require('./model/user');

const sequelize = new Seuqelize('system', 'root', 'haohaoxuexi', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('success');
  })
  .catch(() => {
    console.log('error');
  });

const User = UserModel(sequelize, Seuqelize.DataTypes);

sequelize.User = User;

module.exports = sequelize;