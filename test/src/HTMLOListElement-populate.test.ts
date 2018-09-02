import * as xjs from '../../index'
import {RenderingFunction} from '../../src/class/HTMLTemplateElement.class'
import test from './test'

const jsdom = require('jsdom')


let x: xjs.HTMLOListElement = new xjs.HTMLOListElement(jsdom.JSDOM.fragment(`
<ol class="list">
	<template>
		<li class="list-item">
			<a class="list-link" href="{{ url }}" itemprop="significantLink">{{ text }}</a>
		</li>
	</template>
</ol>
`).querySelector('ol.list'))

let data = [
  { "url": "#0", "text": "Career Connections" },
  { "url": "#1", "text": "Getting Licensed & Certified" },
  { "url": "#2", "text": "Career resources" },
  { "url": "#3", "text": "Code of Ethics" }
]

export default Promise.all([
	test(console.log(x.populate(function (frag: DocumentFragment, data: {url:string,text:string}, _opts: unknown) {
		;(frag.querySelector('.list-link') as HTMLAnchorElement).href        = data.url
		;(frag.querySelector('.list-link') as HTMLLIElement    ).textContent = data.text
	}, data).outerHTML()) || '', ''),
])
