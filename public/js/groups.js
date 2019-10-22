'use strict';

/* global $ */

$(document).ready(function () {

    $('#header').load('fragments/header.html');
    $('#footer').load('fragments/footer.html');

    $('#newest-group').load('components/group.html', function () {
        $.group('newest-group', function (group) {
            $('#group-name').text(group.name);
            $('#group-info').text(group.info);
            $('#group-logo').attr('src', group.logo);
        });
    });

});
