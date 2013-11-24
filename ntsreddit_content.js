MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// define a new observer
var obs = new MutationObserver(function(mutations, observer) {
    // look through all mutations that just occured
    for(var i=0; i<mutations.length; ++i) {
        // look through all added nodes of this mutation
        for(var j=0; j<mutations[i].addedNodes.length; ++j) {
			
			if ( $(mutations[i].addedNodes[j]).is(".lcTagged") ) {
				var RESImageURL = $(mutations[i].addedNodes[j]).find("a").attr("href");

				chrome.extension.sendMessage({'url': RESImageURL});
			}            

            
        }
    }
});

obs.observe($('#siteTable').get(0), {
  childList: true,
  subtree: true
});

//links
$('div.thing a.title').each(
    function(index, value) {
    	console.log(value.href);
	chrome.extension.sendMessage({'url': value.href});
});

//comments
$('div.thing a.comments').each(
    function(index, value) {
    	console.log(value.href);
	chrome.extension.sendMessage({'url': value.href});
});

function getAnchor(url) {

    return $('a[href^="' + url + '"][class~="title"]')
}

function getAnchorComments(url) {

    return $('a[href^="' + url + '"][class~="comments"]')
}



chrome.extension.onMessage.addListener(function (message) {
    url = message.url;
    reddit = 'http://www.reddit.com';
    anchor = getAnchor(url);

    console.log(anchor);

    if (typeof anchor.length == 0) {
	    //try for comments:
	    anchor = getAnchorComments(url);
	}

    if (anchor.length > 0) {
	anchor.closest(".thing").remove();
    }
    else if (url.substring(0,21) == reddit) {
    	if (url.indexOf("comments") !== -1) {
    		anchor = getAnchorComments(url);
    	} else {
			anchor = getAnchor(url.split(reddit)[1]);
		}
		if (anchor.length > 0) {
		    anchor.closest('.thing').remove();
		}
	}
    else {
		//
    }
});
