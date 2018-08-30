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

let x = new xjs.Element(jsdom.JSDOM.fragment('<span></span>').querySelector('*'))

module.exports = Promise.all([
	test(x.outerHTML(), '<span></span>')
		// set an attribute to a string
		.then(() => test(`${x.attr('attr1', 'val1').outerHTML()}`, '<span attr1="val1"></span>'))
		.then(() => test(`${x.attr('attr1')}`                    , 'val1'))
		// add a boolean attribute
		.then(() => test(`${x.attr('attr2', '').outerHTML()}`    , '<span attr1="val1" attr2=""></span>'))
		.then(() => test(`${x.attr('attr2')}`                    , ''))
		// remove an attribute
		.then(() => test(`${x.attr('attr2', null).outerHTML()}`  , '<span attr1="val1"></span>'))
		.then(() => test(`${x.attr('attr2')}`                    , 'null'))
		// set an attribute to the string `'null'`
		.then(() => test(`${x.attr('attr2', 'null').outerHTML()}`, '<span attr1="val1" attr2="null"></span>'))
		.then(() => test(`${x.attr('attr2')}`                    , 'null'))
		// fail to set an attribute using a disallowed value
		.then(() => test((() => {
			try {
				console.log(`Expected warning: "Key 'infinite' cannot be found. Using key 'default'…"`)
				return x.attr('attr2', Infinity).outerHTML()
			} catch (e) {
				return e.name
			}
		})(), 'ReferenceError'))
		// set an attribute using a function
		.then(() => test(`${x.attr('attr3', function () { return this.attr('attr1') }).outerHTML()}`, '<span attr1="val1" attr2="null" attr3="val1"></span>'))
		.then(() => test(`${x.attr('attr3')}`                                                       , 'val1'))
		// call `attr()` with an object
		.then(() => test(`${x.attr({ attr1: 'string', attr2: 42, attr3: true }).outerHTML()}`       , '<span attr1="string" attr2="42" attr3="true"></span>'))
		.then(() => test(`${x.attr({ attr1: null }).outerHTML()}`                                   , '<span attr2="42" attr3="true"></span>'))
		// call `attr()` with no args, `null`, or an empty object `{}`
		.then(() => test(`${x.attr(    ).outerHTML()}`                                              , '<span attr2="42" attr3="true"></span>'))
		.then(() => test(`${x.attr(null).outerHTML()}`                                              , '<span attr2="42" attr3="true"></span>'))
		.then(() => test(`${x.attr({}  ).outerHTML()}`                                              , '<span attr2="42" attr3="true"></span>'))
		// fail to call `attr()` with `''`
		.then(() => test((() => {
			try {
				return x.attr('').outerHTML()
			} catch (e) {
				return e.name
			}
		})(), 'RangeError'))
]).then((arr) => true)
