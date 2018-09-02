import * as jsdom from 'jsdom'

import * as xjs from '../../index'
import test from './test'


let x: xjs.Document = new xjs.Document(new jsdom.JSDOM(`
<!doctype html>
<html lang="en">
	<head><title>test</title></head>
	<body>
		<link id="link2" rel="import" data-import="document" href="../src/x-test.tpl.html"/>
	</body>
</html>
`).window.document)

export default Promise.all([
	test((() => {
		console.log(`Expected possible warning: "\`HTMLLinkElement#import\` is not yet supported. Replacing \`<link>\`s with their imported contents…"`)
		return console.log(x.importLinks(__dirname).innerHTML()) || ''
	})(), ''),
	test((() => {
		console.log(`Expected possible warning: "\`HTMLLinkElement#import\` is not yet supported. Replacing \`<link>\`s with their imported contents…"`)
		return x.importLinksAsync(__dirname).then(() => console.log(x.innerHTML()) || '')
	})(), ''),
])
