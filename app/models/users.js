'use strict';
module.exports = (sequelize, DataTypes) => {
  const config = require('../config');  
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcryptjs");
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: (users, options) => {
        users.password = bcrypt.hashSync(users.password, 8);
      }      
    }
});

Users.compareHash = async function(password, hash) {
  return await bcrypt.compare(password,hash);
};

Users.generateToken = async function(user) {
  const token = await jwt.sign({ _id: user.id }, config.privatekey, { expiresIn: 60 * 60 }); 
  return token;
};

return Users;
};