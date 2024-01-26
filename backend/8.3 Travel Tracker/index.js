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

app.post("/add", async (req, res) => {
  if (req.body.country && req.body.country.trim() != "") {
    const country = req.body.country.trim().toLowerCase();
    const result = await db.query(
      "select country_code from countries where LOWER(country_name) like '%' || $1 || '%';",
      [country]
    );
    if (result.rows.length > 0) {
      try {
        const insert = await db.query(
          "insert into visited_countries (country_code) values($1)",
          [result.rows[0].country_code]
        );
        res.redirect("/");
      } catch {
        res.render("index.ejs", {
          total: countries.length,
          countries: countries,
          error: "Country has already been added, try again.",
        });
      }
    } else {
      res.render("index.ejs", {
        total: countries.length,
        countries: countries,
        error: "Country does not exist, try again.",
      });
    }
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
