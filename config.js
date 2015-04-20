angular.module('app')
	.constant('Dispatcher', new Flux.Dispatcher())
	.config(function($locationProvider, $routeProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		$routeProvider
			.when('/', {
				templateUrl: 'views/index.html',
				controller: 'IndexCtrl'
			});
	})
	.run(function(TodosStore, TodosStatesStore) {
		window.getState = function() {
			return JSON.stringify({
				TodosStore: TodosStore.getState(),
				TodosStatesStore: TodosStatesStore.getState(),
			});
		};

		window.setState = function(state) {
			var data = JSON.parse(state);

			TodosStore.injectState(state.TodosStore);
			TodosStatesStore.injectState(state.TodosStatesStore);
		};
	});