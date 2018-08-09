export default function(emiters) {
	emiters.forEach(([name, event]) => {
		this.$emit(name, event);
	});
}
