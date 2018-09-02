const jsdom = require('jsdom')

const xjs = require('../index.js')
const test = require('../lib/test.js')


let x = new xjs.HTMLElement(jsdom.JSDOM.fragment('<span></span>').querySelector('*'))

module.exports = Promise.all([
	test(x.outerHTML(), '<span></span>')
		// set an attribute to a string
		.then(() => test(`${x.data('attrOne', 'val1').outerHTML()}`, '<span data-attr-one="val1"></span>'))
		.then(() => test(`${x.data('attrOne')}`                    , 'val1'))
		// add a boolean attribute
		.then(() => test(`${x.data('attrTwo', '').outerHTML()}`    , '<span data-attr-one="val1" data-attr-two=""></span>'))
		.then(() => test(`${x.data('attrTwo')}`                    , ''))
		// remove an attribute
		.then(() => test(`${x.data('attrTwo', null).outerHTML()}`  , '<span data-attr-one="val1"></span>'))
		.then(() => test(`${x.data('attrTwo')}`                    , 'null'))
		// set an attribute to the string `'null'`
		.then(() => test(`${x.data('attrTwo', 'null').outerHTML()}`, '<span data-attr-one="val1" data-attr-two="null"></span>'))
		.then(() => test(`${x.data('attrTwo')}`                    , 'null'))
		// fail to set an attribute using a disallowed value
		.then(() => test((() => {
			try {
				console.log(`Expected warning: "Key 'array' cannot be found. Using key 'default'…"`)
				return x.attr('attr2', []).outerHTML()
			} catch (e) {
				return e.name
			}
		})(), 'ReferenceError'))
		// set an attribute using a function
		.then(() => test(`${x.data('attrThree', function () { return this.data('attrOne') }).outerHTML()}`, '<span data-attr-one="val1" data-attr-two="null" data-attr-three="val1"></span>'))
		.then(() => test(`${x.data('attrThree')}`                                                         , 'val1'))
		// call `data()` with an object
		.then(() => test(`${x.data({ attrOne: 'string', attrTwo: 42, attrThree: true }).outerHTML()}`     , '<span data-attr-one="string" data-attr-two="42" data-attr-three="true"></span>'))
		.then(() => test(`${x.data({ attrOne: null }).outerHTML()}`                                       , '<span data-attr-two="42" data-attr-three="true"></span>'))
		// call `data()` with no args, `null`, or an empty object `{}`
		.then(() => test(`${x.data(    ).outerHTML()}`                                                    , '<span data-attr-two="42" data-attr-three="true"></span>'))
		.then(() => test(`${x.data(null).outerHTML()}`                                                    , '<span data-attr-two="42" data-attr-three="true"></span>'))
		.then(() => test(`${x.data({}  ).outerHTML()}`                                                    , '<span data-attr-two="42" data-attr-three="true"></span>'))
		// fail to call `data()` with `''`
		.then(() => test((() => {
			try {
				return x.attr('').outerHTML()
			} catch (e) {
				return e.name
			}
		})(), 'RangeError'))
]).then((arr) => true)
