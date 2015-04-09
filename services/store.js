angular.module('app').service('Store', function(Dispatcher, $timeout) {
	return function(methods) {
		var listeners = [];

		store = assign({
			state: methods.getInitialState(),

			setState: function(state) {
				this.state = state;
				this.publish();
			},

			getState: function() {
				return this.serialize(this.state);
			},

			injectState: function(data) {
				$timeout(function() {
					this.setState(this.deserialize(data));
				}.bind(this), 0);
			},

			subscribe: function(listener) {
				listeners.push(listener);
			},

			publish: function() {
				var state = this.getState();

				listeners.forEach(function(listener) {
					listener(state);
				});
			},

			syncWith: function(scope, transform) {
				var transform = transform || identity;

				this.subscribe(function(state) {
					assign(scope, transform(state));
				});
				
				this.publish();
			},

			serialize: identity,
			deserialize: identity
		}, methods);

		Dispatcher.register(function(event, payload) {
			if(store.hasOwnProperty(payload.actionType)){
				// TODO: support Promises
				store.setState(store[payload.actionType](store.state, payload));
			}
		});

		return store;
	};
});