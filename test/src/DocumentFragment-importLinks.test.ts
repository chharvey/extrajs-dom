const jsdom = require('jsdom')

const xjs = require('../index.js')
const test = require('../lib/test.js')


let x = new xjs.DocumentFragment(jsdom.JSDOM.fragment(`
<template>
	<ul>
		<template id="tpl-list">
			<li>
				<link id="link1" rel="import" data-import="template" href="./x-test.tpl.html"/>
			</li>
		</template>
	</ul>
</template>
`).querySelector('template').content.querySelector('template#tpl-list').content)

module.exports = Promise.all([
	test((() => {
		console.log(`Expected possible warning: "\`HTMLLinkElement#import\` is not yet supported. Replacing \`<link>\`s with their imported contents…"`)
		return console.log(x.importLinks(__dirname).innerHTML()) || ''
	})(), ''),
	test((() => {
		console.log(`Expected possible warning: "\`HTMLLinkElement#import\` is not yet supported. Replacing \`<link>\`s with their imported contents…"`)
		return x.importLinksAsync(__dirname).then(() => console.log(x.innerHTML()) || '')
	})(), ''),
]).then((arr) => true)
