angular.module('app').service('TodosStore', function(Store) {
	var Todo = Immutable.Record({ id: '', text: '', completed: false });

	return Store({
		getInitialState: function() {
			return this.deserialize({
				todos: {
					'asd': { id: 'asd', text: 'rule the world' }
				},
				newTodo: ''
			});
		},

		add: function(state, payload) {
			var id = uuid(),
				todo = Todo({
					id: id,
					text: payload.text
				});

			return state
				.setIn(['todos', id], todo)
				.set('newTodo', '');
		},

		remove: function(state, payload) {
			return state.removeIn(['todos', payload.id]);
		},

		updateText: function(state, payload) {
			return state.set('newTodo', payload.text);
		},

		updateStatus: function(state, payload) {
			return state.setIn(['todos', payload.id, 'completed'], payload.completed);
		},

		deserialize: function(data) {
			return Immutable.fromJS(data, transform({
				'': function(v) {
					return v.toMap();
				},
				todos: function(v) {
					return v.toOrderedMap().map(function(t) {
						return Todo(t.toObject());
					});
				}
			}));
		},

		serialize: function(state) {
			return state.toJS();
		}
	});
});