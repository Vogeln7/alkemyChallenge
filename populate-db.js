const Genre = require('./models/genres');
const Character = require('./models/characters');
const Movie = require('./models/movies');
const MovieCharacter = require('./models/movies-characters');
const MovieGenre = require('./models/movies-genres');

const sequelize = require('./util/db');

const genres = [
    {
        imageUrl: 'https://pegi.info/sites/default/files/inline-images/age-3-black_0.jpg',
        name: 'Adventure'
    },
    {
        imageUrl: 'https://pegi.info/sites/default/files/inline-images/age-7-black.jpg',
        name: 'Fantasy'
    },
    {
        imageUrl: 'https://pegi.info/sites/default/files/inline-images/age-7-black.jpg',
        name: 'Family'
    },
    {
        imageUrl: 'https://pegi.info/sites/default/files/inline-images/violence-black-ES.jpg',
        name: 'Action'
    },
    {
        imageUrl: 'https://pegi.info/sites/default/files/inline-images/drugs-black-ES.jpg',
        name: 'Superhero'
    }
]

const characters = [
    {
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/d/d2/Profile_-_Merida.jpeg/revision/latest?cb=20190314143129',
        name: 'Merida',
        age: 16,
        weight: 50,
        history: 'Princess Merida of DunBroch is the main protagonist of the 2012 Disney/Pixar film Brave.'
    },
    {
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/2/21/Profile_-_Iron_Man.jpg/revision/latest/scale-to-width-down/516?cb=20190429002338',
        name: 'Iron Man',
        age: 52,
        weight: 85,
        history: 'Tony Stark is a genius, billionaire, playboy, and philanthropist. '
    },
    {
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/5/5e/Mufasa_Lion_King_.jpg/revision/latest/scale-to-width-down/516?cb=20180913082349',
        name: 'Mufasa',
        age: 5,
        weight: 190,
        history: 'Mufasa was born the first son of Ahadi and Uru, in Pride Rock, the eldest brother of Askari, and as the heir to the throne of Pride Rock.'
    },{
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/6/66/Profile_-_Scar.jpeg/revision/latest/scale-to-width-down/516?cb=20190312021344',
        name: 'Scar',
        age: 6,
        weight: 178,
        history: 'Scar was the second born son of Ahadi and Uru. He was once named Taka (meaning "waste" or "want" in Swahili).'
    },{
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/d/d0/Profile_-_Mam%C3%A1_Coco.png/revision/latest/scale-to-width-down/350?cb=20190315013129',
        name: 'Coco Rivera',
        age: 80,
        weight: 55,
        history: 'Mamá Coco is Miguels cherished great-grandmother.'
    },{
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/0/00/Profile_-_Miguel_Rivera.jpg/revision/latest/scale-to-width-down/516?cb=20190315012208',
        name: 'Miguel Rivera',
        age: 12,
        weight: 35,
        history: 'Miguel is a 12-year-old aspiring musician who struggles against his familys generations-old ban on music.'
    },
]

const movies = [
    {
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/6/63/The_lion_king_poster.jpg/revision/latest/scale-to-width-down/515?cb=20140316165348',
        title: 'The Lion King',
        creationDate: '1994-06-24',
        rate: 4
    },
    {
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/0/07/Brave_poster.jpg/revision/latest/scale-to-width-down/515?cb=20141201050701',
        title: 'Iron Man 2',
        creationDate: '2012-06-22',
        rate: 5
    },
    {
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/0/07/Brave_poster.jpg/revision/latest/scale-to-width-down/515?cb=20141201050701',
        title: 'Brave',
        creationDate: '2012-06-22',
        rate: 5
    },
    {
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/f/f0/The_avengers_assemble_in_new_york.jpg/revision/latest/scale-to-width-down/516?cb=20160525164309',
        title: 'Avengers',
        creationDate: '2012-12-05',
        rate: 3
    },
    {
        imageUrl: 'https://static.wikia.nocookie.net/disney/images/1/14/Coco_poster.png/revision/latest/scale-to-width-down/516?cb=20170912170727',
        title: 'Coco',
        creationDate: '2017-11-22',
        rate: 4
    }
]

Character.belongsToMany(Movie, {through: MovieCharacter});
Movie.belongsToMany(Character, {through: MovieCharacter});
Genre.belongsToMany(Movie, {through: MovieGenre});
Movie.belongsToMany(Genre, {through: MovieGenre});


//npm install @types/sequelize

(
    async () => {

        const db = await sequelize.sync({force: false})


        // crear
        const genrePromises = genres.map(genre => Genre.create(genre))
        await Promise.all(genrePromises)
        const characterPromises = characters.map(character => Character.create(character))
        await Promise.all(characterPromises)
        const moviePromises = movies.map(movie => Movie.create(movie))
        await Promise.all(moviePromises)
       

        // fetchear
        const moviesList = await Movie.findAll();
        const genresList = await Genre.findAll();
        const charactersList = await Character.findAll();

        // associations
        const movieListPromises = moviesList.map(movie => {
            switch(movie.title) {
                case 'The Lion King':
                    return (async () => {
                        await movie.addGenres(genresList.filter(genre => ['Fantasy', 'Action'].includes(genre.name)));
                        await movie.addCharacters(charactersList.filter(character => ['Mufasa', 'Scar'].includes(character.name)));
                    })()
                case 'Brave':
                    return (async () => {
                        await movie.addGenres(genresList.filter(genre => ['Family', 'Action'].includes(genre.name)));
                        await movie.addCharacters(charactersList.filter(character => ['Merida'].includes(character.name)));
                    })()
                case 'Avengers':
                    return (async () => {
                        await movie.addGenres(genresList.filter(genre => ['Adventure', 'Action', 'Superhero'].includes(genre.name)));
                        await movie.addCharacters(charactersList.filter(character => ['Iron Man'].includes(character.name)));
                    })()
                case 'Coco':
                    return (async () => {
                        await movie.addGenres(genresList.filter(genre => ['Family', 'Adventure'].includes(genre.name)));
                        await movie.addCharacters(charactersList.filter(character => ['Coco Rivera', 'Miguel Rivera'].includes(character.name)));
                    })()
                case 'Iron Man 2':
                    return (async () => {
                        await movie.addGenres(genresList.filter(genre => ['Superhero', 'Action'].includes(genre.name)));
                        await movie.addCharacters(charactersList.filter(character => ['Iron Man'].includes(character.name)));
                    })()
                default:
                    console.log("ola")
                    break;
        }
        })

        const responses = await Promise.allSettled(movieListPromises)

        console.log(JSON.stringify(responses, null, 2))
    })();


//promise.all settled
/*
Superhero
Adventure
Action
Fantasy
Family

Merida
Iron Man
Mufasa
Scar
Coco Rivera
Miguel Rivera

The Lion King - fantasy action
Brave - family action
Avengers - action adventure superhero
Coco - family adventure
*/