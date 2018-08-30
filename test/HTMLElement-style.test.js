const assert = require('assert')

const jsdom = require('jsdom')

const xjs = require('../index.js')


/**
 * @summary The master test function for this subject.
 * @see https://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message
 * @param   {string}  actual   the actual value to test
 * @param   {string}  expected the value that `actual` is expected to be
 * @returns {boolean} does `assert.strictEqual(actual, expected)` not throw?
 * @throws  {AssertionError} the error from `assert.strictEqual(actual, expected)`
 */
async function test(actual, expected) {
	return assert.strictEqual(actual, expected, `Got '${actual}', but was expecting '${expected}'.`) || true
}

let x = new xjs.HTMLElement(jsdom.JSDOM.fragment('<span></span>').querySelector('*'))

module.exports = Promise.all([
	test(x.outerHTML(), '<span></span>')
		// set a property to a string
		.then(() => test(`${x.style('background', 'none').outerHTML()}` , '<span style="background: none;"></span>'))
		.then(() => test(`${x.style('background')}`                     , 'none'))
		.then(() => test(`${x.style('font-weight', 'bold').outerHTML()}`, '<span style="background: none; font-weight: bold;"></span>'))
		// remove a property using `''`
		.then(() => test(`${x.style('font-weight', '').outerHTML()}`    , '<span style="background: none;"></span>'))
		.then(() => test(`${x.style('font-weight')}`                    , 'null'))
		// remove a property using `null`
		.then(() => test(`${x.style('background', null).outerHTML()}`   , '<span style=""></span>'))
		.then(() => test(`${x.style('background')}`                     , 'null'))
		// fail to set a property using a disallowed value
		.then(() => test((() => {
			try {
				return x.style('order', NaN).outerHTML() // FIXME
			} catch (e) {
				console.log(`Expected log warning: "Key 'NaN' cannot be found. Using key 'default'…"`)
				return e.name
			}
		})(), 'ReferenceError'))
		// set a property using a function
		.then(() => test(`${x.style('content', function () { return this.tagName }).outerHTML()}`       , '<span style="content: span;"></span>'))
		.then(() => test(`${x.style('content', function () { return `'${this.tagName}'` }).outerHTML()}`, '<span style="content: \'span\';"></span>'))
		// call `style()` with an object
		.then(() => test(`${x.style({
			content: null,
			background: 'transparent',
			'font-weight': 400,
			'flex-wrap': true,
		}).outerHTML()}`, '<span style="background: transparent; font-weight: 400; flex-wrap: true;"></span>'))
		// call `style()` with no args, `null`, or an empty object `{}`
		.then(() => test(`${x.style(    ).outerHTML()}`, '<span style="background: transparent; font-weight: 400; flex-wrap: true;"></span>'))
		.then(() => test(`${x.style(null).outerHTML()}`, '<span style="background: transparent; font-weight: 400; flex-wrap: true;"></span>'))
		.then(() => test(`${x.attr({}  ).outerHTML()}` , '<span style="background: transparent; font-weight: 400; flex-wrap: true;"></span>'))
		// fail to call `style()` with `''`
		.then(() => test((() => {
			try {
				return x.style('').outerHTML()
			} catch (e) {
				return e.name
			}
		})(), 'RangeError'))
]).then((arr) => true)
