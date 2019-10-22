'use strict';

/* global $ */

$(document).ready(function () {

    $('#header').load('fragments/header.html');
    $('#footer').load('fragments/footer.html');

    $('#newest-member').load('components/member.html', function () {
        $.post('newest-member', function (member) {
            $('#member-name').text(member.name);
            $('#member-about').text(member.about);
            $('#member-logo').attr('src', member.logo);
        });
    });

});
