'use strict';

/* global $ */

$(document).ready(function () {

    $('#header').load('fragments/header.html');
    $('#footer').load('fragments/footer.html');

    $.post('newest-blog', function (entry) {
        $('#entry-title').text(entry.title);
        $('#entry-message').text(entry.message);
    });

});
