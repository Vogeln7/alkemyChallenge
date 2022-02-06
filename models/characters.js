const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Character = sequelize.define('character', {
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
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    weight: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    history: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {timestamps: false});

module.exports = Character;