export default function(set, reset) {
	return {
		onTouchStart(event) {
			if (event.touches.length === 1) {
				event.preventDefault();
				Object.assign(this.startPointerPosition, {
					left: event.touches[0].clientX,
					top: event.touches[0].clientY,
				});
				set({
					onTouchMove(event) {
						if (event.touches.length === 1) {
							event.preventDefault();
							this.dragged = true;
							Object.assign(this.pointerPosition, {
								left: event.touches[0].clientX,
								top: event.touches[0].clientY,
							});
							set({
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
											left: event.changedTouches[0].clientX,
											top: event.changedTouches[0].clientY,
										});
										this.dragged = false;
										reset();
									}
								},
							});
						}
					},
					onTouchEnd(event) {
						if (event.changedTouches.length === 1) {
							event.preventDefault();
							reset();
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
				set({
					onMouseMove(event) {
						event.preventDefault();
						this.dragged = true;
						Object.assign(this.pointerPosition, {
							left: event.clientX,
							top: event.clientY,
						});
						set({
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
									this.dragged = false;
									reset();
								}
							},
						});
					},
					onMouseUp(event) {
						if (event.which === 1) {
							event.preventDefault();
							reset();
						}
					},
				});
			}
		},
	};
}
