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
		highlightjs: "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.12.0/build/highlight.min"
	}
});
console.timeStamp("requirejs loaded", true);
requirejs(["polyfill", "vue", "vue-router", "vconsole", "muse", "component" ,"utils", "echarts"], function(pf, Vue, Router, VConsole, Muse, cp, utils, echarts) {
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
				path: '/device/:id',
				component: {template: "<device/>"}
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
	/*var myChart = echarts.init(document.getElementById('ttt'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            legend: {
                data:['alpha',"beta", "gamma"]
            },
            xAxis: {
            	data: []
			},
			yAxis: {
				type: "value",
				min: -500,
				max: 500
			},
            series: [{
            	name: "alpha",
                type: 'line',
                data: []
            },{
            	name: "beta",
                type: 'line',
                data: []
            },{
            	name: "gamma",
                type: 'line',
                data: []
            }]
        };
    let alpha = 0, beta = 0, gamma = 0;
	window.addEventListener('devicemotion', event=>{
		let interval = event.interval
		alpha+=event.rotationRate.alpha*interval/1000;
		alpha%=360;
		beta+=event.rotationRate.beta*interval/1000;
		beta%=360;
		gamma+=event.rotationRate.gamma*interval/1000;
		gamma%=360;
	});
	let addAlpha = ()=>{
		option.series[0].data.push(alpha);
		option.series[1].data.push(beta);
		option.series[2].data.push(gamma);
		if(option.series[0].data.length>50) {
			option.series[0].data.shift(0);
			option.series[1].data.shift(0);
			option.series[2].data.shift(0);
		}
		myChart.setOption(option);
		setTimeout(addAlpha, 100);
	}
	setTimeout(addAlpha, 100);*/
});
