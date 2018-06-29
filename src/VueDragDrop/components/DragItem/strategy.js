import Function_noop from '/utils/Function/noop';

export default {
	get(next) {
		return {
			onTouchStart(event) {
				if (event.touches.length === 1) {
					event.preventDefault();
					/*let pointerPosition = [
						event.touches[0].clientX,
						event.touches[0].clientY,
					];*/
					next({
						onTouchMove(event) {
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
									onTouchMove(event) {
										if (event.touches.length === 1) {
											event.preventDefault();
											this.pointerPosition = {
												left: event.touches[0].clientX,
												top: event.touches[0].clientY,
											};
											this.emitDrag();
										}
									},
									onTouchEnd(event) {
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
						onTouchEnd(event) {
							if (event.changedTouches.length === 1) {
								event.preventDefault();
								next();
							}
						},
					});
				}
			},
			onMouseDown(event) {
				if (event.which === 1) {
					event.preventDefault();
					/*let pointerPosition = [
						event.clientX,
						event.clientY,
					];*/
					next({
						onMouseMove(event) {
							event.preventDefault();
							this.dragged = true;
							this.pointerPosition = {
								left: event.clientX,
								top: event.clientY,
							};
							this.emitDragStart();
							this.emitDrag();
							next({
								onMouseMove(event) {
									event.preventDefault();
									this.pointerPosition = {
										left: event.clientX,
										top: event.clientY,
									};
									this.emitDrag();
								},
								onMouseUp(event) {
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
						onMouseUp(event) {
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
