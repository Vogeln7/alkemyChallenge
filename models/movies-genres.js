const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const MovieGenre = sequelize.define('movie-genre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, {timestamps: false});

module.exports = MovieGenre;