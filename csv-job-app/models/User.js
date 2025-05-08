const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      is: /^\d{10}$/
    },
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true
    },
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  }
});

module.exports = User;
