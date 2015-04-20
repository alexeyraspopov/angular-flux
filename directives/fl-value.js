angular.module('app').directive('flValue', function() {
	return function(scope, element, attrs) {

		scope.$watch(attrs.flValue, function(value) {
			switch(element.attr('type')){
				case 'radio':
					// TODO: implement me
					break;

				case 'checkbox':
					element[0].checked = Boolean(value);
					break;

				default:
					element[0].value = value === undefined ? '' : value;
			}
		});
	};
});