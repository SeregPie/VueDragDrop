export default function() {
	this.$watch('dragged', dragged => {
		if (dragged) {
			this.$watch('accepted', accepted => {
				if (accepted) {
					this.$emit('drag-start', {position});
					this.$watch('draggedInside', draggedInside => {
						if (draggedInside) {
							this.$watch('dragged', dragged => {
								if (!dragged) {
									this.$emit('drag-out');
									this.$emit('drag-end');
									// end
								}
							});
							this.$watch('accepted', accepted => {
								if (!accepted) {
									// end
								}
							});
							this.$watch('draggedInside', draggedInside => {
								if (!draggedInside) {

								} else {

								}
							});
						} else {

						}
					});
					this.$watch('accepted', accepted => {
						if (!accepted) {
							// end
						}
					});
				}
			});
			let {accepted} = this;
			if (accepted) {
				let {
					draggedInside,
					position,
				} = this;
				if (draggedInside) {
					this.$watch('draggedOuside', draggedOuside => {
						if (draggedOuside) {
							this.$watch('draggedInside', draggedInside => {
								if (draggedInside) {
									this.$watch('accepted', accepted => {
										if (!accepted) {
											this.$emit('drag-out', {position});
											this.$emit('drag-end', {position});
										}
									});
								} else {

								}
							});
						} else {

						}
					});
				}
			}
			this.$watch('accepted', accepted => {
				if (accepted) {
					this.$emit('drag-start', {position});
					this.$watch('draggedInside', draggedInside => {
						if (draggedInside) {
							this.$watch('draggedInside', draggedInside => {
								if (draggedInside) {
									this.$watch('accepted', accepted => {
										if (!accepted) {
											this.$emit('drag-out', {position});
											this.$emit('drag-end', {position});
										}
									});
								} else {

								}
							});
						} else {

						}
					});
					this.$watch('accepted', accepted => {
						if (!accepted) {
							// end
						}
					});
				}
			});
			this.$watch('dragged', dragged => {
				if (!dragged) {
					// end
				}
			});
		}

	});
	let {dragged} = this;
	if (dragged) {
		let {accepted} = this;
		if (accepted)
	}
	return {
		dragged(dragged) {
			if (dragged) {
				return {
					accepted(accepted) {
						if (accepted) {
							this.$emit('drag-start', {position});
							return {
								aaaa(position) {
									this.$emit('drag', {position});
								},
								draggedInside(draggedInside) {
									if (draggedInside) {
										this.$emit('drag-over', {position});
										return {
											aaaa() {
												this.$emit('drag-inside', {position});
											},
										}
									} else {
										this.$emit('drag-out', {position});
										return {
											aaaa() {
												this.$emit('drag-outside', {position});
											},
										}
									}
								},
							};
						} else {
							this.$emit('drag-end');
						}
					},
				};
			}
		},
	};
}
