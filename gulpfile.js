//一、导入模块
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      babel = require('gulp-babel'),
      uglify = require('gulp-uglify'),
      htmlmin = require('gulp-htmlmin'),
      imagemin = require('gulp-imagemin');

//二、发布任务
//1、首页
function fnCopyIndex(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
}
//2、插件
function fnCopyLib(){
    return gulp.src('./src/lib/*.js')
        .pipe(gulp.dest('./js'));
}
//3、图片
function fnImg(){
    return gulp.src('./src/image/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
}
//4、子页
function fnHTML(){
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./dist/pages'));
}
//5、JS
function fnJS(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/js'));
}
//6、Scss
function fnCss(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/css'));
}
//7、监听
function fnWatch(){
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/lib/*.js',fnCopyLib);
    gulp.watch('./src/image/*',fnImg);
    gulp.watch('./src/pages/*.html',fnHTML);
    gulp.watch('./src/js/*.js',fnJS);
    gulp.watch('./src/sass/*.scss',fnCss);
}
//三、导出模块
exports.copyIndex = fnCopyIndex;
exports.copyLib = fnCopyLib;
exports.img = fnImg;
exports.html = fnHTML;
exports.js = fnJS;
exports.css = fnCss;
exports.default = fnWatch;