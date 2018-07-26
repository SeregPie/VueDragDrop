export default function(next) {
	return {
		onTouchStart(event) {
			if (event.touches.length === 1) {
				event.preventDefault();
				Object.assign(this.startPointerPosition, {
					left: event.touches[0].clientX,
					top: event.touches[0].clientY,
				});
				next({
					onTouchMove(event) {
						if (event.touches.length === 1) {
							event.preventDefault();
							this.active = true;
							Object.assign(this.pointerPosition, {
								left: event.touches[0].clientX,
								top: event.touches[0].clientY,
							});
							next({
								onTouchMove(event) {
									if (event.touches.length === 1) {
										event.preventDefault();
										Object.assign(this.pointerPosition, {
											left: event.touches[0].clientX,
											top: event.touches[0].clientY,
										});
									}
								},
								onTouchEnd(event) {
									if (event.changedTouches.length === 1) {
										event.preventDefault();
										Object.assign(this.pointerPosition, {
											left: event.touches[0].clientX,
											top: event.touches[0].clientY,
										});
										this.active = false;
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
				Object.assign(this.startPointerPosition, {
					left: event.clientX,
					top: event.clientY,
				});
				next({
					onMouseMove(event) {
						event.preventDefault();
						this.active = true;
						Object.assign(this.pointerPosition, {
							left: event.clientX,
							top: event.clientY,
						});
						next({
							onMouseMove(event) {
								event.preventDefault();
								Object.assign(this.pointerPosition, {
									left: event.clientX,
									top: event.clientY,
								});
							},
							onMouseUp(event) {
								if (event.which === 1) {
									event.preventDefault();
									Object.assign(this.pointerPosition, {
										left: event.clientX,
										top: event.clientY,
									});
									this.active = false;
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
