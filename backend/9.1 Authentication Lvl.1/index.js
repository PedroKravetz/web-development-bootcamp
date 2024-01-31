import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "secrets",
  port: 5432,
});

db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    await db.query("insert into users (email, password) values ($1, $2)", [
      email,
      password,
    ]);
    res.render("secrets.ejs");
  } catch (err) {
    console.error(err);
    res.render("register.ejs");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const result = await db.query(
      "select email, password from users where email = $1 and password = $2",
      [email, password]
    );
    if (result.rowCount != 0) {
      res.render("secrets.ejs");
    } else {
      res.render("login.ejs");
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
