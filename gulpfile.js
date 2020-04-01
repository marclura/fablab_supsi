const gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	path = require('path'),
	sourcemaps = require('gulp-sourcemaps'),
	connect = require('gulp-connect-php'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	postcss = require('gulp-postcss'),
	browsersync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename");

cssWatch = [
	'assets/styl/*.styl',
	'assets/styl/**/*.styl'
];

jsWatch = [
	'assets/js/**/*.js'
];

function css() {
	return gulp
		.src('assets/styl/main.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(postcss([
			autoprefixer(),
			cssnano()
		]))
		.pipe(sourcemaps.write())
		.pipe(rename("main.min.css"))
		.pipe(gulp.dest('assets/css'));
}

function js() {
	return gulp
		.src(jsWatch)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js'));
}

function serve() {
  connect.server({ port: 3000, router: 'kirby/router.php' }, function() {
  	browsersync({
  		proxy: '127.0.0.1:3000'
  	});
  });

  gulp.watch(cssWatch).on('change', function() {
  	css();
  	browsersync.reload();
  });

  gulp.watch(jsWatch).on('change', function() {
  	//js();
  	browsersync.reload();
  })
}


gulp.task('default', gulp.series(css, serve));