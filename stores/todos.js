angular.module('app').service('TodosStore', function(Dispatcher) {
	return MutableStore(Dispatcher, {
		getInitialState: function() {
			return {
				todos: genTodos(10000),
				uncompletedCount: 0
			};
		},

		'todo:add': function(state, payload) {
			var id = uuid(),
				todo = { id: id, text: payload.text, completed: false };

			state.todos[id] = todo;
			state.uncompletedCount += 1;
		},

		'todo:remove': function(state, payload) {
			var completed = state.todos[payload.id].completed,
				x = Number(completed) - 1;

			delete state.todos[payload.id];
			state.uncompletedCount += x;
		},

		'todo:updateStatus': function(state, payload) {
			var x = 2 * Number(payload.completed) - 1;

			state.todos[payload.id].completed = payload.completed;
			state.uncompletedCount -= x;
		},

		serialize: function(state) {
			return {
				todos: toArray(state.todos),
				uncompletedCount: state.uncompletedCount
			};
		}
	});

	function toArray(object) {
		return Object.keys(object).map(function(key) {
			return object[key];
		});
	}

	function genTodos(count) {
		return Array.apply(null, Array(count)).reduce(function(acc) {
			var id = uuid();

			acc[id] = { id: id, text: id };

			return acc;
		}, {});
	}

	/*

	var Todo = Immutable.Record({ id: '', text: '', completed: false });

	return ImmutableStore(Dispatcher, {
		getInitialState: function() {
			var todos = genTodos(10000);

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
	});*/
});