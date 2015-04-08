angular.module('app').directive('flValue', function() {
	return function(scope, element, attrs) {
		scope.$watch(attrs.flValue, function(value) {
			element[0].value = value === undefined ? '' : value;
		});
	};
});