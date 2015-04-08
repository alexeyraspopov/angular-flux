angular.module('app').controller('IndexCtrl', function($scope, TodosStore, TodosActions) {
	TodosStore.syncWith($scope);

	$scope.addTodo = function() {
		TodosActions.addTodo($scope.newTodo);
	};

	$scope.updateText = function(event) {
		TodosActions.updateText(event.target.value);
	};

	$scope.removeTodo = TodosActions.removeTodo;
});