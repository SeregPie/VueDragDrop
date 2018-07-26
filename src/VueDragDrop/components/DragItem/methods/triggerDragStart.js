import Lang_clone from '/utils/Lang/clone';

export default function() {
	let {
		data,
		position,
	} = this;
	position = Lang_clone(position);
	this.$emit('drag-start', {
		data,
		position,
	});
}
