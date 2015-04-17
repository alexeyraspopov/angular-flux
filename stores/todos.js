angular.module('app').service('TodosStore', function(Dispatcher) {
	var Todo = Immutable.Record({ id: '', text: '', completed: false });

	return ImmutableStore(Dispatcher, {
		getInitialState: function() {
			var todos = Array.apply(null, Array(10000)).reduce(function(acc) {
				var id = uuid();

				acc[id] = { id: id, text: id };

				return acc;
			}, {});

			return this.deserialize({
				todos: todos,
				uncompletedCount: 0
			})
				.update(function(v) {
					return v.set('uncompletedCount', v.get('todos').size);
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
				.update('uncompletedCount', function(n) { return n + 1; });
		},

		'todo:remove': function(state, payload) {
			var completed = state.getIn(['todos', payload.id, 'completed']),
				x = Number(completed) - 1;

			return state
				.removeIn(['todos', payload.id])
				.update('uncompletedCount', function(n) { return n + x; });
		},

		'todo:updateStatus': function(state, payload) {
			var x = 2 * Number(payload.completed) - 1;

			return state
				.setIn(['todos', payload.id, 'completed'], payload.completed)
				.update('uncompletedCount', function(n) { return n - x; });
		},

		deserialize: function(data) {
			return Immutable.fromJS(data, transform({
				// TODO: remove this after ImmutableJS update
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
			return state.update('todos', function(todos) {
				return todos.toList();
			}).toJS();
		}
	});
});