angular.module('app').service('Dispatcher', function($rootScope) {
	var scope = $rootScope.$new();

	return {
		dispatch: function(payload) {
			scope.$broadcast('dispatch', payload);
		},

		register: function(listener) {
			return scope.$on('dispatch', listener);
		}
	};
})