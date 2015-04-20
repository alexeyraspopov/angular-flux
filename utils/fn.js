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

function syncWith(store, scope, key) {
	var update = function(state) {
		scope.$evalAsync(function(scope) {
			scope[key] = state;
		});
	};

	store.subscribe(update);
	update(store.getState());
}

function toArray(object) {
	return Object.keys(object).map(function(key) {
		return object[key];
	});
}

function toObject(array, primaryKey) {
	return array.reduce(function(acc, item) {
		acc[item[primaryKey]] = item;
		return acc;
	}, {});
}