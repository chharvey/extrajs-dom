const gulp  = require('gulp')
const jsdoc = require('gulp-jsdoc3')
const typescript = require('gulp-typescript')
// require('typescript') // DO NOT REMOVE … peerDependency of `gulp-typescript`

const tsconfig      = require('./config/tsconfig.json')


gulp.task('compile', async function () {
  return gulp.src('./src/class/*.ts')
    .pipe(typescript(tsconfig.compilerOptions))
    .pipe(gulp.dest('./dist/class/'))
})

// HOW-TO: https://github.com/mlucool/gulp-jsdoc3#usage
gulp.task('docs:api', function () {
  return gulp.src(['./README.md', './class/*.class.js', '!./class/{Attr,DOMException,NamedNodeMap,Tree}.class.js'], {read:false})
    .pipe(jsdoc(require('./config/jsdoc.json')))
})

gulp.task('build', ['compile', 'docs:api'])

gulp.task('test', function () {
  require('./test/DocumentFragment-importLinks.test.js');
  require('./test/HTMLOListElement-populate.test.js');
  require('./test/HTMLUListElement-populate.test.js');
  require('./test/HTMLTimeElement-dateTime.test.js');
})
