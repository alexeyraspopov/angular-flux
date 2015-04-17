angular.module('app').controller('IndexCtrl', function($scope, TodosStore, TodosStatesStore, TodosActions) {
	syncWith(TodosStore, $scope, 'model');
	syncWith(TodosStatesStore, $scope, 'states');

	$scope.addTodo = function() {
		TodosActions.addTodo($scope.states.newTodo);
	};

	$scope.updateText = function(event) {
		TodosActions.updateText(event.target.value);
	};

	$scope.updateStatus = function(todo, event) {
		TodosActions.updateStatus(todo.id, event.target.checked);
	};

	$scope.removeTodo = function(todo) {
		TodosActions.removeTodo(todo.id);
	};
});