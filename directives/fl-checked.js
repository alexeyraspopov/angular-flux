angular.module('app').directive('flChecked', function() {
	return function(scope, element, attrs) {
		scope.$watch(attrs.flChecked, function(value) {
			element[0].checked = Boolean(value);
		});
	}
})