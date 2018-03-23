define(["polyfill", "utils", "Vue", "mdui"], function(polyfill, utils, Vue, mdui) {
	window.utils = utils;
	console.error = utils.log;
	window.Vue = Vue;
	window.$$ = mdui.JQ;
	
	var exist = (...e) => (e.forEach(i => i !== undefined));
	
	var mixin = {
		props: ["ripple", "accent"],
		computed: {
			cls() {
				var clazz = {};
				Object.assign(clazz, this.bindClass?this.bindClass():{}, {
					"mdui-ripple": this.ripple !== undefined,
					"mdui-color-theme-accent": this.accent !== undefined
				});
				utils.dmp(clazz);
				return clazz;
			}
		},
		methods: {
			exist: exist
		}
	};
	
	var comps = {
		"m-btn": {
			template: '<button class="mdui-btn" :class="cls"><slot></slot></button>',
			props: ["raised", "dense", "block", "icon"],
			methods: {
				bindClass() {
					return {
						"mdui-btn-raised": exist(this.raised),
						"mdui-btn-dense": exist(this.dense),
						"mdui-btn-block": exist(this.block),
						"mdui-btn-icon": exist(this.icon)
					}
				}
			}
		},
		"m-btn-a": {
			template: '<a class="mdui-btn" :class="cls"><slot></slot></a>',
			props: ["raised", "dense", "block", "icon"],
			methods: {
				bindClass() {
					return {
						"mdui-btn-raised": exist(this.raised),
						"mdui-btn-dense": exist(this.dense),
						"mdui-btn-block": exist(this.block),
						"mdui-btn-icon": exist(this.icon)
					}
				}
			}
		},
		"m-icon": {
			template: '<i class="mdui-icon material-icons" :class="cls"><slot></slot></i>',
			props: ["right", "left"],
			methods: {
				bindClass() {
					if(exist(this.right))
						return {"mdui-icon-right": true};
					else if(exist(this.left))
						return {"mdui-icon-left": true};
					else
						return {}
				}
			}
		},
		"m-fab": {
			template: '<button class="mdui-fab" :class="cls"><m-icon><slot></slot></m-icon></button>',
			props: ["hide", "fixed", "mini"],
			methods: {
				bindClass() {
					return {
						"mdui-fab-fixed": exist(this.fixed),
						"mdui-fab-hide": exist(this.hide),
						"mdui-fab-mini": exist(this.mini)
					}
				}
			}
		},
		"m-divider": {
			template: '<div :class="cls"></div>',
			props: ["inset"],
			methods: {
				bindClass() {
					if (exist(this.inset))
						return {"mdui-divider-inset": true};
					else 
						return {"mdui-divider": true};
				}
			}
		},
		"m-progress": {
			template: `<div class="mdui-progress"><div :class="cls" :style="{ width: value+'%' }"></div></div>`,
			props: ["determined", "percent"],
			data: function() {
				return {
					value: this.percent?this.percent:0
				}
			},
			methods: {
				bindClass() {
					if (exist(this.determined))
						return {"mdui-progress-determinate": true};
					else 
						return {"mdui-progress-indeterminate": true};
				}
			}
		},
		"m-spinner": {
			template: '<div class="mdui-spinner" :class="cls" :style="cstyle"></div>',
			props: {
				"colorful": {},
				"scale": {
					type: Number,
					default: 25
				}
			},
			methods: {
				bindClass() {
					return {"mdui-spinner-colorful": exist(this.colorful)};
				}
			},
			computed: {
				cstyle() {
					return {
						width: this.scale + "px",
						height: this.scale + "px",
					}
				}
			},
			mounted() {
				mdui.mutation(this.$el);
			}
		},
		"m-fab-menu": {
			template: "#m-fab-menu",
			props: {
				"native": {
					type: String,
					default: "menu"
				},
				"advanced": {
				},
				"opened": String,
				"dial": {
					type: Array,
					default: []
				},
				"options": {
					type: Object,
					default: ()=>{return {}}
				}
			},
			mounted() {
				this.$inst = new mdui.Fab(this.$el, this.options);
			}
		},
		"m-panel": {
			template: '<div class="mdui-panel" :class="cls"><slot></slot></div>',
			props: {
				"options": {
					type: Object,
					default: ()=>{return {}}
				},
				"gapless": {
				},
				"popout": {
				}
			},
			methods: {
				bindClass() {
					return {
						"mdui-panel-gapless": exist(this.gapless),
						"mdui-panel-popout": exist(this.popout)
					}
				}
			},
			mounted() {
				this.$inst = new mdui.Panel(this.$el, this.options);
			}
		},
		"m-panel-item": {
			template: "#m-panel-item",
			props: {
				"title": {
					type: String,
					default: "menu"
				},
				"summary": String,
				"arrow": {
				}
			},
			methods: {
				bindClass() {
					utils.log(2334);
					return {
						"mdui-panel-item-open": exist(this.open)
					}
				}
			}
		},
		"m-chip": {
			template: "#m-chip",
			props: {
				"icon": {
					type: String,
					default: "#"
				},	
				"del": {
				}
			},
			data() {
				return {
					closed: false
				}
			},
			computed: {
				iconcontent() {
					if(this.icon === "#")
						return this.$slots.default[0].text[0];
					if(this.icon.length === 1)
						return this.icon;
					else
						return '<i class="mdui-icon material-icons">' + this.icon + '</i>';
					
				}
			},
			methods: {
				close() {
					this.closed = true;
				}
			}
		},
		"m-drawer": {
			template: '<div class="mdui-drawer" :class="cls"><slot></slot></div>',
			props: {
				"options": {
					type: Object,
					default: ()=>{return {}}
				},
				"trigger": {
				},
				"right": {
				}
			},
			methods: {
				bindClass() {
					return {
						"mdui-drawer-right": exist(this.right)
					}
				}
			},
			mounted() {
				this.$inst = new mdui.Drawer(this.$el, this.options);
				if (exist(this.right)) {
					document.body.classList.add("mdui-drawer-body-right");
				}else {
					document.body.classList.add("mdui-drawer-body-left");
				}
				if(this.trigger !== undefined)
					$$(this.trigger).on("click", ()=>{this.$inst.open()})
			}
		},
		"m-toolbar": {
			template: '<div class="mdui-toolbar" :class="cls"><slot></slot></div>'
		},
		"m-toolbar-spacer": {
			template: '<div class="mdui-toolbar-spacer"></div>'
		},
		"m-select": {
			template: '<div class="mdui-select"><slot></slot></div>',
			props: {
				"options": {
					type: Object,
					default: ()=>{return {}}
				}
			},
			mounted() {
				this.$inst = new mdui.Select(this.$el, this.options);
			}
		},
		"m-dialog": {
			template: '#m-dialog',
			props: {
				"options": {
					type: Object,
					default: ()=>{return {}}
				},
				"title": String,
				"stacked": {
				},
				"advanced": {
				},
				"trigger": {
				}
			},
			mounted() {
				this.$inst = new mdui.Dialog(this.$el, this.options);
				if(this.trigger)
					$$(this.trigger).on("click", ()=>{this.$inst.open()})
			}
		}
	};
	
	var registeComps = (t) => {
		$$("#templates").html(t);
		for (let c in comps) {
			comps[c].mixins = [mixin];
			Vue.component(c, comps[c]);
			utils.log(c);
		}
	};
	
	return {
		registeComps,
		comps,
		mixin
	}
	
	
});
