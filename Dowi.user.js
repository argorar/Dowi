// ==UserScript==
// @name         Dowi
// @version      1.3.0
// @description  Show a button to download images easly
// @author       argorar
// @license      GPL-3.0-or-later
// @match        https://cdn.discordapp.com/attachments/*
// @match        https://i.redd.it/*
// @match        https://i.imgur.com/*
// @match        https://f.cyberdrop.cc/*
// @match        https://pbs.twimg.com/media/*
// @grant        none
// @require      https://onee3.org/libs/fileserver/1.3.3/FileSaver.min.js
// @require      https://onee3.org/libs/jquery/3.3.1/jquery.min.js
// @updateURL    https://github.com/argorar/Dowi/raw/master/Dowi.user.js
// @downloadURL  https://github.com/argorar/Dowi/raw/master/Dowi.user.js
// ==/UserScript==

function file_mime(filename) {
    let extension = filename.replace(/.*(\.\w+)$/g, "$1");
    switch (extension) {
        case ".jpg":
        case ".jpeg":
        case ".jpe":
            return "image/jpeg";
        case ".gif":
            return "image/gif";
        case ".png":
            return "image/png";
        default:
            return "";
    }
}

function donwload_image(image_url){
    console.log('Downloading ' + image_url);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", image_url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function (ev) {
        let filename = image_url.replace(/.*\//, '');

        if(filename.includes('image')) {
            let newName = Math.random().toString(36).substring(7);
            filename = filename.replace('image', newName);
        }

        if(filename.includes('?')) {
            let index = filename.indexOf('?');
            filename = filename.substring(0, index);
        }

        console.log('Filename ' + filename);
        let blob = new Blob([xhr.response], {
            type: file_mime(filename)
        });
        saveAs(blob, filename);
    };
    xhr.send();
}

(function() {
    'use strict';
    var button = $("<button class='button'></button>").text('Descargar');
    $("body").prepend(button);
    $("button").click(function() {
        let url = window.location.href;
        donwload_image(url);
    });
    var css = ' .button { display: inline-block; transition: 0.25s; border-radius: 2px; background-color: rgb(205,71,35); border: none; color: #FFFFFF; text-align: center; font-size: 16px; padding: 12px; width: 120px; cursor: pointer; margin: 2px; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
})();
