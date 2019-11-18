/* global $ */

(function() {
  var currentNode = null;
  var closeHandler = null;
  var openHandler = null;

  $('#tgnModal').on('shown.bs.modal', function(e) {
    console.log('tgnModal.shown');
    openHandler && openHandler(e);
  });

  $('#tgnModal').on('hidden.bs.modal', function(e) {
    console.log('tgnModal.hidden');
    closeHandler && closeHandler(e);
    currentNode.prependTo('#extras');
    closeHandler = null;
    openHandler = null;
  });

  $.popup = {
    open: function(a, b, c, d) {
      currentNode = a;
      openHandler = c;
      closeHandler = d;
      $('#modalTitle').text(b);
      currentNode.prependTo('#modalBody');
      $('#tgnModal').modal('show');
    },
    close: function() {
      $('#tgnModal').modal('hide');
    }
  };
})();

(function() {
  var socket = (window.socket = window.io.connect());
  var connection = true;

  socket.on('connect', function() {
    console.log('Connection Made');
    socket.send('send', 'main');
    socket.emit('emit', 'main');
    if (!connection) {
      console.log('time to restart');
      location.reload();
    }
  });

  socket.on('disconnect', function() {
    console.log('Coonnection ended');
    connection = false;
  });

  socket.on('message', function(message) {
    console.log('socket.message', message);
  });

  $('#loginSubmit').click(function() {
    console.log('Login submitted');
    socket.emit('login', {
      email: $('#loginEmail').val(),
      password: $('#loginPass').val(),
      remember: $('#loginRemember').val()
    });
  });

  $('#signin').click(function() {
    $.popup.open(
      $('#loginForm'),
      'Login Form',
      function() {
        console.log('Login Popup Opened');
      },
      function() {
        console.log('Login Popup Closed');
      }
    );
  });
})();
