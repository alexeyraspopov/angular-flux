angular.module('app').service('TodosStore', function(Store, Id) {
	return Store({
		getInitialState: function() {
			return {
				todos: Immutable.OrderedMap({
					'asd': { id: 'asd', text: 'sdfsdfsdf', completed: true }
				}),
				newTodo: ''
			};
		},

		serialize: function(state) {
			return Immutable.Map(state).toJS();
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
		},

		updateStatus: function(payload) {
			var todos = this.state.todos,
				todo = todos.get(payload.id)

			// TODO: use Map for single todo
			this.setState({
				todos: todos.set(payload.id, {
					id: todo.id,
					text: todo.text,
					completed: payload.completed
				})
			});
		}
	});
});