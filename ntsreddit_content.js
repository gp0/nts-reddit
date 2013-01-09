$('div.thing a.title').each(
    function(index, value) {
	chrome.extension.sendMessage({'url': value.href});
    });

function getAnchor(url) {
    return $('a[href^="' + url + '"][class~="title"]')
}

chrome.extension.onMessage.addListener(function (message) {
    url = message.url;
    reddit = 'http://www.reddit.com';
    anchor = getAnchor(url);

    if (anchor.length > 0) {
	anchor.closest(".thing").remove();
    }
    else if (url.substring(0,21) == reddit) {
	anchor = getAnchor(url.split(reddit)[1]);

	if (anchor.length > 0) {
	    anchor.closest('.thing').remove();
	}
    }
    else {
	console.log(url);
    }
});
