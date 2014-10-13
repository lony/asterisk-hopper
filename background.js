var patternURLFacebook = new RegExp("http(s)?://www\.facebook\.com(/|/\\?ref=[^\/]*)?$");
var targetURLFacebook = "https://www.facebook.com/messages";

var patternURLYouTube = new RegExp("http(s)?://www\.youtube\.com(|/|/feed/subscriptions)?$");
var targetURLYouTube = "https://www.youtube.com/playlist?list=WL";

var urlsListenTo = ["*://*.facebook.com/*", "*://*.youtube.com/*"];

// IMPORTANT: Before something can be captured, its url has to be allowed inside manifest.json
chrome.webRequest.onBeforeRequest.addListener(function(details) {

	// DEBUG - output redirect urls
	//chrome.tabs.get(parseInt(details.tabId), function (tab) {
	//	if (tab != undefined) {
	//		alert(tab.url);
	//	}
	//});		  
  
	if (patternURLFacebook.test(details.url)) {
		return {
			redirectUrl : targetURLFacebook
		};
	}
	
	if (patternURLYouTube.test(details.url)) {
		return {
			redirectUrl : targetURLYouTube
		};
	}
}, {
	urls : urlsListenTo,
	types : ["main_frame", "sub_frame", "script", "xmlhttprequest"]
}, ["blocking"]);


var patternShowIcon = new RegExp("http(s)?://www\.(facebook|youtube)?\.com");

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	chrome.tabs.get(tabId, function(tab) {
		if (patternShowIcon.test(tab.url)) {
			chrome.pageAction.show(tabId);
		} else {
			chrome.pageAction.hide(tabId);
		}
	});
});