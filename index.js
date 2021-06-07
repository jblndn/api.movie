const express = require('express');
const axios = require('axios');
const app = express();

const urlApi = 'https://api.themoviedb.org/3/'
const apiKey = '98ededc76ae18f40892cf36f411ce4c4';

let movies = [];
let actors = [];

for (let i = 0; i < 300; i++) {
    axios.get(urlApi + 'movie/' + i + '?api_key=' + apiKey)
        .then(function (response) {
            movies.push(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
for (let i = 0; i < 300; i++) {
    axios.get(urlApi + 'person/' + i + '?api_key=' + apiKey)
        .then(function (response) {
            actors.push(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

app.get('/movies', (req,res) => {
    res.status(200).json(movies)
})
app.get('/actors', (req,res) => {
    res.status(200).json(actors)
})
app.get('/movie/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const movie = movies.find(movie => movie.id === id);
    res.status(200).json(movie)
})
app.get('/actor/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const actor = actors.find(movie => movie.id === id);
    res.status(200).json(actor)
})
app.get('/answer/:actor/:movie', (req,res) => {
    const actorId = parseInt(req.params.actor);
    const movieId = parseInt(req.params.movie);

    axios.get(urlApi + 'movie/' + movieId + '/credits?api_key=' + apiKey)
        .then(function (response) {
            const find = response.data.cast.find(item => item.id === actorId);
            const result = !!find;
            res.status(200).json(result);
        })
        .catch(function (error) {
            console.log(error);
        })

})
app.listen(3000, () => {

})