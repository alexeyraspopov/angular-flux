angular.module('app').controller('IndexCtrl', function($scope, TodosStore, TodosActions) {
	TodosStore.syncWith($scope);

	TodosStore.subscribe(function(state) {
		console.log(state);
	})

	$scope.addTodo = function() {
		TodosActions.addTodo($scope.newTodo);
	};

	$scope.updateText = function(event) {
		TodosActions.updateText(event.target.value);
	};

	$scope.updateStatus = function(todo, event) {
		TodosActions.updateStatus(todo.id, event.target.checked);
	};

	$scope.removeTodo = TodosActions.removeTodo;
});