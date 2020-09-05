const gulp  = require('gulp')
const typedoc    = require('gulp-typedoc')
const typescript = require('gulp-typescript')
// require('typedoc')    // DO NOT REMOVE … peerDependency of `gulp-typedoc`
// require('typescript') // DO NOT REMOVE … peerDependency of `gulp-typescript`

const tsconfig      = require('./tsconfig.json')
const typedocconfig = tsconfig.typedocOptions


function dist() {
	return gulp.src('./src/**/*.ts')
		.pipe(typescript(tsconfig.compilerOptions))
		.pipe(gulp.dest('./dist/'))
}

function test_out() {
	return gulp.src('./test/src/{,*.}test.ts')
		.pipe(typescript(tsconfig.compilerOptions))
		.pipe(gulp.dest('./test/out/'))
}

async function test_run() {
		await Promise.all([
			require('./test/out/Document-importLinks.test.js')        .default,
			require('./test/out/DocumentFragment-importLinks.test.js').default,
			require('./test/out/Element-attr.test.js')                .default,
			require('./test/out/HTMLElement-style.test.js')           .default,
			require('./test/out/HTMLElement-data.test.js')            .default,
			require('./test/out/HTMLOListElement-populate.test.js')   .default,
			require('./test/out/HTMLTemplateElement-render.test.js')  .default,
		])
		console.info('All tests ran successfully!')
}

const test = gulp.series(test_out, test_run)

function docs() {
  return gulp.src('./src/**/*.ts')
    .pipe(typedoc(typedocconfig))
}

const build = gulp.parallel(
	gulp.series(
		gulp.parallel(
			dist,
			test_out
		),
		test_run
	),
	docs
)

module.exports = {
	dist,
	test_out,
	test_run,
	test,
	docs,
	build,
}
