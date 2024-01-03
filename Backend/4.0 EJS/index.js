import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let d = new Date();
  let day = d.getDay();
  if (day % 6 === 0) {
    res.render("index.ejs", { day: "weekend", desc: "have fun" });
  } else {
    res.render("index.ejs", { day: "weekday", desc: "work hard" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
