define(["mdui"], function(mdui){
	var $$ = mdui.JQ;
	var console_ = $$("#console"),
		codediv = $$("#code-div"),
		code = $$("#code"),
		codo = $$("#console-down"),
		tmp = $$("<div></div>"),
		needStackDump = false;
	
	$$("#clear-console").on("click",function(){
		console_.text("")
	})
	$$("#run-code").on("click",function(){
		var c = code.get(0)
		if(!c.value)
			return
		consoleWriteln("> " + c.value)
		try {
			consoleWriteln(window.eval(c.value))
		}catch(e){
			log(e);
			if (needStackDump) {
				log(e.stack);
			}
		}
		c.value = "";
	})
	code.on("keypress",function(e){
		if(e.key==="Enter")
			$$("#run-code").trigger("click")
	})
	function consoleWrite(t) {
		console_.html(console_.html() + t)
		codo.get(0).scrollIntoView()
	}
	function consoleWriteln(t) {
		tmp.text(t)
		console_.html(console_.html() + (t==undefined?"undefined":tmp.html()) + "\n")
		codo.get(0).scrollIntoView()
	}
	function consoleWritelnHTML(t) {
		console_.html(console_.html() + t + "\n")
		codo.get(0).scrollIntoView()
	}
	function log(t){
		consoleWriteln(t)
	}
	function logHTML(t){
		consoleWritelnHTML(t)
	}
	function dump(o, t=Prism.languages.javascript) {
		if(o && o.toSource)
			logHTML(Prism.highlight(o.toSource(), t))
	}
	
	
	$$.fn.extend({
		setClass:function(cls, bl) {
			if(cls){
				this[0].classList.toggle(cls, bl)
			}
		},
		id:function(i) {
			if(i == undefined) {
				return this[0].id;
			}
			this[0].id = i;
			return this[0].id;
		},
		animate: function(...args) {
			return this[0].animate(...args);
		}
	});
	
	return {
		log: log,
		dmp: dump,
		logH: logHTML
	};
})