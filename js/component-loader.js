define(["vue", "utils", "axios", "dragable", "echarts", "term"], function(Vue, utils, axios, dragable, echarts, Terminal) {
	window.axios=axios;
	const STYLE_ELEMENT_ID = "component-styles";
	let styleElement = null;
	
	const fastEval = e => {
		let _expose = {};
		const expose = o => {_expose=o}
		try {
			eval(e);
			return _expose;
		}catch(e){
			console.log(e.message)
		}
	}
	
	const addStyleToDocument = (s) => {
		if (!s) return;
		if (styleElement === null ) {
			styleElement = document.createElement("style");
			styleElement.id = STYLE_ELEMENT_ID;
			document.head.append(styleElement);
		}
		styleElement.innerHTML += '\n' + s;
		
	}
	
	const autoCloseTag = s => s.replace(/<([a-z\-]+)[^>]*\/>/g, (fs, s)=>fs.slice(0,-2)+'></'+s+'>');
	
	const loadComponent = (url, dumpStyles) => axios.get(url).then(r => {
		let html = r.data,
			div = document.createElement("div"),
			components = {},
			styles = "";
		div.innerHTML = autoCloseTag(html);
		let comps = div.children;
		for(let i=0;i<comps.length;i++) {
			let comp = comps[i],
				name = comp.nodeName.toLowerCase(),
				t_n = comp.querySelector("template"),
				template = (t_n && t_n.innerHTML.trim() && ((t_n.content.childNodes.length > 1) ? '<div>' + t_n.innerHTML.trim() + '</div>' : t_n.innerHTML.trim())) || '' ,
				s_n = comp.querySelector("script"),
				script = (s_n && s_n.innerHTML.trim() && '(' + s_n.innerHTML.trim() + ')') || '',
				cp = script && fastEval(script),
				st_n = comp.querySelector("style"),
				isScoped = (st_n && st_n.hasAttribute("scoped")),
				style = (st_n && st_n.innerHTML.trim() + '\n') || '';
			if(name === "global") {
				if(!dumpStyles) {
					addStyleToDocument(style);
				}else {
					styles += '\n' + style;
				}
				continue;
			}
			cp = "object" !== typeof cp ? {} : cp;
			if(!dumpStyles) {
				addStyleToDocument(style);
			}else {
				styles += '\n' + style;
			}
			cp.template = template;
			cp.name = name;
			components[utils.toCamelCase('-'+name)] = cp;
		}
		components["dragable"] = dragable;
		if(!dumpStyles)
			return components
		else
			return {components, styles}
	})
	
	return {
		loadComponent,
		addStyleToDocument
	}
});
