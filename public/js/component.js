define(["vue", "utils", "axios"], function(Vue, utils, axios) {
	const STYLE_ELEMENT_ID = "component-styles";
	let styleElement = null
	const fastEval = e => {
		try {
			return eval(e)
		}catch(e){
			console.log(e)
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
	
	const loadComponent = (url, callback, onError)=> {
		axios.get(url).then(r => {
			let html = r.data,
				div = document.createElement("div"),
				components = {};
			div.innerHTML = autoCloseTag(html);
			let comps = div.children;
			for(let i=0;i<comps.length;i++) {
				let comp = comps[i],
					name = comp.nodeName.toLowerCase(),
					t_n = comp.querySelector("template"),
					template = (t_n && t_n.innerHTML.trim() && '<div>' + t_n.innerHTML.trim() + '</div>') || '' ,
					s_n = comp.querySelector("script"),
					script = (s_n && s_n.innerHTML.trim() && '(' + s_n.innerHTML.trim() + ')') || '',
					cp = script && fastEval(script),
					st_n = comp.querySelector("style"),
					isScoped = (st_n && st_n.hasAttribute("scoped")),
					style = (st_n && st_n.innerHTML.trim() + '\n') || '';
				cp = "object" !== typeof cp ? {} : cp;
				addStyleToDocument(style);
				cp.template = template;
				cp.name = name;
				components[name] = cp;
			}
			callback(components)
		}).catch(e => {
			console.log(e.message);
			onError(e);
		})
	}
	return {
		loadComponent
	}
});
