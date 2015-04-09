function assign(target, source) {
	Object.keys(source).forEach(function(key) {
		target[key] = source[key];
	});

	return target;
}

function identity(a) {
	return a;
}

function id() {
	var pointer = 1000;

	return function() {
		return (pointer++).toString(16).toUpperCase();
	};
}