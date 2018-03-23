define([], function(){
	const toCamelCase = e => e.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
	const toHyphens = e => e.replace(/[A-Z]/g, function (g) { return '-'+g.toLowerCase(); });
	return {
		toHyphens,
		toCamelCase
	}
})