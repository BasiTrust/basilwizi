/*FADING POPUP MENU*/
$(document).ready(function () {
  if ($('.ui.success.message').length > 0) {
    setTimeout(function() {
      $('.ui.success.message').fadeOut(300)
    }, 300)
  } else if ($('.ui.error.message').length > 0) {
    setTimeout(function() {
      $('.ui.error.message').fadeOut(300)
    }, 300)
  }
  $('.ui.dropdown').dropdown();
  $('.post-content .avatar-link').popup({
    inline: true,
    position: 'bottom right',
    lastResort: 'bottom right'
  });
})