export default function(next) {
	let {active} = this;
	if (active) {
		let {
			data,
			ghostPosition,
		} = this;
		next(function() {
			let {
				active,
				data,
				ghostPosition,
			} = this;
			if (active) {
				return [['drag', {
					data,
					position: {...ghostPosition},
				}]];
			}
			next();
			return [['drag-end', {
				data,
				position: {...ghostPosition},
			}]];
		});
		return [['drag-start', {
			data,
			position: {...ghostPosition},
		}]];
	}
}
