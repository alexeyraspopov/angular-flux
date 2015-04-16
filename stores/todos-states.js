angular.module('app').service('TodosStatesStore', function(Dispatcher) {
	return ImmutableStore(Dispatcher, {
		getInitialState: function() {
			return this.deserialize({
				newTodo: '',
				errors: {
					title: false
				}
			})
		},

		'todo:add': function(state) {
			return state.set('newTodo', '');
		},

		'todo:showTitleError': function(state, payload) {
			return state
				.setIn(['errors', 'title'], true);
		},

		'todo:updateText': function(state, payload) {
			return state
				.set('newTodo', payload.text)
				.setIn(['errors', 'title'], false);
		},

		deserialize: function(data) {
			return Immutable.fromJS(data, transform({
				// TODO: remove these 2 functions after ImmutableJS update
				'': function(v) {
					return v.toMap();
				},
				errors: function(v) {
					return v.toMap();
				}
			}));
		},

		serialize: function(state) {
			return state.toJS();
		}
	});
});