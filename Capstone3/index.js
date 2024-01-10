import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var post = [];
var titles = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/add", (req, res) => {
  post.push(req.body["post"]);
  titles.push(req.body["title"]);
  res.redirect("/");
});

app.delete("/delete", (req, res) => {
  post.splice(req.body["index"], 1);
  titles.splice(req.body["index"], 1);
  res.redirect("/");
});

app.post("/update", (req, res) => {
  post[req.body["index"]] = req.body["post"];
  titles[req.body["index"]] = req.body["title"];
  res.redirect("/");
});

app.post("/create", (req, res) => {
  if (req.body["index"]) {
    res.render("create.ejs", {
      title: titles[req.body["index"]],
      post: post[req.body["index"]],
      index: req.body["index"],
    });
  } else {
    res.render("create.ejs");
  }
});

app.post("/view", (req, res) => {
  res.render("view.ejs", {});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
