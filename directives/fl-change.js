angular.module('app').directive('flChange', function() {
	return function(scope, element, attrs) {
		var eval = function(event) { scope.$eval(attrs.flChange, { $event: event }); };

		switch(element.attr('type')){
			case 'checkbox':
				element.bind('change', eval);
				break;

			default:
				element.bind('keyup', eval);
		}
	};
});