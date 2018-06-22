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
					onDrag: function(point) {
						var bounds = this.$refs.dragArea.getBoundingClientRect();
						this.position = [
							Math.min(Math.max((point[0] - bounds.left) / bounds.width, 0), 1),
							Math.min(Math.max((point[1] - bounds.top) / bounds.height, 0), 1),
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
