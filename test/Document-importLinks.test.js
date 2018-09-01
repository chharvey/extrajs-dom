const jsdom = require('jsdom')

const xjs = require('../index.js')
const test = require('../lib/test.js')


const x_docuemnt = new xjs.Document(new jsdom.JSDOM(`
<!doctype html>
<html lang="en">
	<head><title>test</title></head>
	<body>
		<ul>
			<template>
				<li>
					<link id="link1" rel="import" data-import="template" href="./x-test.tpl.html"/>
				</li>
			</template>
		</ul>
		<link id="link2" rel="import" data-import="document" href="./x-test.tpl.html"/>
	</body>
</html>
`).window.document)

module.exports = Promise.all([
	test((() => {
		console.log(`Expected possible warning: "\`HTMLLinkElement#import\` is not yet supported. Replacing \`<link>\`s with their imported contents…"`)
		return console.log(x_docuemnt.importLinks(__dirname).innerHTML()) || ''
	})(), ''),
]).then((arr) => true)
