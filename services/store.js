angular.module('app').service('Store', function(Dispatcher) {
	return function(methods) {
		var listeners = [];

		store = assign({
			state: methods.getInitialState(),

			setState: function(patch) {
				assign(this.state, patch);
				this.publish();
			},

			subscribe: function(listener) {
				listeners.push(listener)
			},

			publish: function() {
				var state = this.serialize(this.state);

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
			}
		}, methods);

		Dispatcher.register(function(event, payload) {
			if(store.hasOwnProperty(payload.actionType)){
				store[payload.actionType](payload);
			}
		});

		return store;
	};
});