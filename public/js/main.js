requirejs.config({
	paths: {
		polyfill: "https://cdn.polyfill.io/v2/polyfill.min",
		vue: "https://vuejs.org/js/vue",
		'vue-router': "https://unpkg.com/vue-router/dist/vue-router",
		vconsole: "https://unpkg.com/vconsole/dist/vconsole.min",
		muse: "https://unpkg.com/muse-ui/dist/muse-ui",
		axios: "https://unpkg.com/axios/dist/axios.min",
		sortablejs: "https://cdn.jsdelivr.net/npm/sortablejs@1.7.0/Sortable.min",
		dragable: "https://cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.16.0/vuedraggable.min"
	}
});
console.timeStamp("requirejs loaded", true);
requirejs(["polyfill", "vue", "vue-router", "vconsole", "muse", "component" ,"utils"], function(pf, Vue, Router, VConsole, Muse, cp, utils) {
	console.timeStamp("main start", true);
	let vc = new VConsole();
	Vue.use(Router);
	Vue.use(Muse);
	
	cp.loadComponent("/js/component.html").then(c=>{
		console.timeStamp("component loaded");
		console.log(c);
		
		const routes = [
			{
				path: '/settings',
				component: {template: "<settings/>"}
			}, {
				path: '/signin',
				component: {template: "<sign-in/>"}
			}, {
				path: '/signup',
				component: {template: "<sign-up/>"}
			}, {
				path: '/devices',
				component: {template: "<device-list/>"}
			}, {
				path: '/adddevice',
				component: {template: "<add-device/>"}
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
		};
	
		const app = new Vue({
			router,
			data: {
				headerMenu: []
			}
		}).$mount('#app');
		console.timeStamp("vue configed");
	}).catch(e=>{
		console.log(e.message)
	});
});
