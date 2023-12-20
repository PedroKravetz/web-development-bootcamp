var randomNumber1 = Math.floor(Math.random() * 6 + 1);

document.querySelector("img.img1").src =
  "./images/dice" + randomNumber1 + ".png";

var randomNumber2 = Math.floor(Math.random() * 6 + 1);

document.querySelector("img.img2").src =
  "./images/dice" + randomNumber2 + ".png";

document.querySelector("img.img1").alt = "Dice " + randomNumber1 + " image";

document.querySelector("img.img2").alt = "Dice " + randomNumber2 + " image";

if (randomNumber1 > randomNumber2) {
  document.querySelector("h2").textContent = "Player 1 Wins";
} else if (randomNumber1 < randomNumber2) {
  document.querySelector("h2").textContent = "Player 2 Wins";
}
