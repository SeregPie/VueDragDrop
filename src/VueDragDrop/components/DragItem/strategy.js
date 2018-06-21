import Function_noop from '/utils/Function/noop';

export default {
	get(next) {
		return {
			onTouchStart(event) {
				if (event.touches.length === 1) {
					event.preventDefault();
					let startPosition = [
						event.touches[0].clientX,
						event.touches[0].clientY,
					];
					next({
						onTouchMove(event) {
							if (event.touches.length === 1) {
								event.preventDefault();
								let currentPosition = [
									event.touches[0].clientX,
									event.touches[0].clientY,
								];
								this.triggerDragStart(startPosition);
								this.triggerDrag(currentPosition);
								next({
									onTouchMove(event) {
										if (event.touches.length === 1) {
											event.preventDefault();
											currentPosition = [
												event.touches[0].clientX,
												event.touches[0].clientY,
											];
											this.triggerDrag(currentPosition);
										}
									},
									onTouchEnd(event) {
										if (event.changedTouches.length === 1) {
											event.preventDefault();
											currentPosition = [
												event.changedTouches[0].clientX,
												event.changedTouches[0].clientY,
											];
											this.triggerDragEnd(currentPosition);
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
					let startPosition = [
						event.clientX,
						event.clientY,
					];
					next({
						onMouseMove(event) {
							event.preventDefault();
							let currentPosition = [
								event.clientX,
								event.clientY,
							];
							this.triggerDragStart(startPosition);
							this.triggerDrag(currentPosition);
							next({
								onMouseMove(event) {
									event.preventDefault();
									currentPosition = [
										event.clientX,
										event.clientY,
									];
									this.triggerDrag(currentPosition);
								},
								onMouseUp(event) {
									if (event.which === 1) {
										event.preventDefault();
										currentPosition = [
											event.clientX,
											event.clientY,
										];
										this.triggerDragEnd(currentPosition);
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
