function assign(target, source) {
	Object.keys(source).forEach(function(key) {
		target[key] = source[key];
	});

	return target;
}

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
