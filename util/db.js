const {mysql} = require('C:/Users/david/configs/config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('disney_challenge', mysql.username, mysql.password, {
    dialect: mysql.dialect,
    host: mysql.host
});

module.exports = sequelize;

