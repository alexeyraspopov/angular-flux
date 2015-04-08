angular.module('app').service('TodosActions', function(Dispatcher) {
	return {
		addTodo: function(text) {
			Dispatcher.dispatch({
				actionType: 'add',
				text: text
			});
		},

		removeTodo: function(id) {
			Dispatcher.dispatch({
				actionType: 'remove',
				id: id
			});
		},

		updateText: function(text) {
			Dispatcher.dispatch({
				actionType: 'updateText',
				text: text
			});
		}
	};
});