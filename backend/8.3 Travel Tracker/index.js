import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let countries = [];

db.connect();

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  res.render("index.ejs", { total: countries.length, countries: countries });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
