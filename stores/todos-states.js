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
			return Immutable.fromJS(data);
		},

		serialize: function(state) {
			return state.toJS();
		}
	});
});