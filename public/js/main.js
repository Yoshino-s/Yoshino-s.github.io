requirejs.config({
	paths: {
		polyfill: "https://cdn.polyfill.io/v2/polyfill.min",
		vue: "https://vuejs.org/js/vue",
		'vue-router': "https://unpkg.com/vue-router/dist/vue-router",
		vconsole: "https://unpkg.com/vconsole/dist/vconsole.min",
		muse: "https://unpkg.com/muse-ui/dist/muse-ui",
		axios: "https://unpkg.com/axios/dist/axios.min"
	}
});
requirejs(["polyfill", "vue", "vue-router", "vconsole", "muse", "component"], function(pf, Vue, Router, VConsole, Muse, cp) {
	let vc = new VConsole();
	Vue.use(Router);
	Vue.use(Muse);
	
	const Foo = { template: '<error></error>' }
	const Bar = { template: '<div>bar</div>' }
	
	
	cp.loadComponent("/js/component.html", (c)=>{
		console.log(c);
		window.c = c
		
		const routes = [
			{
				path: '/settings',
				component: {template: "<settings></settings>"}
			}, {
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
		
		for (let com in c) {
			let comp = c[com];
			Vue.component(comp.name, comp);
		}
	
		const app = new Vue({
			router
		}).$mount('#app');
	},e=>console.log(e.message));
	
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
