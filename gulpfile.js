const gulp  = require('gulp')
const jsdoc = require('gulp-jsdoc3')
const typedoc    = require('gulp-typedoc')
const typescript = require('gulp-typescript')
// require('typedoc')    // DO NOT REMOVE … peerDependency of `gulp-typedoc`
// require('typescript') // DO NOT REMOVE … peerDependency of `gulp-typescript`

const tsconfig      = require('./config/tsconfig.json')
const typedocconfig = require('./config/typedoc.json')


gulp.task('compile', async function () {
  return gulp.src('./src/class/*.ts')
    .pipe(typescript(tsconfig.compilerOptions))
    .pipe(gulp.dest('./dist/class/'))
})

gulp.task('docs', async function () {
  return gulp.src('./src/class/*.class.ts')
    .pipe(typedoc(typedocconfig))
})

gulp.task('build', ['compile', 'docs'])

gulp.task('test', function () {
  require('./test/DocumentFragment-importLinks.test.js');
  require('./test/HTMLOListElement-populate.test.js');
  require('./test/HTMLUListElement-populate.test.js');
  require('./test/HTMLTimeElement-dateTime.test.js');
})
