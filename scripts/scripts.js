$(function() {
  $(".fadein-delayed-1").delay(750).queue(function (next) {
    $(this).css('opacity', '1');
  });
  $(".fadein-delayed-2").delay(1000).queue(function (next) {
    $(this).css('opacity', '1');
  });
  $(".fadein-delayed-3").delay(1250).queue(function (next) {
    $(this).css('opacity', '1');
  });
  $(".fadein-delayed-4").delay(1500).queue(function (next) {
    $(this).css('opacity', '1');
  });
});

function openNav() {
  $(".overlay").removeClass("hidden");
  $(".overlay").addClass("visible");
  $(".mobile-nav").fadeIn(400)
}

function closeNav() {
  $(".overlay").removeClass("visible");
  $(".overlay").addClass("hidden");
  $(".mobile-nav").fadeOut(200);
}

