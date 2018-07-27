export default function(emiters) {
	if (emiters) {
		emiters.forEach(([name, event]) => {
			this.$emit(name, event);
		});
	}
}
