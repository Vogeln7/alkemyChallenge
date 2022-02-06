const Character = require('../models/characters');
const Movie = require('../models/movies');
const Genre = require('../models/genres');
const MovieCharacter = require('../models/movies-characters');
const MovieGenre = require('../models/movies-genres');
const { Op } = require('sequelize');

getMovies = async (req, res) => {
    const { name, genre, order } = req.query;    
    
    const movieFilters = {};
    if (name) {
        movieFilters.title = {
            [Op.like]: `${name}%`
        }
    }    
    // Set Order by Id as predefined
    let orderFilter = ['id', 'ASC'];    
    // Validates Order By creationDate is ASC||DESC 
    if (order) { 
        const casedOrder = order.toUpperCase();
        if(casedOrder === 'ASC' || casedOrder === 'DESC') { orderFilter = ['creationDate', order] }
        else return res.status(400).send('Use a valid order (ASC/DESC)');
    }
    
    const genreFilters = {};
    if (genre) { genreFilters.id = genre }
    
    try {
        const movies = await Movie.findAll({
            attributes  : ["id", "title", "imageUrl", "creationDate"],
            where: movieFilters,
            order: [orderFilter],
            include: [{
                model: Genre,
                where: genreFilters,
                attributes: []
            }]
        })
        return res.status(200).send(movies)
    }
    catch(err) { return res.status(400).send(err) }
}

getMovieById = async(req,res)=>{
    const id = req.params.id;
    try {
       const movie =  await Movie.findByPk(id, {
           include : [{
               model: Character,
               attributes: ['id', 'name'],
               through: {
                   attributes: []
               }
           }]
       });
       return res.status(200).send(movie);
    } catch (error) {
        console.log(error);
    }
}

postMovie = async(req,res)=>{
    const { imageUrl, title, rate, creationDate, characters, genres } = req.body;

    try {
        if( imageUrl && title && rate && creationDate ){
            let message = "Movie added";
            const newMovie = await Movie.create({
                imageUrl,
                title,
                rate,
                creationDate
            });
            // Add characters to movie
            if(characters){
                const charactersToAdd = await Character.findAll({
                    where: {
                        id:characters
                    }
                });
                if( charactersToAdd.length > 0 ) { 
                    await newMovie.addCharacters(charactersToAdd); 
                    message += ' | Characters added'
                } 
                else { message += ' | Characters NOT added' }
            } 
            
            // Add genres to movie
            if (genres){
                const genresToAdd = await Genre.findAll({
                    where: {
                        id:genres
                    }
                });
                if( genresToAdd.length > 0) {
                    await newMovie.addGenres(genresToAdd);
                    message += ' | Genres added'
                } 
                else { message += ' | Genres NOT added' }
            }
            return res.status(200).send(message);
        } 
        else { return res.status(400).send('Missing Fields') }
        
    } catch (err) {
        console.log(err)
    }    
}

postMovieById = async (req, res) => {
    const id = req.params.id;
    const { imageUrl, title, rate, creationDate, characters, genres } = req.body;
    try{
        if (isNaN(id)) { return res.status(400).send( 'Invalid id ')}
        if (imageUrl && title && rate && creationDate) {
            await Movie.update({
                imageUrl: imageUrl,
                title: title,
                rate: rate,
                creationDate: creationDate
            },
            {
                where: {id: id}                
            })
            // Edit Character association
            if (characters && !characters.some(isNaN)) {
                await MovieCharacter.destroy({
                    where: {
                        movieId: id,
                        characterId: { [Op.notIn]: characters }
                    }
                })
                
                const editedNewCharacters = characters.map(character => {
                    MovieCharacter.findOrCreate({
                        characterId: character,
                        movieId:id,
                        where:{
                            movieId:id,
                            characterId:character
                        }
                    })
                })                
                await Promise.all(editedNewCharacters);                
            }
            // Edit Genre association
            if (genres && !genres.some(isNaN)) {
                await MovieGenre.destroy({
                    where: {
                        movieId: id,
                        genreId: { [Op.notIn]: genres }
                    }
                })
                
                const editedNewGenre = genres.map(genre => {
                    MovieGenre.findOrCreate({
                        genreId: genre,
                        movieId:id,
                        where:{
                            movieId:id,
                            genreId:genre
                        }
                    })
                })                
                await Promise.all(editedNewGenre)
            }
            return res.send('Succesfully edited!').status(200)
        }
        else { res.status(400).send('Missing Fields') }
    }
    catch(err) { res.send(err) }
}

deleteMovie = async (req, res) => {
    const id = req.params.id;
    try {
        await Movie.destroy({
            where: { id: id }
        })
        return res.status(200).send('Deleted movie')
    }
    catch(err) { return res.status(400).send(err) }
}

module.exports = {
    getMovies,
    getMovieById,
    postMovie,
    postMovieById,
    deleteMovie
}