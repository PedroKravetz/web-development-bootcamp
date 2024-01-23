$("#filter").on("click", function (event) {
  if ($("#filter").text() === "Ingredient") {
    $("#filter").text("Drink");
  } else {
    $("#filter").text("Ingredient");
  }
});

$("#searchBT").on("click", function (event) {
  console.log("search");
  if ($("#search").val().trim() !== "") {
    console.log("search2");
    $.post("/search", {
      filter: $("#filter").text().trim(),
      search: $("#search").val().trim()
    });
  }
});
