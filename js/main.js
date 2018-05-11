requirejs.config({
	paths: {
		polyfill: "https://cdn.polyfill.io/v2/polyfill.min",
		vue: "https://cdn.jsdelivr.net/npm/vue/dist/vue",
		'vue-router': "https://cdn.jsdelivr.net/npm/vue-router/dist/vue-router.min",
		vconsole: "https://cdn.jsdelivr.net/npm/vconsole/dist/vconsole.min",
		muse: "https://cdn.jsdelivr.net/npm/muse-ui/dist/muse-ui",
		axios: "https://cdn.jsdelivr.net/npm/axios/dist/axios.min",
		sortablejs: "https://cdn.jsdelivr.net/npm/sortablejs/Sortable.min",
		dragable: "https://cdn.jsdelivr.net/npm/vuedraggable/dist/vuedraggable.min",
		echarts: "https://cdn.jsdelivr.net/npm/echarts/dist/echarts.common.min",
		marked: "https://cdn.jsdelivr.net/npm/marked/marked.min",
		highlightjs: "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.12.0/build/highlight.min",
		term: "/js/lib/term",
		'component-loader': "/js/component-loader",
		loader: '/js/loader'
	}
});
console.timeStamp("requirejs loaded", true);
requirejs(["polyfill", "vue", "vue-router", "vconsole", "muse", "component-loader" ,"utils", "echarts", "loader"], function(pf, Vue, Router, VConsole, Muse, cp, utils, echarts, loader) {
	window.loader = loader;
	console.timeStamp("main start", true);
	let vc = new VConsole();
	Vue.use(Router);
	Vue.use(Muse);
	
	cp.loadComponent("/js/component.html").then(c=>{
		console.timeStamp("component loaded");
		console.log(c);
		
		const routes = [
			{
				path: '/paragraph/',
				component: c.Paragraph
			}, {
				path: '/settings/',
				component: c.Settings
			}, {
				path: '/signin/',
				component: c.SignIn
			}, {
				path: '/signup/',
				component: c.SignUp
			}, {
				path: '/devices/',
				component: c.DeviceList
			}, {
				path: '/adddevice/',
				component: c.AddDevice
			}, {
				path: '/device/:id/',
				component: c.Device,
				children: [
					{
						path: '',
						redirect: 'power/' 
					}, {
						path: 'power/' ,
						component: c.DevicePower
					}, {
						path: 'timer/' ,
						component: c.DeviceTimer
					}, {
						path: 'option/' ,
						component: c.DeviceOption
					}
				]
			}, {
				path: '/device/:id/timer/:tmr_id/',
				component: c.TimerPage
			}, {
				path: '/repl/',
				component: c.Terminal
			}, {
				path: '*',
				component: c.Error
			}
		];
		
		const router = new Router({
			mode: 'hash',
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
				headerMenu: [],
				transitionName: 'slide-left'
			},
			watch: {
				'$route' (to, from) {
					const toDepth = to.path.split('/').length
					const fromDepth = from.path.split('/').length
					this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
				}
			}
		}).$mount('#app');
		console.timeStamp("vue configed");
	}).catch(e=>{
		console.log(e.message)
	});
});
