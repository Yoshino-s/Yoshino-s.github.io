define(["vue", "marked", "highlightjs"], function(Vue, marked, highlightjs){
	marked.setOptions({
		highlight: code => highlightjs.highlightAuto(code).value,
		pedantic: false,
		gfm: true,
		tables: true,
		breaks: false,
		sanitize: false,
		smartLists: true,
		smartypants: false, 
		xhtml: false
	});
	
	let globalInstance = {};
	
	window.Vue = Vue;6
	
	Object.defineProperty(Vue, "$global", {
		get: function () {
			return globalInstance
		},
		set: function () {
			return globalInstance
		}
	});
	
	Object.defineProperty(Vue.prototype, "$global", {
		get: function () {
			return globalInstance
		},
		set: function () {
			return globalInstance
		}
	});
	Vue.prototype.$marked = s => marked(s);
	
	Vue.directive('global', {
		bind() {
			
		}
	});
	
	const toCamelCase = e => e.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
	const toHyphens = e => e.replace(/[A-Z]/g, function (g) { return '-'+g.toLowerCase(); });
	
	return {
		toHyphens,
		toCamelCase
	}
})