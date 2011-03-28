/* Copyright © 2011 Timothy Redaelli <timothy.redaelli@gmail.com>       */
/* Distribuited under Creative Commons Attribution Share Alike (BY-SA). */

/* decrypt function taked from http://userscripts.org/scripts/show/42944 */
function decrypt(str, key1, key2)
{
    var loc1 = [];
    for (var loc3 = 0; loc3 < str.length; ++loc3)
    {
        loc1.push(("000" + parseInt(str.charAt(loc3), 16).toString(2)).slice(-4));
    }
    loc1 = loc1.join("").split("");
    var loc6 = [];
    for (var loc3 = 0; loc3 < 384; ++loc3)
    {
        key1 = (key1 * 11 + 77213) % 81371;
        key2 = (key2 * 17 + 92717) % 192811;
        loc6[loc3] = (key1 + key2) % 128;
    }
    for (var loc3 = 256; loc3 >= 0; --loc3)
    {
        var loc5 = loc6[loc3];
        var loc4 = loc3 % 128;
        var loc8 = loc1[loc5];
        loc1[loc5] = loc1[loc4];
        loc1[loc4] = loc8;
    }
    for (var loc3 = 0; loc3 < 128; ++loc3)
    {
        loc1[loc3] = loc1[loc3] ^ loc6[loc3 + 256] & 1;
    }
    var loc12 = loc1.join("");
    var loc7 = [];
    for (var loc3 = 0; loc3 < loc12.length; loc3 = loc3 + 4)
    {
        var loc9 = loc12.substr(loc3, 4);
        loc7.push(loc9);
    }
    var loc2 = [];
    for (var loc3 = 0; loc3 < loc7.length; ++loc3)
    {
        loc2.push(parseInt(loc7[loc3], 2).toString(16));
    }
    return loc2.join("");
}

function urldecode(str)
{
    return unescape(str).replace(/\+/g, " ");
}

function getvars()
{
    var scripts = document.getElementsByTagName("script");

    for (var i = 0, len = scripts.length; i < len; i++)
    {
        var str = scripts[i].innerHTML;
        if (str.match(/\sflashvars\.v = /))
        {
            s = str.match(/flashvars\.s = \"(.*)\";\n/)[1];
            un = str.match(/flashvars\.un = \"(.*)\";\n/)[1];
            k1 = str.match(/flashvars\.k1 = \"(.*)\";\n/)[1];
            k2 = str.match(/flashvars\.k2 = \"(.*)\";\n/)[1];
            title = urldecode(str.match(/flashvars\.title = \"(.*)\";\n/)[1]);
            image = str.match(/flashvars\.image = \"(.*)\";\s*\n/);
            if (image)
                image = image[1];

            link = "http://www" + s + ".megavideo.com/files/" + decrypt(un,k1,k2) + "/" + title + ".flv";
            return [link, image];
        }
    }
}

(function ()
{
    /* Inject video.js */
    var js = document.createElement('script');
    js.src = chrome.extension.getURL('video.js');
    js.charset = 'utf-8';
    js.type = 'text/javascript';
    document.head.appendChild(js);

    /* Inject video-js.css */
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.media = 'screen';
    css.title = 'Video JS';
    css.href = chrome.extension.getURL('video-js.css');
    document.head.appendChild(css);

    /* Get video and image (if exists) url */
    var vars = getvars();

    /* Create video */
    var div = document.createElement('div');
    div.className = 'video-js-box';
    var video = document.createElement('video');
    video.className = 'video-js';
    video.width = '624';
    video.height = '351';
    video.controls = 'controls';
    video.preload = 'preload';
    video.poster = vars[1];
    var source = document.createElement('source');
    source.src = vars[0];
    source.type = 'video/mp4';

    video.appendChild(source);
    div.appendChild(video);

    var playerdiv = document.getElementById('playerdiv');
    while (playerdiv.hasChildNodes())
        playerdiv.removeChild(playerdiv.firstChild);

    playerdiv.appendChild(div);

    /* Disable first button */
    document.getElementById('pbut1').href = 'javascript:void();';

})();
