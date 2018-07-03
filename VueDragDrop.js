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

	var defaultElementBounds = {left: 0, top: 0, width: 0, height: 0};

	var defaultGhostSize = {width: 0, height: 0};

	var defaultRestrictBounds = {left: 0, top: 0, width: Infinity, height: Infinity};

	function data() {
		return {
			dragged: false,
			pointerPosition: {left: 0, top: 0},
			//relativeStartPointerPosition: {left: 0, top: 0},
			elementBounds: defaultElementBounds,
			ghostSize: defaultGhostSize,
			restrictBounds: defaultRestrictBounds,
		};
	}

	function Function_noop() {}

	var strategy = {
		get: function get(next) {
			return {
				onTouchStart: function onTouchStart(event) {
					if (event.touches.length === 1) {
						event.preventDefault();
						/*let pointerPosition = [
							event.touches[0].clientX,
							event.touches[0].clientY,
						];*/
						next({
							onTouchMove: function onTouchMove(event) {
								if (event.touches.length === 1) {
									event.preventDefault();
									this.dragged = true;
									this.pointerPosition = {
										left: event.touches[0].clientX,
										top: event.touches[0].clientY,
									};
									this.emitDragStart();
									this.emitDrag();
									next({
										onTouchMove: function onTouchMove(event) {
											if (event.touches.length === 1) {
												event.preventDefault();
												this.pointerPosition = {
													left: event.touches[0].clientX,
													top: event.touches[0].clientY,
												};
												this.emitDrag();
											}
										},
										onTouchEnd: function onTouchEnd(event) {
											if (event.changedTouches.length === 1) {
												event.preventDefault();
												this.pointerPosition = {
													left: event.changedTouches[0].clientX,
													top: event.changedTouches[0].clientY,
												};
												this.dragged = false;
												this.emitDragEnd();
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
						/*let pointerPosition = [
							event.clientX,
							event.clientY,
						];*/
						next({
							onMouseMove: function onMouseMove(event) {
								event.preventDefault();
								this.dragged = true;
								this.pointerPosition = {
									left: event.clientX,
									top: event.clientY,
								};
								this.emitDragStart();
								this.emitDrag();
								next({
									onMouseMove: function onMouseMove(event) {
										event.preventDefault();
										this.pointerPosition = {
											left: event.clientX,
											top: event.clientY,
										};
										this.emitDrag();
									},
									onMouseUp: function onMouseUp(event) {
										if (event.which === 1) {
											event.preventDefault();
											this.pointerPosition = {
												left: event.clientX,
												top: event.clientY,
											};
											this.dragged = false;
											this.emitDragEnd();
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

	function position() {
		var ref = this;
		var ghostSize = ref.ghostSize;
		var pointerPosition = ref.pointerPosition;
		var restrictBounds = ref.restrictBounds;

		return {
			left: Math_clamp(
				pointerPosition.left,
				restrictBounds.left,
				restrictBounds.left + restrictBounds.width - ghostSize.width
			),
			top: Math_clamp(
				pointerPosition.top,
				restrictBounds.top,
				restrictBounds.top + restrictBounds.height - ghostSize.height
			),
		};
	}

	function relativePosition() {
		var ref = this;
		var elementBounds = ref.elementBounds;
		var position = ref.position;

		return {
			left: position.left - elementBounds.left,
			top: position.top - elementBounds.top,
		};
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
		position: position,
		relativePosition: relativePosition,
		windowEventListeners: windowEventListeners,
	};

	function setAnimationLoop(callback, delay) {
		var run = (function () {
			requestAnimationFrame(function () {
				if (callback() !== false) {
					setTimeout(run, delay);
				}
			});
		});
		run();
	}

	function mounted() {
		var this$1 = this;

		Object.entries(this.windowEventListeners).forEach(function (ref) {
			var eventName = ref[0];
			var eventListener = ref[1];

			window.addEventListener(eventName, eventListener);
		});
		setAnimationLoop(function () {
			if (this$1._isDestroyed) {
				return false;
			}
			this$1.updateElementBounds();
			this$1.updateGhostSize();
			this$1.updateRestrictBounds();
		}, 1000);
	}

	function beforeDestroy() {
		Object.entries(this.windowEventListeners).forEach(function (ref) {
			var eventName = ref[0];
			var eventListener = ref[1];

			window.removeEventListener(eventName, eventListener);
		});
	}

	function Object_isObject(value) {
		return (value && typeof value === 'object');
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

	function emitDrag() {
		var ref = this;
		var position = ref.position;
		var data = ref.data;
		position = Lang_clone(position);
		this.$emit('drag', {
			position: position,
			data: data,
		});
	}

	function emitDragEnd() {
		var ref = this;
		var position = ref.position;
		var data = ref.data;
		position = Lang_clone(position);
		this.$emit('drag-end', {
			position: position,
			data: data,
		});
	}

	function emitDragStart() {
		var ref = this;
		var position = ref.position;
		var data = ref.data;
		position = Lang_clone(position);
		this.$emit('drag-start', {
			position: position,
			data: data,
		});
	}

	function getElementBounds() {
		var ref = this;
		var $el = ref.$el;
		if ($el) {
			var ref$1 = $el.getBoundingClientRect();
			var left = ref$1.left;
			var top = ref$1.top;
			var width = ref$1.width;
			var height = ref$1.height;
			return {left: left, top: top, width: width, height: height};
		}
		return defaultElementBounds;
	}

	function getGhostSize() {
		var ref = this;
		var $refs = ref.$refs;
		if ($refs) {
			var ghost = $refs.ghost;
			if (ghost) {
				var ref$1 = ghost.getBoundingClientRect();
				var width = ref$1.width;
				var height = ref$1.height;
				return {width: width, height: height};
			}
		}
		return defaultGhostSize;
	}

	function Vue_isVue(value) {
		return value && value._isVue;
	}

	function getRestrictBounds() {
		var ref = this;
		var restrict = ref.restrict;
		if (Function_isFunction(restrict)) {
			restrict = restrict();
		}
		if (Vue_isVue(restrict)) {
			restrict = restrict.$el;
		}
		if (restrict instanceof HTMLElement) {
			restrict = restrict.getBoundingClientRect();
		}
		if (restrict) {
			var left = restrict.left;
			var top = restrict.top;
			var width = restrict.width;
			var height = restrict.height;
			return {left: left, top: top, width: width, height: height};
		}
		return defaultRestrictBounds;
	}

	function updateElementBounds() {
		Object.assign(this.elementBounds, this.getElementBounds());
	}

	function updateGhostSize() {
		Object.assign(this.ghostSize, this.getGhostSize());
	}

	function updateRestrictBounds() {
		Object.assign(this.restrictBounds, this.getRestrictBounds());
	}

	var methods = {
		emitDrag: emitDrag,
		emitDragEnd: emitDragEnd,
		emitDragStart: emitDragStart,
		getElementBounds: getElementBounds,
		getGhostSize: getGhostSize,
		getRestrictBounds: getRestrictBounds,
		updateElementBounds: updateElementBounds,
		updateGhostSize: updateGhostSize,
		updateRestrictBounds: updateRestrictBounds,
	};

	function Function_identity(value) {
		return value;
	}

	function render (createElement) {
		var this$1 = this;

		var ref = this;
		var $scopedSlots = ref.$scopedSlots;
		var dragged = ref.dragged;
		var relativePosition = ref.relativePosition;
		var revertDuration = ref.revertDuration;
		var tag = ref.tag;

		$scopedSlots = Object.assign({}, {default: Function_identity},
			$scopedSlots);

		var defaultSlotElement = $scopedSlots.default({dragged: dragged});
		var ghostElementStyle = {
			position: 'relative',
		};
		/*if (dragged) {
			ghostElementStyle.transform = `translate(${relativePosition.left}px,${relativePosition.top}px)`;
		} else
		if (revertDuration > 0) {
			ghostElementStyle.transition = [
				'transform',
				`${revertDuration}ms`
			];
		}*/
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
		beforeDestroy: beforeDestroy,
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
