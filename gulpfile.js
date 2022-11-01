let gulp = require('gulp');

const { src, dest, watch, series, parallel } = require('gulp');

const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');

//CSS
function css(cb) {
  return src('src/css/main.css')
  .pipe(autoprefixer())
  .pipe(cleanCSS())
	.pipe(dest('dist'));
}

//JS
function js(cb) {
	return src('src/js/*.js')
		.pipe(concat('bundle.js'))
    .pipe(uglify())
		.pipe(dest('dist'));
}

//img
function minimg(cb) {
	return src('src/img/*')
		.pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),      
    ])) 
    .pipe(imagewebp())   
		.pipe(dest('dist/img'));
}

// default gulp
exports.default = function() {
	watch('src/css/main.css', css);
  watch('src/js/*js', js);
  watch("src/img/*", minimg);
};