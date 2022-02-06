const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const MovieCharacter = sequelize.define('movie-character', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, {timestamps: false});

module.exports = MovieCharacter;