/* eslint-disable */
function loadCSS(css) {
    var head = document.getElementsByTagName('head')[0];
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.type = 'text/css';
    elem.href = css;
    elem.media = 'all';
    elem.onload = function() {
        window.parent.postMessage({ type: 'cssLoaded' }, '*');
    };
    head.appendChild(elem);
}

function loadScript(script) {
    var head = document.getElementsByTagName('head')[0];
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    elem.src = script;
    head.appendChild(elem);
}

parent.postMessage({ type: 'pageLoad', page: window.location.pathname }, '*');
window.addEventListener(
    'message',
    function(event) {
        if (event.data.type === 'loadCSS') {
            loadCSS(event.data.css);
        }

        if (event.data.type === 'loadScript') {
            event.data.scripts.forEach(loadScript);
        }
    },
    false,
);
