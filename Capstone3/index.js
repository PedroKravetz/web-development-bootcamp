import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var post = [];
var titles = [];
var timeStamp = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

function verifyTitle(req, res, next) {
  if (req.method === "POST" && req.url === "/create") {
    if (titles.includes(req.body["title"])) {
      return res.render("create.ejs", {
        error: 1,
        title: req.body["title"],
        post: req.body["post"],
      });
    }
  } else if (req.method === "POST" && req.url === "/update") {
    if (
      titles.includes(req.body["title"]) &&
      req.body["index"] != titles.indexOf(req.body["title"])
    ) {
      return res.render("change.ejs", {
        error: 1,
        titles: req.body["title"],
        post: req.body["post"],
        index: req.body["index"],
      });
    }
  }
  console.log(req.method);
  console.log(req.url);
  next();
}

app.use(verifyTitle);

app.get("/", (req, res) => {
  res.render("index.ejs", { post: post, titles: titles, timeStamp: timeStamp });
});

app.post("/create", (req, res) => {
  var newDate = new Date();
  post.push(req.body["post"]);
  titles.push(req.body["title"]);
  timeStamp.push(
    months[newDate.getMonth()] +
      " " +
      newDate.getDate() +
      " " +
      newDate.getFullYear()
  );
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  var index = titles.indexOf(req.body["title"]);
  titles.splice(index, 1);
  post.splice(index, 1);
  timeStamp.splice(index, 1);
  res.redirect("/");
});

app.post("/update", (req, res) => {
  titles[req.body["index"]] = req.body["title"];
  post[req.body["index"]] = req.body["post"];
  res.redirect("/");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/change", (req, res) => {
  res.render("change.ejs", {
    post: req.body["post"],
    titles: req.body["title"],
    index: titles.indexOf(req.body["title"]),
  });
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs", { post: post, titles: titles, timeStamp: timeStamp });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
