requirejs.config({
	paths: {
		polyfill: "https://cdn.polyfill.io/v2/polyfill.min",
		vue: "https://vuejs.org/js/vue",
		'vue-router': "https://unpkg.com/vue-router/dist/vue-router",
		vconsole: "https://unpkg.com/vconsole/dist/vconsole.min",
		muse: "https://unpkg.com/muse-ui/dist/muse-ui"
	}
});
requirejs(["polyfill", "vue", "vue-router", "vconsole", "muse", "component"], function(pf, Vue, Router, VConsole, Muse, cp) {
	let vc = new VConsole();
	Vue.use(Router);
	Vue.use(Muse);
	
	const Foo = { template: '<div>foo: {{ $route.params.id }}</div>' }
	const Bar = { template: '<div>bar</div>' }
	
	cp.loadComponent("/js/component.html", (c)=>{
		console.log(c);
		window.c = c
		
		const routes = [
			{
				path: '/user/:id',
				component: Foo
			}, {
				path: '/home',
				component: Bar
			}, {
				path: '*',
				component: c.error
			}
		];
		
		const router = new Router({
			mode: 'history',
			routes
		},e => {
			console.log(e);
		}) ;
	
		const app = new Vue({
			router,
			components: c,
		}).$mount('#app');
	});
	
	window.pss = n => {
		let t = [];
		for(let i=2;i<n+1;i++) {
			let f = true;
			for(let j=2;j<Math.floor(Math.sqrt(i))+1;j++) {
				if(i%j == 0) {
					f = false;
				}
			}
			if(f)
				t.push(i)
		}
		return t;
	}
});
