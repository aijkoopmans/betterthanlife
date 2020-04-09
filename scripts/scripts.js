$(document).ready(function(){
  $('.slick-scroll').slick({
     arrows: false,
     infinite: false,
     centerMode: true,
     variableWidth: true,
     responsive: [
      {
        breakpoint: 768,
        settings: "unslick"
      }
  ]
  });
});

// On before slide change
$('.slick-scroll').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  var video = document.querySelector(`#video${currentSlide+1}`);
  var promise = video.pause();
  var video = document.querySelector(`#video${nextSlide+1}`);
  var promise = video.play();
});