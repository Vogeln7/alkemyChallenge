const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Genre = sequelize.define('genre', {
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
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {timestamps: false});

module.exports = Genre;