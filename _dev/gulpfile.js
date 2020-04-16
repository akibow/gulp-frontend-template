'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const typescript = require('gulp-typescript');
const browserSync = require('browser-sync').create();
const ssi = require('connect-ssi');

const src = {
	html: ['pug/**/*.pug', '!' + 'pug/**/_*'],
	css: ['scss/**/*.scss', '!' + 'scss/**/_*'],
	ts: ['ts/**/*.ts', '!' + 'ts/**/_*']
};

const dest = {
	root: '../htdocs/',
	html: '../htdocs/',
	css: '../htdocs/',
	js: '../htdocs/'
};

// pug (option)
function htmlTask (){
	return gulp
		.src(src.html)
		.pipe(
			plumber({
				errorHnadler: (err) => {
					console.log(err.messageFormatted);
					this.emit('end');
				}
			})
		)
		.pipe(
			pug({
				pretty: '\t',
				basedir: './'
			})
		)
		.pipe(gulp.dest(dest.html));
};

// sass
function cssTask () {
	return gulp
		.src(src.css)
		.pipe(
			plumber({
				errorHnadler: (err) => {
					console.log(err.messageFormatted);
					this.emit('end');
				}
			})
		)
		.pipe(
			sass({
				outputStyle: 'expanded',
				indentType: 'tab',
				indentWidth: 1
			})
		)
		.pipe(postcss([autoprefixer({ cascade: false })]))
		.pipe(gulp.dest(dest.css))
		.pipe(browserSync.stream());
};

// TypeScript
function scriptTask () {
	return gulp
		.src(src.ts)
		.pipe(
			plumber({
				errorHnadler: (err) => {
					console.log(err.messageFormatted);
					this.emit('end');
				}
			})
		)
		.pipe(
			typescript({
				noImplicitAny: true
			})
		)
		.pipe(gulp.dest(dest.js));
}

//browserSync
function serve (cb) {
	browserSync.reload();
	cb();
};

// watch
function watch () {
	gulp.watch('pug/**/*.pug', htmlTask);
	gulp.watch('scss/**/*.scss', cssTask);
	gulp.watch('ts/**/*.ts', scriptTask);
	gulp.watch(dest.html + '**/*.html').on('change', browserSync.reload);
	gulp.watch(dest.js + '**/*.js').on('change', browserSync.reload);
	// gulp.watch(dest.css + '**/*.css').on('change', browserSync.reload); // ストリーミングせずにリロードする場合、もしくはCSSを直接編集する場合
};

// startup
function startup (cb) {
	browserSync.init({
		//proxy: 'localhost:8080', //vhosts使用の場合
		server:{
			baseDir: dest.root,
			middleware: [ // connect-ssi使用の場合
				ssi({
					baseDir: dest.root,
					ext: '.html'
				})
			]
		},
		notify: false
	});
	cb();
}

exports.default = gulp.series(
	startup,
	watch
);