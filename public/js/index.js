'use strict';

/* global $ */

$(document).ready(function () {
    
    $('#header').load('fragments/header.html');
    $('#footer').load('fragments/footer.html');

    $('#welcome').load('components/welcome.html', function () {
        $.post('/welcome', function (welcome) {
            $('#welcome-title').text(welcome.title);
            $('#welcome-message').text(welcome.message);
        });
    });

    $('#blog').load('components/blog.html', function () {
        $.post('/newest-blog', function (blog) {
            $('#blog-title').text(blog.title);
            $('#blog-message').text(blog.message);
        });
    });
    
    $('#game').load('components/game.html', function () {
        $.post('/newest-game', function (game) {
            $('#game-name').text(game.name);
            $('#game-info').text(game.info);
            $('#game-logo').attr('src', game.logo);
        });
    });
    
    $('#member').load('components/member.html', function () {
        $.post('/newest-member', function (member) {
            $('#member-name').text(member.name);
            $('#member-about').text(member.about);
            $('#member-logo').attr('src', member.logo);
        });
    });

    $('#post').load('components/post.html', function () {
        $.post('/newest-post', function (post) {
            $('#post-name').text(post.name);
            $('#post-info').text(post.info);
            $('#post-logo').attr('src', post.logo);
        });
    });

});
