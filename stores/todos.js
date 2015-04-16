angular.module('app').service('TodosStore', function(Dispatcher) {
	var Todo = Immutable.Record({ id: '', text: '', completed: false });

	return ImmutableStore(Dispatcher, {
		getInitialState: function() {
			return this.deserialize({
				todos: {
					'asd': { id: 'asd', text: 'rule the world' }
				},
				newTodo: '',
				errors: {
					title: false
				}
			});
		},

		'todo:add': function(state, payload) {
			var id = uuid(),
				todo = Todo({
					id: id,
					text: payload.text
				});

			return state
				.setIn(['todos', id], todo)
				.setIn(['errors', 'title'], false)
				.set('newTodo', '');
		},

		'todo:showTitleError': function(state, payload) {
			return state
				.setIn(['errors', 'title'], true);
		},

		'todo:remove': function(state, payload) {
			return state.removeIn(['todos', payload.id]);
		},

		'todo:updateText': function(state, payload) {
			return state
				.set('newTodo', payload.text)
				.setIn(['errors', 'title'], false);
		},

		'todo:updateStatus': function(state, payload) {
			return state.setIn(['todos', payload.id, 'completed'], payload.completed);
		},

		deserialize: function(data) {
			return Immutable.fromJS(data, transform({
				'': function(v) {
					return v.toMap();
				},
				errors: function(v) {
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