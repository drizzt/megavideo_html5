/* Copyright © 2011 Timothy Redaelli <timothy.redaelli@gmail.com>       */
/* Distribuited under Creative Commons Attribution Share Alike (BY-SA). */

function handleBeforeLoadEvent(event)
{
    if (event.target.nodeName == 'SCRIPT') 
    {
        if (event.target.src == 'http://wwwstatic.megavideo.com/js/swfobject2.js')
        {
            var js = document.createElement('script');
            js.type = 'text/javascript';
            js.src = event.target.src + '?';
            event.target.parentNode.appendChild(js);
            event.target.src = 'http://videojs.com/video-js/video.js';
            event.target.charset = 'utf-8';

            var css = document.createElement('link');
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.media = 'screen';
            css.title = 'Video JS';
            css.href = 'http://videojs.com/video-js/video-js.css';
            event.target.parentNode.appendChild(css);
        }
    }
}

(function ()
{
    document.addEventListener('beforeload', handleBeforeLoadEvent, true);
})();