const jsdom = require('jsdom')

const xjs = {
  ...require('extrajs'),
  ...require('../index.js'),
}

let document = new jsdom.JSDOM(`
<!doctype html>
<html lang="en">
<head><title>test</title></head>
<body>
<p>Hello world.</p>
<h1>Pets:</h1>
<ul>
  <li>Bird</li>
  <li>Cat</li>
  <li>Dog</li>
</ul>
</body>
</html>
`).window.document


let list = document.querySelector('ul')
let xlist = new xjs.HTMLUListElement(list).class('testing123')


console.log(xlist.outerHTML())



let template = new jsdom.JSDOM(`
<template>
  <slot name="put-text-here">{{ text }}</slot>
</template>
`).window.document.querySelector('template')

let output = new xjs.HTMLTemplateElement(template).setRenderer(function (frag, data) {
  frag.querySelector('slot[name="put-text-here"]').textContent = data.text
}).render({ text: "hello world" })

console.log(new xjs.DocumentFragment(output).innerHTML())