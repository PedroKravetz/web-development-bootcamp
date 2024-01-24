import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/random", async (req, res) => {
  const result = await axios.get(API_URL + "random.php");
  var ingredients = [];
  for (var i = 1; i < 16; i++) {
    if (result.data.drinks[0]["strMeasure" + i]) {
      ingredients.push(
        result.data.drinks[0]["strMeasure" + i] +
          " of " +
          result.data.drinks[0]["strIngredient" + i]
      );
    } else {
      break;
    }
  }
  res.render("index.ejs", {
    name: result.data.drinks[0]["strDrink"],
    instructions: result.data.drinks[0]["strInstructions"],
    ingredients: ingredients,
    image: result.data.drinks[0]["strDrinkThumb"],
  });
});

app.post("/search", async (req, res) => {
  if (req.body.search !== "") {
    var body = [];
    if (req.body.filter === "Ingredient") {
      const result = await axios.get(
        API_URL + "search.php?i=" + req.body.search
      );
      for (var ingredient of result.data.ingredients) {
        var name = ingredient["strIngredient"].toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        body.push({
          name: ingredient["strIngredient"],
          description: ingredient["strDescription"],
          image:
            "https://www.thecocktaildb.com/images/ingredients/" + name + ".png",
        });
      }
      res.render("index.ejs", { ingredients: body });
    } else {
      const result = await axios.get(
        API_URL + "search.php?s=" + req.body.search
      );
      for (var drink of result.data.drinks) {
        var ingredients = [];
        for (var i = 1; i < 16; i++) {
          if (drink["strMeasure" + i]) {
            ingredients.push(
              drink["strMeasure" + i] + " of " + drink["strIngredient" + i]
            );
          } else {
            break;
          }
        }
        body.push({
          name: drink["strDrink"],
          instructions: drink["strInstructions"],
          image: drink["strDrinkThumb"],
          ingredients: ingredients,
        });
      }
      res.render("index.ejs", { drinks: body });
    }
  } else {
    res.render("index.ejs");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
