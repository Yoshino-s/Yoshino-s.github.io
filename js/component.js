define(["vue", "muse"], function(Vue, Muse) {
	const fastEval = (e)=> {
		
	}
	
	const addStyleToDocument
	
	const loadComponent = (url, callback, onError)=> {
		fetch(url).then(r => {
			if(r.ok)
				return r.text();
			else
				throw new TypeError("404 NotFound");
		}).then(t => {
			let html = t,
				div = document.createElement("div"),
				components = {};
			div.innerHTML = html;
			let comps = div.children;
			for(let i=0;i<comps.length;i++) {
				let comp = comps[i],
					name = comp.nodeName.toLowerCase(),
					t_n = comp.querySelector("template"),
					template = (t_n && t_n.innerHTML.trim() && '<div>' + t_n.innerHTML.trim() + '</div>') || '' ,
					s_n = comp.querySelector("script"),
					script = (s_n && s_n.innerHTML.trim() && '(' + s_n.innerHTML.trim() + ')') || '',
					cp = script && eval(script),
					st_n = comp.querySelector("style"),
					isScoped = (st_n && st_n.hasAttribute("scoped")),
					style = (st_n && s_n.innerHTML.trim() + '\n') || '';
				cp = "object" !== typeof cp ? {} : cp;
				cp.template = template;
				cp.name = name;
				components[name] = cp;
			}
			callback(components)
		}).catch(e => {
			onError(e);
		})
	}
	return {
		loadComponent
	}
});
