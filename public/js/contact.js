'use strict';

/* global $ */

$(document).ready(function () {
    
    $('#header').load('fragments/header.html');
    $('#footer').load('fragments/footer.html');

    $('#about').load('components/about.html', function () {
        $.post('/about', function (about) {
            $('#about-title').text(about.title);
            $('#about-message').text(about.message);
        });
    });

    $('#faq').load('components/faq.html', function () {
        $.post('/faqs', function (faqs) {
            faqs.forEach(function (faq) {
                $('#faq-message').append(faq.message);
            });
            
        });
    });

});
