var numSlides = 0;
var currentSlide = 0;
var slidesReady = false;

$(document).ready(function() {
    $(document).keyup(handleKeys);

    numSlides = $("div.slide").each(function (i) {
        $(this).attr("id", "slide_" + i);
      }).size();

    readySlides();
    showSlide();
  });


function readySlides() {
  slidesReady = true;
  $("div.slide").css("display", "none").css("position", "absolute").css("height", "90%").click(nextSlide);
}

function unreadySlides() {
  slidesReady = false;
    $("div.slide").css("display", "inline").css("position", "static").css("height", "12em").click(function() { gotoSlide($(this)); });
}


function handleKeys(e) {
  if (! slidesReady) {
    return;
  }

  var keyID = (window.event) ? event.keyCode : e.keyCode;

  switch(keyID) {
    case 27: // escape
      unreadySlides();
      break;
    case 32: // space
      nextSlide();
      break;
    case 37: // left
      prevSlide();
      break;
    case 38: // up
      setSlide(0);
      break;
    case 39: // right
      nextSlide();
      break;
    case 40: // down
      lastSlide();
      break;
  }
}


function showSlide() {
  $("div.slide").css("display", "none");

  $("#slide_" + currentSlide).css("display", "inline");
}

function setSlide(number) {
  currentSlide = number;
  showSlide();
}


function nextSlide() {
  currentSlide++;
  if (currentSlide >= numSlides) {
    currentSlide = 0;
  }

  showSlide();
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = 0;
  }

  showSlide();
}

function lastSlide() {
  currentSlide = (numSlides - 1);
  showSlide();
}


function gotoSlide(slide) {
  var number = slide.attr("id").substring(6);

  readySlides();
  setSlide(number);
}
