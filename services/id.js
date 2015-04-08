angular.module('app').service('Id', function() {
	var id = 1000;

	return {
		next: function() {
			return (id++).toString(16).toUpperCase();
		}
	};
});