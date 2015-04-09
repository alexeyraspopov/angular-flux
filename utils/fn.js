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
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
