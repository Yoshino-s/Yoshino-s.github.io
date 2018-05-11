define(["axios"], function(axios) {
	const STYLE_ELEMENT_ID = "component-styles";
	let styleElement = null;
	
	const addStyleToDocument = (s) => {
		if (!s) return;
		if (styleElement === null ) {
			styleElement = document.createElement("style");
			styleElement.id = STYLE_ELEMENT_ID;
			document.head.append(styleElement);
		}
		styleElement.innerHTML += '\n' + s;
	};
	
	class Loader {
		constructor() {
		};
		load(path) {
		};
	};
	class DefaultLoader extends Loader{
		constructor() {
			super();
		};
		load(path, type) {
			let typeMap = {
				"css-raw": {
					request: true,
					func: r=>(addStyleToDocument(r.data),r.data)
				},
				"js-raw": {
					request: true,
					func: r=>window.eval(r.data)
				},
				"plain": {
					request: true,
					func: r=>r.data
				},
				"css": {
					request: false,
					func: ()=>{let _=document.createElement("link");_.rel="stylesheet";_.href=path;document.head.appendChild(_);}
				},
				"js": {
					request: false,
					func: ()=>{let _=document.createElement("script");_.type="text/javascript";_.src=path;document.head.appendChild(_);}
				},
			};
			
			let exn = path.split('.').slice(-1);
			if(type === undefined) {
				type = "plain";
				if(exn.length > 0 ) {
					type = exn[0];
				}
			}
			if(!typeMap[type]) {
				type = "plain";
			}
			
			if(typeMap[type].request) {
				let response = axios.get(path);
				return response.then(typeMap[type].func)
			}else {
				return typeMap[type].func();
			}
		}
	};
	const load = (path, loader) => {
		
		if(loader === undefined) {
			loader = new DefaultLoader()
		}
		if(!loader instanceof Loader) {
			throw new TypeError("loader should be an instance of Loader.");
		}
		return loader.load(path);
	};
	
	return {load};
})