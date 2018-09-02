const gulp  = require('gulp')
const typedoc    = require('gulp-typedoc')
const typescript = require('gulp-typescript')
// require('typedoc')    // DO NOT REMOVE … peerDependency of `gulp-typedoc`
// require('typescript') // DO NOT REMOVE … peerDependency of `gulp-typescript`

const tsconfig      = require('./config/tsconfig.json')
const typedocconfig = require('./config/typedoc.json')


gulp.task('dist', async function () {
  return gulp.src('./src/class/*.ts')
    .pipe(typescript(tsconfig.compilerOptions))
    .pipe(gulp.dest('./dist/class/'))
})

gulp.task('test-out', async function () {
	return gulp.src('./test/src/{,*.}test.ts')
		.pipe(typescript(tsconfig.compilerOptions))
		.pipe(gulp.dest('./test/out/'))
})

gulp.task('test-run', async function () {
	try {
		await Promise.all([
			require('./test/out/Document-importLinks.test.js'),
			require('./test/out/DocumentFragment-importLinks.test.js'),
			require('./test/out/Element-attr.test.js'),
			require('./test/out/HTMLElement-style.test.js'),
			require('./test/out/HTMLElement-data.test.js'),
		])
		console.info('All tests ran successfully!')
	} catch (e) {
		console.error(e)
	}
})

gulp.task('test', ['test-out', 'test-run'])

gulp.task('docs', async function () {
  return gulp.src('./src/**/*.ts')
    .pipe(typedoc(typedocconfig))
})

gulp.task('build', ['dist', 'test', 'docs'])
