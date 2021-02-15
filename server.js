//Importing packages
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

//Using packages
const app = express();

//Set PORT for Heroku
let port = process.env.PORT || 8080     //8080 es preestablecido de HTTP

//Middleware to read json objects
app.use(express.json());
app.use(morgan('dev'));

// Routes to access the root directory of the api
app.get('/', (req, res) => {
    res.send("<h1>Pretty Mariana</h1>");
})

//Route to test a json response
app.get('/test', (req, res) => {
    res.json({
        prop1: "hello",
        prop2: "world"
    })
})

//POST routes
app.post('/test_post',(req,res)=>{
    console.log(req.body.prop1);
    aux = req.body.prop1
    //Answer to the client
    res.send(`Received: ${aux},${req.body.prop2}`);
})

//Testing for Axios APIs
//Axios would be working as a "bridge" for our local API
//Using parameters
app.get('/rick/:id',(req,res)=> {
    const URL = `https://rickandmortyapi.com/api/character/ ${req.params.id}`
    axios.get(URL)
        .then(function(response){
            console.log(response.data)
            res.send(response.data)
        })
        .catch(function(error){
            console.log(error);
            res.send(error);    
        });
})

//Listen Server
app.listen(port, () =>{
    console.log("Server running on port " + port);
})