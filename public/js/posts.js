'use strict';

/* global $ */

$(document).ready(function () {

    $('#header').load('fragments/header.html');
    $('#footer').load('fragments/footer.html');

    $('#newest-post').load('components/post.html', function () {
        $.post('newest-post', function (post) {
            $('#post-name').text(post.name);
            $('#post-info').text(post.info);
            $('#post-logo').attr('src', post.logo);
        });
    });

});
