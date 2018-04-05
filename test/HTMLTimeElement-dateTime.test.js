const jsdom = require('jsdom')

const xjs = {
  ...require('extrajs'),
  ...require('../index.js'),
}

const {document} = new jsdom.JSDOM(`
<!doctype html>
<html lang="en">
<head><title>test</title></head>
<body>
<time></time>
</body>
</html>
`).window



let time = new xjs.HTMLTimeElement(document.querySelector('time'))
  .dateTime(new Date())
  .textContent('now')

console.log(time.outerHTML())
