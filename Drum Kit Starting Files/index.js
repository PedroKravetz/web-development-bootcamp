for (var i = 0; i < document.querySelectorAll("button").length; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", handleClick);
}

function handleClick() {
  if (this.innerHTML === "w") {
    var audio = new Audio("./sounds/tom-1.mp3");
  } else if (this.innerHTML === "a") {
    var audio = new Audio("./sounds/tom-2.mp3");
  } else if (this.innerHTML === "s") {
    var audio = new Audio("./sounds/tom-3.mp3");
  } else if (this.innerHTML === "d") {
    var audio = new Audio("./sounds/tom-4.mp3");
  } else if (this.innerHTML === "j") {
    var audio = new Audio("./sounds/snare.mp3");
  } else if (this.innerHTML === "k") {
    var audio = new Audio("./sounds/crash.mp3");
  } else if (this.innerHTML === "l") {
    var audio = new Audio("./sounds/kick-bass.mp3");
  }
  audio.play();
}
