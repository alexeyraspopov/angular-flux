angular.module('app').service('TodosStore', function(Store) {
	var Todo = Immutable.Record({ id: '', text: '', completed: false });

	var a = Store({
		getInitialState: function() {
			return Immutable.Map({
				todos: Immutable.OrderedMap({
					'asd': Todo({ id: 'asd', text: 'rule the world' })
				}),
				newTodo: ''
			});
		},

		deserialize: function(data) {
			return Immutable.fromJS(data, function(k, v){
				if (!k) {
					return v.toMap();
				}

				if (k === 'todos') {
					return v.toOrderedMap().map(function(t){
						return Todo(t.toObject());
					});
				}

				return v;
			});
		},

		serialize: function(state) {
			return state.toJS();
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
		}
	});

	window.store = a;
	return a;
});