function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);

		return v.toString(16);
	});
}

function applyToScope(scope, locals) {
	scope[locals.key] = locals.state;
}

function syncWith(store, scope, key) {
	var update = function(state) {
		scope.$evalAsync(applyToScope, { state: state, key: key });
	};

	store.subscribe(update);
	update(store.getState());
}

function toIndexed(object) {
	return Object.keys(object).map(function(key) {
		return object[key];
	});
}

function toKeyed(array, primaryKey) {
	return array.reduce(function(acc, item) {
		acc[item[primaryKey]] = item;
		return acc;
	}, {});
}