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
});