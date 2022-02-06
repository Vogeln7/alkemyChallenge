const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Movie = sequelize.define('movie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    creationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {timestamps: false});

module.exports = Movie;