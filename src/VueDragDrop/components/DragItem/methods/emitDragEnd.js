import Lang_clone from '/utils/Lang/clone';

export default function() {
	let {
		position,
		data,
	} = this;
	position = Lang_clone(position);
	this.$emit('drag-end', {
		position,
		data,
	});
}
