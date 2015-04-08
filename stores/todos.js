angular.module('app').service('TodosStore', function(Store, Id) {
	return Store({
		getInitialState: function() {
			return {
				todos: Immutable.OrderedMap({
					'asd': { id: 'asd', text: 'sdfsdfsdf', completed: false }
				}),
				newTodo: ''
			};
		},

		serialize: function(state) {
			return {
				todos: state.todos.toArray(),
				newTodo: state.newTodo
			};
		},

		add: function(payload) {
			var id = Id.next(),
				text = payload.text,
				todos = this.state.todos;


			this.setState({
				todos: todos.set(id, {
					id: id,
					text: text,
					completed: false
				}),
				newTodo: ''
			});
		},

		remove: function(payload) {
			var id = payload.id,
				todos = this.state.todos;
			
			this.setState({
				todos: todos.remove(id)
			});
		},

		updateText: function(payload) {
			this.setState({
				newTodo: payload.text
			});
		}
	});
});