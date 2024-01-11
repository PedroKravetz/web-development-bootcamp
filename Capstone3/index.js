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
      return res.render("create.ejs", { error: 1 });
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

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/view", (req, res) => {
  res.render("view.ejs", {});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
