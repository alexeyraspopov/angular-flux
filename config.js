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
	.run(function(TodosStore, TodosStatesStore, TodosActions, Dispatcher) {
		window.fluxModules = {
			TodosStore: TodosStore,
			TodosStatesStore: TodosStatesStore,
			TodosActions: TodosActions,
			Dispatcher: Dispatcher
		};

		window.getState = function() {
			return JSON.stringify({
				TodosStore: TodosStore.getState(),
				TodosStatesStore: TodosStatesStore.getState(),
			});
		};

		window.setState = function(state) {
			var data = JSON.parse(state);

			TodosStore.state = TodosStore.deserialize(data.TodosStore);
			TodosStore.publish(TodosStore.getState());

			TodosStatesStore.state = TodosStatesStore.deserialize(data.TodosStatesStore);
			TodosStatesStore.publish(TodosStatesStore.getState());
		};
	});