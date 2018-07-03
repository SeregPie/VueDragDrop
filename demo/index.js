(function() {

	new Vue({
		el: '#app',

		components: {
			MyExampleI1: {
				template: '#app-example-i1',

				data: function() {
					return {
						items: [
							{
								position: [Math.random(), Math.random()],
							},
							{
								position: [Math.random(), Math.random()],
							},
							{
								position: [Math.random(), Math.random()],
							},
						],
						itemSize: 48,
					};
				},

				methods: {
					onDrag: function(event) {
						var items = this.items;
						var $refs = this.$refs;
						var dragAreaBounds = $refs.dragArea.getBoundingClientRect();
						var itemIndex = event.data;
						var item = items[itemIndex];
						item.position = [
							Math.min(Math.max((event.position.left - dragAreaBounds.left) / dragAreaBounds.width, 0), 1),
							Math.min(Math.max((event.position.top - dragAreaBounds.top) / dragAreaBounds.height, 0), 1),
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
