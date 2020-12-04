//Dependencies
//We need to require a llof our depenacies
const express = require("express");
const { fstat } = require("fs");
const app = express();

//GLobal Variables
//Declaring global variables
const PORT = process.env.PORT || 10000;
const db = require("./db/db.json")
console.log(db);
let num = 0;

//Middlewear
//We need the urlencoded middle which gives us access to req res
app.use(express.urlencoded({ extended: true }));
//Turn data into JSON format
app.use(express.json());

//We need a middlewear to have our css and javascript files to be loaded
app.use(express.static("public"));

//Routes
//HTML ROUTES HERE
//We're gonna need to create a route to serve our html files so when we hit those endpoints, the browser will serve our html to us. 
//Our goal is to display what's in teh index.html to the root route I.E localhost:10000
//fs module, path
//We are defining our home routes, which takes in a callback function with request and response
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/test", (req, res) => {
    num++
    const x = {
        title: "hello",
        text: "world",
        id: num

    }
    db.push(x)
    res.json(db)
});
//API ROUTES HERE
//Our end goal is to return the data in db.json in our resopnse 
//What are our tools.   Express get, express post, express delete
//2 way s of hanlding this proble. 1. make a variable to store teh db.json file.  2. we need to use fsreadfile if we want to grab the data and send it to the front-end
app.get("/api/notes", (req, res) => {
        res.json(db);
    })
    //Whend doing a post request remember to console.log the req.body
    //A post follows similar syntax using req and res as the callback
    //becasue we declare our db at the very top 

//SERVER LISTENER
app.listen(PORT, () => {
    console.log("You started up the server")
})



//Express, kill-port, nodemon