!function (document, window) {
	"use strict";
	
	var f = fetch("//httpbin.org/post?q=7&o=9",{
		method: "POST",
		body: new URLSearchParams("g=5&s=7")
	}).then(function(response){
		return response.json();
	}).then(function(json){
		dmp(json);
	});
}(document, window);
