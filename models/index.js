const { Model, DataTypes } = require('sequelize');
const User = require('./User');
const Country = require('./Country');
const sequelize = require('../config/connection');

module.exports = { User, Country };

