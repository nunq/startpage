--- startpage ---

a /comfy/ startpage, hosted at https://hyphenc.github.io/startpage/

the page needs js for the image loading, search bar, date, time
and weather to work.
although the noscript version can be functional as well.

the image is refreshed every minute, the weather every 10 minutes.

the search bar doubles as a url bar and redirects to a url if it
detects a scheme suffix ("://"). normal search queries are
forwarded to duckduckgo. in addition it tries to detect urls not
containing scheme:// using a regex (which is not solid at all),
it then prefixes "https://" and redirects to that, only works with
simple urls!

the default music channel is cyberia (https://lainon.life), other
music channels from lainon.life are 'cafe' and 'everything', you
can also listen to the stream from cyberadio.pw, among others.
to start playing click 'play', if you select another channel, you
need to click 'reload'.

the site needs access to your location to display current weather
conditions near you (uses the openweathermap api).
if you don't choose to allow this, the div will simply be hidden.

the images are webp files and some music streams are in ogg format
so browser compatibility may vary (helpful: https://caniuse.com).

suggestions, bugs, etc. -> https://github.com/hyphenc/startpage

-----------------
