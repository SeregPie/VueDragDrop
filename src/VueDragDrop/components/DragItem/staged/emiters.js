export default function(set, reset) {
	let {dragged} = this;
	if (dragged) {
		let {
			data,
			ghostPosition,
		} = this;
		set(function() {
			let {
				data,
				dragged,
				ghostPosition,
			} = this;
			if (dragged) {
				return [['drag', {
					data,
					position: {...ghostPosition},
				}]];
			}
			reset();
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
