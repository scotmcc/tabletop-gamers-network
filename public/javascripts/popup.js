/* global $ */

(function() {
  var poopup = $('#tgnModal');
  var body = $('#modalBody');

  var current = null;

  function open() {
    console.log('Modal opened!');
  }
  function close() {
    console.log('Modal closed!');
  }

  $('#tgnModal').on('shown.bs.modal', open);

  $('#tgnModal').on('hidden.bs.modal', close);

  $('#signin').click(function() {
    poopup.show($('#loginForm'), 'Login', open, close);
  });
});

var modal = {
  popup: $('#tgnModal'),
  body: $('#modalBody'),
  title: $('#modalTitle'),
  extras: $('extras'),
  current: null,
  previous: null,
  closeHandler: null,
  openHandler: null,
  open: function(node, title, save, close) {
    this.openHandler = save;
    this.closeHandler = close;
    this.current = node;
    node.prependTo(this.body);
    this.title.text(title);
  },
  close: function(node) {
    this.current.prependTo(this.extras);
    this.previous = this.current;
    this.openHandler = null;
    this.closeHandler = null;
    this.current = null;
    this.title.text('');
    this.popup.modal('show');
  }
};
