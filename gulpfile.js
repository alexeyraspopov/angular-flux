var gulp = require('gulp'),
	webserver = require('gulp-webserver');


gulp.task('serve', function() {
	return gulp.src('./')
		.pipe(webserver({
			fallback: 'index.html'
		}));
});