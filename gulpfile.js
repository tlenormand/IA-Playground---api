'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import del from 'del';
import livereload from 'gulp-livereload';
import less from 'gulp-less';


const config = {
	src: 'src',
	dist: 'dist',
};


gulp.task("clean-dist", function() {
	return del([`${config.dist}/**`,`!${config.dist}`]);
});

gulp.task("build-js", ['clean-dist'], function() {
	return gulp.src(`${config.src}/**/*.js`)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.dist));
});

gulp.task("build-assets", ['clean-dist'], function() {
	return gulp.src([
			`${config.src}/**`,
			`!${config.src}/**/*.js`,
		])
		.pipe(plumber())
		.pipe(gulp.dest(config.dist));
});

gulp.task('less', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});
   
  gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('less/*.less', ['less']);
});


gulp.task('clean', ['clean-dist']);
gulp.task('build', ['build-js','build-assets']);
