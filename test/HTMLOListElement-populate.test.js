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
<ol class="list">
  <template>
    <li class="list-item">
      <a class="list-link" href="{{ url }}" itemprop="significantLink">{{ text }}</a>
    </li>
  </template>
</ol>
</body>
</html>
`).window

let data = [
  { "url": "#0", "text": "Career Connections" },
  { "url": "#1", "text": "Getting Licensed & Certified" },
  { "url": "#2", "text": "Career resources" },
  { "url": "#3", "text": "Code of Ethics" }
]

let list = document.querySelector('ol.list')

new xjs.HTMLOListElement(list)
  .populate(data, function (f, d) {
    f.querySelector('.list-link').href        = d.url
    f.querySelector('.list-link').textContent = d.text
  })

console.log(list.outerHTML)
