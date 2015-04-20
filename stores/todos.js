angular.module('app').service('TodosStore', function(Dispatcher) {
	return MutableStore(Dispatcher, {
		getInitialState: function() {
			return {
				todos: genTodos(10),
				uncompletedCount: 10
			};
		},

		'todo:add': function(state, payload) {
			var todo = Todo(payload.text);

			state.todos[todo.id] = todo;
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
		},

		deserialize: function(data) {
			return {
				todos: toObject(data.todos, 'id'),
				uncompletedCount: data.uncompletedCount
			};
		}
	});

	function Todo(text) {
		return {
			id: uuid(),
			text: text,
			completed: false
		};
	}

	function genTodos(count) {
		return Array.apply(null, Array(count)).reduce(function(acc) {
			var id = uuid();

			acc[id] = { id: id, text: id, completed: false };

			return acc;
		}, {});
	}
});