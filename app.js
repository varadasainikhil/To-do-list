// Require Express
const express = require("express")

// Initialise express
const app = express()

//Using the inbuilt body-parser
app.use(express.urlencoded());

//Use the public folder for assets
app.use(express.static("public"));

//Adding EJS 
app.set('view engine', 'ejs');

let items = [];
let work_items = [];

// Connect to a port'
app.listen(3000, function(){
    console.log("Server connected to port 3000.")
});

//Receive info from the webpage
app.post("/", function (req, res) {
    var item = req.body.newItem;
    items.push(item);
    console.log(item);
    res.redirect("/");
});

let today = new Date();

let options = {
    weekday : 'long',
    day : 'numeric',
    month : 'long',
};

let day = today.toLocaleDateString("en-GB", options); 

// Send info to the website
app.get("/",function(req,res){
    res.render("list", {Title : day, newListItem : items, route :"/"}); 
});

//For work To Do List
app.get("/work", function(req,res){
    res.render("list", {Title : "WORK LIST", newListItem : work_items, route : "/work"});
});

//Receive info from the webpage
app.post("/work", function (req, res){
    let item = req.body.newItem;
    work_items.push(item);
    console.log(item);
    res.redirect("/work");
});