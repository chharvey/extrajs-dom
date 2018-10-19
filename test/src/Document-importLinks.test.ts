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
