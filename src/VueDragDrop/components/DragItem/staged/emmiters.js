export default function(next) {
	let {active} = this;
	if (active) {
		let {
			data,
			ghostPosition,
		} = this;
		this.$emit('drag-start', {
			data,
			position: ghostPosition,
		});
		next(function() {
			let {
				active,
				data,
				ghostPosition,
			} = this;
			if (active) {
				this.$emit('drag', {
					data,
					position: ghostPosition,
				});
			} else {
				this.$emit('drag-end', {
					data,
					position: ghostPosition,
				});
				next();
			}
		});
	}
}
