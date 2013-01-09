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
