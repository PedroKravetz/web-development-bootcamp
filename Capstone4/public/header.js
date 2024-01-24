$("#filter").on("click", function (event) {
  if ($("#filter").text() === "Ingredient") {
    $("#filter").text("Drink");
    $("#Filter").val("Drink");
  } else {
    $("#filter").text("Ingredient");
    $("#Filter").val("Ingredient");
  }
});
