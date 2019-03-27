const gulp = require('gulp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require("gulp-babel-minify");

/*
-- top level functions --
gulp.task - define tasks
gulp.src - point to files to use
gulp.dest - point to folder to output
gulp.watch - watch files and folders for changes
*/

//copy all html files to dist folder
gulp.task('copyHtml', function(html){
  gulp.src('dev/*html')
  .pipe(gulp.dest('dist'));
  html();
});

//optimize images jpg, png, svg & gif format
/*gulp.task('imageOp', function(img){
  gulp.src('dev/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'));
  img();
});*/

//optimize images to webp format
gulp.task('imageMinWebp', function(webp){
  imagemin(['dev/img/*'], 'dist/img',{
    use: [imageminWebp({quality: 50})]
  }).then(() =>{
    console.log('Images have been compressed to webp format');
  });
  webp();
});

//compile and minify main.scss to main.css and add to dist folder
gulp.task('compileScss', function(styles){
  gulp.src('dev/styles/scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('dist/styles'));
  styles();
});

//compile all JS files into one minified JS file and add to dist folder
//uglify can't compile ES6 use babel-minify instead
gulp.task('minifiedJs', function(scripts){
  gulp.src('dev/scripts/*.js')
  .pipe(concat('main.js'))
  .pipe(minify())
  .pipe(gulp.dest('dist/scripts'));
  scripts();
});


//default task. create an array of all gulp tasks so only one ask has to run.
gulp.task('default', gulp.series(['copyHtml', 'imageMinWebp', 'compileScss', 'minifiedJs']));

gulp.task('watch', function(){
  gulp.watch('dev/scripts/*.js', gulp.series(['minifiedJs']));
  /*gulp.watch('dev/img/*', gulp.series(['imageOp']));*/
  gulp.watch('dev/img/*', gulp.series(['imageMinWebp']));
  gulp.watch('dev/styles/scss/main.scss', gulp.series(['compileScss']));
  gulp.watch('dev/*html', gulp.series(['copyHtml']));
});
