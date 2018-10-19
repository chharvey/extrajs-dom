import * as jsdom from 'jsdom'

import * as xjs from '../../index'
import test from './test'


let x: xjs.DocumentFragment = new xjs.DocumentFragment(jsdom.JSDOM.fragment(`
<template>
	<ul>
		<template id="tpl-list">
			<li>
				<link id="link1" rel="import" data-import="template" href="../src/x-test.tpl.html"/>
			</li>
		</template>
	</ul>
</template>
`).querySelector('template') !.content.querySelector('template') !.content)

export default Promise.all([
	test((() => (
		console.log(`Expected possible warning: "\`HTMLLinkElement#import\` is not yet supported. Replacing \`<link>\`s with their imported contents…"`),
		console.log(x.importLinks(__dirname).innerHTML()),
		''
	))(), ''),
	test((async () => (
		console.log(`Expected possible warning: "\`HTMLLinkElement#import\` is not yet supported. Replacing \`<link>\`s with their imported contents…"`),
		await x.importLinksAsync(__dirname),
		console.log(x.innerHTML()),
		''
	))(), ''),
])
