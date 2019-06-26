import * as jsdom from 'jsdom'

import * as xjs from '../../index'
import test from './test'

let x: xjs.HTMLOListElement = new xjs.HTMLOListElement(jsdom.JSDOM.fragment(`
<ol>
	<template>
		<li class="list-item">
			<a class="list-link" href="{{ url }}" itemprop="significantLink">{{ text }}</a>
		</li>
	</template>
</ol>
`).querySelector('ol') !)

let data = [
	{ "url": "#0", "text": "Career Connections" },
	{ "url": "#1", "text": "Getting Licensed & Certified" },
	{ "url": "#2", "text": "Career resources" },
	{ "url": "#3", "text": "Code of Ethics" }
]

export default Promise.all([
	test((console.log(x.populate<{ url: string; text: string }, object>((frag, data, _opts) => {
		;(frag.querySelector('.list-link') as HTMLAnchorElement).href        = data.url
		;(frag.querySelector('.list-link') as HTMLLIElement    ).textContent = data.text
	}, data, {}).outerHTML()), ''), ''),
])
