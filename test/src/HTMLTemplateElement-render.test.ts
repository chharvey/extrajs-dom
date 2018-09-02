import * as jsdom from 'jsdom'

import * as xjs from '../../index'
import {RenderingFunction} from '../../src/class/HTMLTemplateElement.class'
import test from './test'


let x: xjs.HTMLTemplateElement = new xjs.HTMLTemplateElement(jsdom.JSDOM.fragment(`
<template id="a-template">
	<slot name="put-text-here">{{ text }}</slot>
</template>
`).querySelector('template') as HTMLTemplateElement)

export default Promise.all([
	test(new xjs.DocumentFragment(x.render(function (frag, data, _opts) {
		(frag.querySelector('slot[name="put-text-here"]') as HTMLSlotElement).textContent = data
	}, 'hello world')).trimInner().innerHTML(), '<slot name="put-text-here">hello world</slot>'),
	test(new xjs.DocumentFragment(x.render(function (frag, data, opts) {
		(frag.querySelector('slot[name="put-text-here"]') as HTMLSlotElement).textContent = (opts.blank) ? '' : data
	}, 'hello world', { blank: true })).trimInner().innerHTML(), '<slot name="put-text-here"></slot>'),
	test(new xjs.DocumentFragment(x.render(function (frag, _data, _opts) {
		(frag.querySelector('slot[name="put-text-here"]') as HTMLSlotElement).textContent = this.id()
	}, 'hello world')).trimInner().innerHTML(), '<slot name="put-text-here">a-template</slot>'),
	test(new xjs.DocumentFragment(x.render(function (frag, _data, _opts) {
		(frag.querySelector('slot[name="put-text-here"]') as HTMLSlotElement).textContent = this.id
	}, 'hello world', {}, { id: 'dlrow olleh' })).trimInner().innerHTML(), '<slot name="put-text-here">dlrow olleh</slot>'),
	test((() => {
		let renderingFn: RenderingFunction<string, {blank: boolean}> = function renderingFn(frag, _data, opts) {
			(frag.querySelector('slot[name="put-text-here"]') as HTMLSlotElement).textContent = (opts.blank) ? '' : this.id
		}
		return new xjs.DocumentFragment(x.render(renderingFn,'hello world', { blank: false }, {id:0})).trimInner().innerHTML()
	})(), '<slot name="put-text-here">0</slot>'),
	test(new xjs.DocumentFragment(x.render(
		function renderingFn(this: {id:string}, frag: DocumentFragment, _data: string, opts: {blank: boolean}) {
			(frag.querySelector('slot[name="put-text-here"]') as HTMLSlotElement).textContent = (opts.blank) ? '' : this.id
		},
	'hello world', { blank: false }, {id:0})).trimInner().innerHTML(), '<slot name="put-text-here">0</slot>'),
])
