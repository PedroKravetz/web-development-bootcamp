for (var i = 0; i < document.querySelectorAll("button").length; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKey);
}

function handleClick() {
  play(this.innerHTML);
}

function handleKey(event) {
  play(event.key);
}

function play(string){
  if (string === "w") {
    var audio = new Audio("./sounds/tom-1.mp3");
  } else if (string === "a") {
    var audio = new Audio("./sounds/tom-2.mp3");
  } else if (string === "s") {
    var audio = new Audio("./sounds/tom-3.mp3");
  } else if (string === "d") {
    var audio = new Audio("./sounds/tom-4.mp3");
  } else if (string === "j") {
    var audio = new Audio("./sounds/snare.mp3");
  } else if (string === "k") {
    var audio = new Audio("./sounds/crash.mp3");
  } else if (string === "l") {
    var audio = new Audio("./sounds/kick-bass.mp3");
  }
  if (audio !== null) {
    audio.play();
    buttonAnimation(string);
  }
}

function buttonAnimation(key) {
  var activeButton = document.querySelector("." + key);
  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
