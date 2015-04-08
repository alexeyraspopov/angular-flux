angular.module('app').service('TodosStore', function(Store, Id) {
	var Todo = Immutable.Record({ id: '', text: '', completed: false });

	return Store({
		getInitialState: function() {
			return {
				todos: Immutable.OrderedMap({
					'asd': Todo({ id: 'asd', text: 'rule the world' })
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
				todos: todos.set(id, Todo({
					id: id,
					text: text
				})),
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
				todo = todos.get(payload.id);

			this.setState({
				todos: todos.set(payload.id, todo.set('completed', payload.completed))
			});
		}
	});
});