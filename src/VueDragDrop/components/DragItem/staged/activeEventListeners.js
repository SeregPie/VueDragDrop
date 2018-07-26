export default function(next) {
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
							this.triggerDragStart();
							this.triggerDrag();
							next({
								onTouchMove(event) {
									if (event.touches.length === 1) {
										event.preventDefault();
										this.pointerPosition = {
											left: event.touches[0].clientX,
											top: event.touches[0].clientY,
										};
										this.triggerDrag();
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
										this.triggerDragEnd();
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
						this.triggerDragStart();
						this.triggerDrag();
						next({
							onMouseMove(event) {
								event.preventDefault();
								this.pointerPosition = {
									left: event.clientX,
									top: event.clientY,
								};
								this.triggerDrag();
							},
							onMouseUp(event) {
								if (event.which === 1) {
									event.preventDefault();
									this.pointerPosition = {
										left: event.clientX,
										top: event.clientY,
									};
									this.dragged = false;
									this.triggerDragEnd();
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
}
