angular.module('app').service('TodosActions', function(Dispatcher) {
	return {
		addTodo: function(text) {
			var title = text.trim(),
				actionType = title.length > 0 ? 'todo:add' : 'todo:showTitleError';

			Dispatcher.dispatch({
				actionType: actionType,
				text: title
			});
		},

		removeTodo: function(id) {
			Dispatcher.dispatch({
				actionType: 'todo:remove',
				id: id
			});
		},

		updateText: function(text) {
			Dispatcher.dispatch({
				actionType: 'todo:updateText',
				text: text
			});
		},

		updateStatus: function(id, completed) {
			Dispatcher.dispatch({
				actionType: 'todo:updateStatus',
				id: id,
				completed: completed
			});
		}
	};
});