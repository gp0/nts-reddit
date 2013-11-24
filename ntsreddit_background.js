chrome.extension.onMessage.addListener(
    function (request, sender) {
	chrome.history.getVisits({'url': request.url},
	function (visits) {
	    if (visits.length > 0) {
	    	
		chrome.tabs.sendMessage(sender.tab.id, {
		    'url': request.url
		});
	    };
	});
    });

//simple listener to add handle sent RES Urls from content script
chrome.extension.onMessage.addListener(
	function(request, sender) {
		console.log(request.newUrl);
		chrome.history.addUrl({'url': request.newUrl});
	}
);