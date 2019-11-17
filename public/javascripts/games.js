/* global $ */

$('[action=favorite]').click(function(e) {
  console.log(e.target.gameId);
  $.post('/games/favs/' + e.target.gameId);
});

$('[action=vote]').click(function(e) {
  console.log(e.target.gameId);
  $.post('/games/favs/' + e.target.gameId);
});

$('#save-game').click(function(e) {
  e.preventDefault();
  $.put(
    '/games/',
    {
      title: $('#title').val(),
      type: $('#type').val(),
      theme: $('#theme').val(),
      description: $('#description').val()
    },
    function() {
      window.location.replace('/games');
    }
  );
});
