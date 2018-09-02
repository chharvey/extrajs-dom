import * as xjs from '../../index'
import {ValueFunction} from '../../src/class/Element.class'
import test from './test'

const jsdom = require('jsdom')


let x = new xjs.HTMLElement(jsdom.JSDOM.fragment('<span></span>').querySelector('*'))

export default Promise.all([
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
				console.log(`Expected warning: "Key 'NaN' cannot be found. Using key 'default'…"`)
				return x.style('order', NaN).outerHTML()
			} catch (e) {
				return e.name
			}
		})(), 'ReferenceError'))
		// set a property using a function
		.then(() => test(`${x.style('content', function () { return this.tagName }).outerHTML()}`       , '<span style="content: span;"></span>'))
		.then(() => test(`${x.style('content', function () { return `'${this.tagName}'` }).outerHTML()}`, '<span style="content: \'span\';"></span>'))
		.then(() => test((() => {
			let valueFn: ValueFunction = function (this: xjs.HTMLElement) { return null }
			return `${x.style('content', valueFn).outerHTML()}`
		})(), '<span style=""></span>'))
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
				return x.style('')
			} catch (e) {
				return e.name
			}
		})(), 'RangeError'))
])
