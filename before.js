/* Copyright © 2011 Timothy Redaelli <timothy.redaelli@gmail.com>       */
/* Distribuited under Creative Commons Attribution Share Alike (BY-SA). */

function handleBeforeLoadEvent(event)
{
    if (event.target.nodeName == 'SCRIPT')
    {
        document.removeEventListener('beforeload', handleBeforeLoadEvent, true);
        event.target.parentNode.insertBefore(event.target.cloneNode());
        event.target.src = 'http://drizztbsd.github.com/megavideo_html5/video-js/video.js';
        event.target.charset = 'utf-8';

        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.media = 'screen';
        css.title = 'Video JS';
        css.href = 'http://drizztbsd.github.com/megavideo_html5/video-js/video-js.css';
        event.target.parentNode.insertBefore(css);
    }
}


(function()
{
    document.addEventListener('beforeload', handleBeforeLoadEvent, true);
})();
