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

  $('video').each(function () {
      if ($(window).width() < 768){
        var video = document.querySelector(`#${this.id}`);
        video.controls = true 
      } else {
        toggleMuteUnmuteButtons(`#${this.id}`);
      }
  });

  $('.slick-scroll').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var video = document.querySelector(`#video${currentSlide+1}`);
    var promise = video.pause();
    var video = document.querySelector(`#video${nextSlide+1}`);
    var promise = video.play();
  });
});

function playPause(selector){
  var video = document.querySelector(selector);
  if (video.paused){
    console.log('play');
    video.play();
  } else {
    console.log('pause');
    video.pause();
  }
}

function muteUnmute(selector){
  var video = document.querySelector(selector);
  video.muted = !video.muted;
  toggleMuteUnmuteButtons(selector);
}

function toggleMuteUnmuteButtons(selector){
  var video = document.querySelector(selector);
  var button = $(selector).parent().find(".mute-unmute");
  if (video.muted) {
    button.find(".mute").hide();
    button.find(".unmute").show();
  } else {
    button.find(".mute").show();
    button.find(".unmute").hide();
  }
}

function ensurePlayVideo(selector){
  var video = document.querySelector(selector);
  var promise = video.play();

  if (promise !== undefined) {
    promise.then(_ => {
      // Autoplay started!

    }).catch(error => {
      // Show something in the UI that the video is muted
      video.muted = true;
      toggleMuteUnmuteButtons(selector)
    });
  }
}