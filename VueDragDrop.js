(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueDragDrop = factory());
}(this, (function () { 'use strict';

	function Function_constant(value) {
		return function() {
			return value;
		};
	}

	function Function_isFunction(value) {
		return typeof value === 'function';
	}

	function Function_cast(value) {
		return Function_isFunction(value) ? value : Function_constant(value);
	}

	function VueStrategy(ref) {
		var getPartialStrategy = ref.get;
		var defaultStrategy = ref.default;

		getPartialStrategy = Function_cast(getPartialStrategy);
		var methods = {};
		Object.keys(defaultStrategy).forEach(function (key) {
			methods[key] = function() {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return this.strategy[key].apply(this, args);
			};
		});
		var next = function(value) {
			this.getPartialStrategy = value ? Function_cast(value) : getPartialStrategy;
		};
		return {
			data: function data() {
				return {getPartialStrategy: getPartialStrategy};
			},
			computed: {
				strategy: function strategy() {
					return Object.assign({}, defaultStrategy,
						this.getPartialStrategy(next.bind(this)));
				},
			},
			methods: methods,
		};
	}

	var props = {
		tag: {
			type: String,
			default: 'div',
		},

		revertDuration: {
			type: Number,
			default: 0,
		},

		restrict: {},

		data: {},
	};

	function data() {
		return {
			dragged: false,
			startPosition: [0, 0],
			position: [0, 0],
		};
	}

	function Function_noop() {}

	var strategy = {
		get: function get(next) {
			return {
				onTouchStart: function onTouchStart(event) {
					if (event.touches.length === 1) {
						event.preventDefault();
						var startPosition = [
							event.touches[0].clientX,
							event.touches[0].clientY ];
						next({
							onTouchMove: function onTouchMove(event) {
								if (event.touches.length === 1) {
									event.preventDefault();
									var position = [
										event.touches[0].clientX,
										event.touches[0].clientY ];
									this.triggerDragStart(startPosition);
									this.triggerDrag(position);
									next({
										onTouchMove: function onTouchMove(event) {
											if (event.touches.length === 1) {
												event.preventDefault();
												position = [
													event.touches[0].clientX,
													event.touches[0].clientY ];
												this.triggerDrag(position);
											}
										},
										onTouchEnd: function onTouchEnd(event) {
											if (event.changedTouches.length === 1) {
												event.preventDefault();
												position = [
													event.changedTouches[0].clientX,
													event.changedTouches[0].clientY ];
												this.triggerDragEnd(position);
												next();
											}
										},
									});
								}
							},
							onTouchEnd: function onTouchEnd(event) {
								if (event.changedTouches.length === 1) {
									event.preventDefault();
									next();
								}
							},
						});
					}
				},
				onMouseDown: function onMouseDown(event) {
					if (event.which === 1) {
						event.preventDefault();
						var startPosition = [
							event.clientX,
							event.clientY ];
						next({
							onMouseMove: function onMouseMove(event) {
								event.preventDefault();
								var position = [
									event.clientX,
									event.clientY ];
								this.triggerDragStart(startPosition);
								this.triggerDrag(position);
								next({
									onMouseMove: function onMouseMove(event) {
										event.preventDefault();
										position = [
											event.clientX,
											event.clientY ];
										this.triggerDrag(position);
									},
									onMouseUp: function onMouseUp(event) {
										if (event.which === 1) {
											event.preventDefault();
											position = [
												event.clientX,
												event.clientY ];
											this.triggerDragEnd(position);
											next();
										}
									},
								});
							},
							onMouseUp: function onMouseUp(event) {
								if (event.which === 1) {
									event.preventDefault();
									next();
								}
							},
						});
					}
				},
			};
		},

		default: {
			onTouchStart: Function_noop,
			onTouchMove: Function_noop,
			onTouchEnd: Function_noop,
			onMouseDown: Function_noop,
			onMouseMove: Function_noop,
			onMouseUp: Function_noop,
		},
	};

	function Math_clamp(n, min, max) {
		return Math.min(Math.max(n, min), max);
	}

	function restrictedPosition() {
		var ref = this;
		var position = ref.position;
		var restrictedArea = this.getRestrictedArea();

		return [
			Math_clamp(
				position[0],
				restrictedArea[0],
				restrictedArea[1]
			),
			Math_clamp(
				position[1],
				restrictedArea[2],
				restrictedArea[3]
			) ];
	}

	function translatedPosition() {
		var ref = this;
		var startPosition = ref.startPosition;
		var restrictedPosition = ref.restrictedPosition;

		return [
			restrictedPosition[0] - startPosition[0],
			restrictedPosition[1] - startPosition[1] ];
	}

	function Object_mapValues(object, iteratee) {
		var returns = {};
		Object.entries(object).forEach(function (ref) {
			var key = ref[0];
			var value = ref[1];

			returns[key] = iteratee(value, key);
		});
		return returns;
	}

	function windowEventListeners() {
		var this$1 = this;

		return Object_mapValues({
			mousemove: this.onMouseMove,
			mouseup: this.onMouseUp,
		}, function (f) { return f.bind(this$1); });
	}

	var computed = {
		restrictedPosition: restrictedPosition,
		translatedPosition: translatedPosition,
		windowEventListeners: windowEventListeners,
	};

	function mounted() {
		Object.entries(this.windowEventListeners).forEach(function (ref) {
			var eventName = ref[0];
			var eventListener = ref[1];

			window.addEventListener(eventName, eventListener);
		});
	}

	function Object_isObject(value) {
		return value && typeof value === 'object';
	}

	function getRestrictedArea() {
		var ref = this;
		var restrict = ref.restrict;

		if (Function_isFunction(restrict)) {
			restrict = restrict();
		}
		if (Array.isArray(restrict)) {
			return restrict;
		}
		if (restrict) {
			if (restrict.$el) {
				restrict = restrict.$el;
			}
			if (restrict instanceof HTMLElement) {
				restrict = restrict.getBoundingClientRect();
			}
			if (Object_isObject(restrict)) {
				var left = restrict.left;
				var top = restrict.top;
				var width = restrict.width;
				var height = restrict.height;
				return [left, left + width, top, top + height];
			}
		}
		return [0, Infinity, 0, Infinity];
	}

	var Lang_clone = function(value) {
		if (Array.isArray(value)) {
			return value.map(Lang_clone);
		}
		if (Object_isObject(value)) {
			return Object_mapValues(value, Lang_clone);
		}
		return value;
	};

	function triggerDrag(position) {
		this.position = position;
		this.$emit('drag', Lang_clone(this.restrictedPosition));
	}

	function triggerDragEnd(position) {
		this.position = position;
		this.dragged = false;
		this.$emit('drag-end', Lang_clone(this.restrictedPosition));
	}

	function triggerDragStart(position) {
		this.dragged = true;
		this.startPosition = position;
		this.position = position;
		this.$emit('drag-start', Lang_clone(this.restrictedPosition));
	}

	var methods = {
		getRestrictedArea: getRestrictedArea,
		triggerDrag: triggerDrag,
		triggerDragEnd: triggerDragEnd,
		triggerDragStart: triggerDragStart,
	};

	function Function_identity(value) {
		return value;
	}

	function render (createElement) {
		var this$1 = this;

		var ref = this;
		var $scopedSlots = ref.$scopedSlots;
		var dragged = ref.dragged;
		var translatedPosition = ref.translatedPosition;
		var revertDuration = ref.revertDuration;
		var tag = ref.tag;

		$scopedSlots = Object.assign({}, {default: Function_identity},
			$scopedSlots);

		var defaultSlotElement = $scopedSlots.default({dragged: dragged});
		var ghostElementStyle = {
			position: 'relative',
		};
		if (dragged) {
			ghostElementStyle.transform = "translate(" + (translatedPosition.map(function (v) { return (v + "px"); }).join(',')) + ")";
		} else
		if (revertDuration > 0) {
			ghostElementStyle.transition = [
				'transform',
				(revertDuration + "ms")
			];
		}
		var ghostElement = createElement(
			tag,
			{
				style: ghostElementStyle,
				ref: 'ghost',
			},
			[defaultSlotElement]
		);
		var mainElement = createElement(
			tag,
			{
				style: {
					display: 'inline-block',
				},
				on: Object_mapValues({
					touchstart: this.onTouchStart,
					touchmove: this.onTouchMove,
					touchend: this.onTouchEnd,
					mousedown: this.onMouseDown,
				}, function (f) { return f.bind(this$1); }),
			},
			[ghostElement]
		);
		return mainElement;
	}

	var index = {
		name: 'VueDragItem',
		mixins: [
			VueStrategy(strategy) ],
		props: props,
		data: data,
		computed: computed,
		//watch,
		mounted: mounted,
		methods: methods,
		render: render,
	};

	//export {default as DropArea} from './DropArea';

	var components = /*#__PURE__*/Object.freeze({
		DragItem: index
	});

	var VueDragDrop = Object.assign({}, {install: function install(Vue) {
			Object.values(this.components).forEach(function (component) {
				Vue.component(component.name, component);
			});
		},
		components: components},
		components);

	if (typeof window !== 'undefined' && window.Vue) {
		window.Vue.use(VueDragDrop);
	}

	return VueDragDrop;

})));
