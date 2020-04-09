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
      toggleMuteUnmuteButtons(`#${this.id}`);
  });

  $('.slick-scroll').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var video = document.querySelector(`#video${currentSlide+1}`);
    var promise = video.pause();
    var video = document.querySelector(`#video${nextSlide+1}`);
    var promise = video.play();
  });

  $("video").each(function( index ) {
    ensurePlayVideo(`#video${index+1}`)
  });


  if ($(window).width() <= 768){
     $(window).scroll(function (){
      var scrollPositionMiddle = $(window).scrollTop() + $(window).height() / 2;

      $("video").each(function( index ) {
        var videoTop = $(this).offset().top;    
        var videoBottom = $(this).offset().top + $(this).height();    

        if (videoTop < scrollPositionMiddle && videoBottom > scrollPositionMiddle){
          var video = document.querySelector(`#video${index+1}`);
          var nextVideo = document.querySelector(`#video${index+2}`);
          var previousVideo = document.querySelector(`#video${index-1}`);
          $("video").each(function( index2 ) {
            if (index2 != index){
              var video2 = document.querySelector(`#video${index2+1}`);
              video2.pause();
            }
          });
          console.log(`play video${index+2}`)
          video.play();
        }
      });
    });
  }
});



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