const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This a sample Blog-style website which can be used as a digital journal to write and express whatever comes to your mind without the fear of someone reading it 😜";
const aboutContent = "Hello, My name is Arpan Tiwari and this a website creted using the knowledge of both front-end and back-end.This website is created by using JS,CSS,Bootstrap and most importantly EJS and partials which are used when a website has multiple webpages and almost everyone of them is using the same design language and styles. This is done so that we don't have to write the same line of codes over and over again.This is more efficient,consistent and less prone to errors.";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

let posts =[];

app.get("/",function(req,res){
  res.render("home", {homeContent:homeStartingContent,newPosts:posts});
});

app.get("/about",function(req,res){
  res.render("about", {aboutContent:aboutContent});
});

app.get("/compose",function(req,res){
  res.render("compose")
});

app.post("/compose",function(req,res){
  const composeData = {
    theTitle: req.body.title ,
    case: _.kebabCase(req.body.title),
    thePost: req.body.post
  };
  posts.push(composeData);

  res.redirect("/");
}); 

app.get("/posts/:postID",function(req,res){
  const requestedTitle = _.lowerCase(req.params.postID);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.theTitle);
    
    if (requestedTitle === storedTitle){
      res.render("post",{title:post.theTitle,content:post.thePost,})
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
