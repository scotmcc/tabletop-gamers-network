'use strict';

/* global $ */

$(document).ready(function () {

    $('#header').load('fragments/header.html');
    $('#footer').load('fragments/footer.html');

    $('#newest-game').load('components/game.html', function () {
        $.game('newest-game', function (game) {
            $('#game-name').text(game.name);
            $('#game-info').text(game.info);
            $('#game-logo').attr('src', game.logo);
        });
    });

});
