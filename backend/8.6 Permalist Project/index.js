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
  port: 5432,
  database: "permalist",
});

db.connect();

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

async function getItems() {
  const result = await db.query("select * from permalist");
  items = result.rows;
}

app.get("/", async (req, res) => {
  await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  if (req.body.newItem && req.body.newItem.trim() !== "") {
    const result = await db.query("insert into permalist (title) values ($1)", [
      item,
    ]);
  }
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemId;
  const title = req.body.updatedItemTitle;
  if (item && item !== "" && title && title.trim() !== "") {
    const result = await db.query(
      "update permalist set title = $1 where id = $2",
      [title, item]
    );
  }
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const item = req.body.deleteItemId;
  if (item && item !== "") {
    const result = await db.query("delete from permalist where id = $1", [
      item,
    ]);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
