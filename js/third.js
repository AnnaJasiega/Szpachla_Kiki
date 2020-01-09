$(function () {

    const inspire = $('.inspire');
    const youInspire = $('#inspire');
    const insta = $('#insta');
    const body = $('body');


    youInspire.next().slideUp()

    youInspire.on('click', event => {
        $(event.currentTarget).next().slideToggle();
    });
    const img = $('<img>', {class: "photo"});


    const accessToken = '4230507814.1677ed0.a2b0e7d832d549fea5d3191dc0fe0162';
    const InstagramAPI = require('instagram-api');
    const instagramAPI = new InstagramAPI(accessToken);

    instagramAPI.userSelfMedia().then(function (result) {
        console.log(result.data); // user info
        const fotos = [...result.data];
        fotos.map(function (foto) {
            const img = $('<img>', {class: "photo"}).attr('src', foto.images.standard_resolution.url);
            insta.append(img);
        })
    }, function (err) {
        console.log(err); // error info
    });

    insta.on('mouseover', 'img', (e) => {
        e.target.classList.add("rotate");
    });

    insta.on('mouseout', 'img', (e) => {
        e.target.classList.remove("rotate");
    });

    insta.on('click', 'img', (e) => {
        const galleryImg = $('<img>', {class: "fullScreen"}).attr('src', e.target.getAttribute('src'));
        body.append(galleryImg);


    });

    body.on('click', 'img.fullScreen', (e) => {
        e.target.remove();

    });





})