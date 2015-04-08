function assign(target, source) {
	Object.keys(source).forEach(function(key) {
		target[key] = source[key];
	});

	return target;
}

function identity(a) {
	return a;
}