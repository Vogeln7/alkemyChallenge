const express = require('express');
const sequelize = require('./util/db');
const session = require('express-session');

//Routes
const charactersRoutes = require('./routes/charactersRoutes');
const moviesRoutes = require('./routes/moviesRoutes');
const authRoutes = require('./routes/authRoutes');

//Models
const Character = require('./models/characters');
const Genre = require('./models/genres');
const Movie = require('./models/movies');
const MovieCharacter = require('./models/movies-characters');
const MovieGenre = require('./models/movies-genres');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use( session({
    secret: 'ThisShouldBeAVerySecretWord',
    resave: false
}))

app.use(charactersRoutes);
app.use(moviesRoutes);
app.use(authRoutes);

Character.belongsToMany(Movie, {through: MovieCharacter});
Movie.belongsToMany(Character, {through: MovieCharacter});
Genre.belongsToMany(Movie, {through: MovieGenre});
Movie.belongsToMany(Genre, {through: MovieGenre});

sequelize.sync() 
.then(() => {    
    app.listen(3000)
})
.catch(err => console.log(err));