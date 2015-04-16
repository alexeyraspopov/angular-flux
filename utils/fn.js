function identity(a) {
	return a;
}

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);

		return v.toString(16);
	});
}

function transform(options) {
	return function(k, v) {
		return options.hasOwnProperty(k) ? options[k](v, k) : v;
	};
}

function syncWith(store, scope, transform) {
	var transform = transform || identity,
		update = function(state) { angular.extend(scope, transform(state)); };

	store.subscribe(update);
	update(store.getState());
}
