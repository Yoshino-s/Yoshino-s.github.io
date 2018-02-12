!function(document, window) {
	"use strict";
	var request = {},
		$$ = document.querySelector,
		respond;
	
	request.simpleRequest = function (url, type) {
		switch (type) {
			case "js":
			case "javascript":
				var node = document.createElement("script");
				node.src = url;
				document.head.appendChild(node);
			break;
			
			case "css":
				var node = document.createElement("link");
				node.rel = "stylesheet";
				node.href = url;
				document.head.appendChild(node);
			break;
		}
	};
	window.request = request;
	request.simpleRequest("https://cdn.polyfill.io/v2/polyfill.min.js", "js");
}(document, window);