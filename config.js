angular.module('app').config(function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$routeProvider
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'IndexCtrl'
		});
}).run(function(TodosStore) {
	window.getState = function() {
		return JSON.stringify(TodosStore.getState());
	};

	window.setState = function(state) {
		return TodosStore.injectState(JSON.parse(state));
	};
});