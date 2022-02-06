const Character = require('../models/characters');
const Movie = require('../models/movies');
const MovieCharacter = require('../models/movies-characters');
const { Op } = require('sequelize');



getCharacters = async (req, res) => {
    const { name, age, weight, movies } = req.query
    const characterFilters = {};
    if (name) {
        characterFilters.name = {
            [Op.like]: `${name}%`
        }
    }
    if (age) { characterFilters.age = age }
    if (weight) { characterFilters.weight = weight }

    const movieFilters = {};
    if (movies) { movieFilters.id = movies }
    
    try {
        const characters = await Character.findAll({
            attributes  : ["id","name", "imageUrl"],
            where: characterFilters,
            include: [{
                model: Movie,
                where: movieFilters,
                attributes: []
            }]                
        })
        return res.send(characters)
    }
    catch(err) { res.send(err) }    
}

getCharacterById = async (req, res) => {
    const id = req.params.id;
    try {
        const character = await Character.findByPk(id, {
            include: [{
                model: Movie,
                attributes: ["id", "title"],
                through: {
                    attributes: []
                }            
            }]
        })
        return res.send(character);
    }
    catch(err) { res.send(err) }
}

postCharacter = async (req, res) => {
    const { imageUrl, name, age, weight, history, movies } = req.body;

    try {    
        if (imageUrl && name && age && weight && history) {
            const newCharacter = await Character.create({
                imageUrl: imageUrl,
                name: name,
                age: age,
                weight: weight,
                history: history            
            })
            
            if (movies) {
                const moviesToAdd = await Movie.findAll({
                    where: {id: movies}
                })                
                if(moviesToAdd.length > 0) { newCharacter.addMovies(moviesToAdd) }
                else { return res.status(404).send('Character created but movie does not exist!') }
            }                
            return res.status(200).send('Characted created successfully!');
        }
        else { return res.status(400).send('Invalid or missing fields')}
    }
    catch(err) {res.send(err)}    
}

postCharacterById = async (req, res) => {
    const id = req.params.id;
    const { imageUrl, name, age, weight, history, movies } = req.body;
    
    try{
        if (isNaN(id)) { return res.status(400).send( 'Invalid id')}
        if (imageUrl && name && age && weight && history) {
             await Character.update({
                imageUrl: imageUrl,
                name: name,
                age: age,
                weight: weight,
                history: history
            },
            {
                where: {id: id}                
            })

            if (movies) {
                // Delete movies not included in the body request
                await MovieCharacter.destroy({
                    where: {
                        characterId: id,
                        movieId: { [Op.notIn]: movies }
                    }
                })
                // Add movies included in the body request, that are not present in the DB
                const editedNewMovies = movies.map(movie => {
                    MovieCharacter.findOrCreate({
                        characterId: id,
                        movieId:movie,
                        where:{
                            movieId:movie,
                            characterId:id
                        }
                    })
                })
                await Promise.all(editedNewMovies);
            }
            return res.status(200).send('Character edited succesfully!')
        }
        else { return res.sendStatus(400) }
    }
    catch(err) { res.send(err) }
}

deleteCharacter = async (req, res) => {
    const id = req.params.id;
    try {
        await Character.destroy({
            where: { id: id }
        })
        return res.status(200).send('Deleted character!')
    }
    catch(err) { return res.send(err) }
}

module.exports = {
    getCharacters,
    getCharacterById,
    postCharacter,
    postCharacterById,
    deleteCharacter
}