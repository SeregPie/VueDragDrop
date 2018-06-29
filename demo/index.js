(function() {

	new Vue({
		el: '#app',

		components: {
			MyExampleI1: {
				template: '#app-example-i1',

				data: function() {
					return {
						position: [1/2, 1/2],
					};
				},

				methods: {
					onDrag: function(event) {
						var bounds = this.$refs.dragArea.getBoundingClientRect();
						this.position = [
							Math.min(Math.max((event.position.left - bounds.left) / bounds.width, 0), 1),
							Math.min(Math.max((event.position.top - bounds.top) / bounds.height, 0), 1),
						];
					},
				},
			},

			MyExampleI2: {
				template: '#app-example-i2',
			},
		},
	});

})();
