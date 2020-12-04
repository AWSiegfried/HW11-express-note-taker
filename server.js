//Dependencies
const express = require("express");
const fs = require("fs");
const app = express();
const db = require("./Develop/db/db.json")
const path = require("path");


//Global Variables
const PORT = process.env.PORT || 10000;
let num = 0;

//Middlewear
//We need the urlencoded middle which gives us access to req res
app.use(express.urlencoded({ extended: true }));
//Turn data into JSON format
app.use(express.json());
//We need a middlewear to have our css and javascript files to be loaded.  Essentially resets the file path starting at public
app.use(express.static("./Develop/public"));

//HTML ROUTES 
//Create a route to serve our html files so when we hit those endpoints, the browser will serve our html to us. 
//We are defining our home routes, which takes in a callback function with request and response
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/Develop/public/notes.html"));
});


//API ROUTES HERE
//Our end goal is to return the data in db.json in our response 
//What are our tools.   Express get, express post, express delete
//2 ways of hanlding this problem. 1. make a variable to store the db.json file.  2. we need to use fsreadfile if we want to grab the data and send it to the front-end
app.get("/api/notes", (req, res) => {
    res.json(db);
});

app.post("/api/notes", (req, res) => {
    num++;
    const newNote = req.body;
    newNote.id = num;
    // const newNote = {
    //     data: req.body,
    //     id: num
    // }
    db.push(newNote);
    res.json(db)
})

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    const dbIndex = db.findIndex(p => p.id == id);
    db.splice(dbIndex, 1);
    return res.send();
})


//SERVER LISTENER
app.listen(PORT, () => {
    console.log("You started up the server")
})