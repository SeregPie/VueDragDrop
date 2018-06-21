import Lang_clone from '/utils/Lang/clone';

export default function(position) {
	this.position = position;
	this.$emit('drag', Lang_clone(this.restrictedPosition));
}
