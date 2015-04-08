angular.module('app').config(function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$routeProvider
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'IndexCtrl'
		});
});