angular.module('app').service('Store', function(Dispatcher, $timeout) {
	return function(methods) {
		return ImmutableStore(Dispatcher, assign({
			syncWith: function(scope, transform) {
				var transform = transform || identity;

				this.subscribe(function(state) {
					assign(scope, transform(state));
				});
				
				this.publish(this.getState());
			}
		}, methods));
	};
});