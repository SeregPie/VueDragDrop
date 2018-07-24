(function() {

	new Vue({
		el: '#app',

		data: {
			tooltip: true,
			hamburgerLover: 0,
			pizzaLover: 0,
			allLover: 0,
		},

		methods: {
			acceptHamburger: function(data) {
				return data === '🍔';
			},

			acceptPizza: function(data) {
				return data === '🍕';
			},
		},
	});

})();
