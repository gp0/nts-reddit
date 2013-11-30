function checkForVisistedLinks() {
	//links
	$('div.thing a.title').each(
	    function(index, value) {
	    	
		chrome.extension.sendMessage({'url': value.href});
	});

	//comments
	$('div.thing a.comments').each(
	    function(index, value) {
	    	
		chrome.extension.sendMessage({'url': value.href});
	});

}

function getAnchor(url) {

    return $('a[href^="' + url + '"][class~="title"]')
}

function getAnchorComments(url) {

    return $('a[href^="' + url + '"][class~="comments"]')
}

checkForVisistedLinks();

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// define a new observer
var obs = new MutationObserver(function(mutations, observer) {
    // look through all mutations that just occured
    for(var i=0; i<mutations.length; ++i) {
        // look through all added nodes of this mutation
        for(var j=0; j<mutations[i].addedNodes.length; ++j) {
			
			// if a Never-Ending-Reddit-Pagemarker has been inserted, check links again:
			if ( $(mutations[i].addedNodes[j]).is(".neverEndingReddit") ) {
				checkForVisistedLinks();
			}            

            
        }
    }
});

obs.observe($('body').get(0), {
  childList: true,
  subtree: true
});

chrome.extension.onMessage.addListener(function (message) {
    url = message.url;
    reddit = 'http://www.reddit.com';
    anchor = getAnchor(url);

    // are we on a comments page?
    if (window.location.href.indexOf("reddit.com") > -1 && window.location.href.indexOf("comments") > -1) {
    	// do not remove thing
    	return;
    }

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
