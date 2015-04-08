angular.module('app').directive('flBind', function() {
	return function(scope, element, attrs) {
		scope.$watch(attrs.flBind, function(value) {
			element[0].value = value === undefined ? '' : value;
		});
	}
})