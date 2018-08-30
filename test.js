			// require('./test/DocumentFragment-importLinks.test.js'),
			// require('./test/HTMLOListElement-populate.test.js'),
			// require('./test/HTMLUListElement-populate.test.js'),
			// require('./test/HTMLTimeElement-dateTime.test.js'),


const Element = require('./index.js').Element
const HTMLElement      = require('./index.js').HTMLElement
const HTMLOListElement = require('./index.js').HTMLOListElement
const HTMLUListElement = require('./index.js').HTMLUListElement
const HTMLDListElement = require('./index.js').HTMLDListElement
const HTMLLIElement    = require('./index.js').HTMLLIElement


function element() {
  let x = new Element('span')
  console.log(x)
  console.log(x.html())
  console.log(x.name)
  console.log(x.isVoid)
  console.log(x.attributes)
  console.log(x.styles)
  console.log(x.dataset)
  console.log(x.contents)

  try {
    let y = new Element('meta').addContents('hello world')
    console.log(y.html())
  } catch (e) {
    console.error(`Failed to add contents to a void element.`)
  }
}

function subclasses() {
  let html = new HTMLElement('html')
  let ol = new HTMLOListElement()
  let ul = new HTMLUListElement()
  let dl = new HTMLDListElement()
  let li = new HTMLLIElement()
  console.log(...[html, ol, ul, dl, li].map((e) => e.html()))
}


function element_style() {
  let x = new Element('span')
  let y = new Element('strong')
  let z = new Element('em')
  let w = new Element('small')

  let str = 'background:none; font-weight:bold;'
  let obj = {
    background   : 'none',
    'font-weight': 'bold',
  }
  let fn = function () {
    return `content: ${this.name.slice(1)};`
  }

  console.log(x.style(str).html())
  console.log(y.style(obj).html())
  console.log(z.style(fn).html())
  console.log(w.style(str).style(obj).style(fn).style(null).html())
  console.log(z.styles)
}

function element_css() {
  let x = new Element('span')
  let y = new Element('strong')
  let z = new Element('em')
  let w = new Element('small')

  let str = 'background:none; font-weight:bold;'
  let obj = {
    color       : 'blue',
    'font-style': 'itlaic',
  }
  let fn = function () {
    return this.name.slice(1)
  }

  console.log(x.style(str).styles)
  console.log(x.css('opacity', .3).styles)
  console.log(x.css('background',null).styles)
  console.log(x.css('content',fn).styles)
  console.log(x.css('font-weight'))
  console.log(x.css(obj).styles)
  console.log(x.css())
}

function element_data() {
  let x = new Element('span')
  try {
    x = x.data('foo','bar')
    console.log(`x.data('foo','bar'):\t`, x.html())
  } catch (e) {
    console.error(`failed to set #data('foo','bar'): ${e}`)
  }
  try {
    let y = x.data('foo')
    console.log(`x.data('foo'):\t`, y)
  } catch (e) {
    console.error(`failed to get #data('foo'): ${e}`)
  }
  try {
    let u;
    z = x.data('foo',u)
    console.log(`x.data('foo',undefined):\t`, z)
  } catch (e) {
    console.error(`failed to set #data('foo',undefined): ${e}`)
  }
  try {
    x = x.data('baz', function () { return this.data('foo') })
    console.log(`x.data('baz', <function>):\t`, x.html())
  } catch (e) {
    console.error(`failed to set #data('baz',<function>): ${e}`)
  }
  try {
    x = x.data('foo', null)
    console.log(`x.data('foo', null):\t`, x.html())
  } catch (e) {
    console.error(`failed to remove with #data('foo',null): ${e}`)
  }
  try {
    a = x.data()
    console.log(`x.data():\t`, a)
  } catch (e) {
    console.error(`failed to call #data() with no args: ${e}`)
  }
  let s = new Element('span')
  console.log(x.dataset)
  console.log(s.dataset)
}

function element_addContent() {
  try {
    let x = new Element('div').addContent(null)
    console.log(`pass null to addContent():\t`, x.html())
  } catch (e) {
    console.error(`failed to call addContent(null): ${e}`)
  }
  try {
    let x = new Element('div').addContent('str', null)
    console.log(`pass string and null to addContent():\t`, x.html())
  } catch (e) {
    console.error(`failed to call addContent('str', null): ${e}`)
  }
  try {
    let x = new Element('div').addContent(['str', null])
    console.log(`pass array of string and null to addContent():\t`, x.html())
  } catch (e) {
    console.error(`failed to call addContent(['str', null]): ${e}`)
  }
}

function element_toString() {
  let data = ['one','two','three']
  let x = new Element('ul')
    .class('o-List')
    .id('my-ul')
    .data('length',data.length)
    .addContent(data.map((d) => new Element('li').class('o-List__Item').addContent(d)))
  console.log(x.toString())
  let y = new Element('link').attr({href: 'http://example.com/stylesheet.css'})
  console.log(y.toString())
}

function element_view() {
  let x = new Element('div').attr({class:'my-div'}).addContent(`a div with an attr`)
  console.log(x.view())
}

function element_concat() {
  console.log(
    `concatenate arguments`,
    Element.concat(
      new Element('em'),
      new Element('strong'),
      new Element('mark')
    )
  )
  console.log(
    `concatenate null arguments`,
    Element.concat(
      new Element('em'),
      null,
      new Element('mark')
    )
  )
  console.log(
    `concatenate array`,
    Element.concat([
      new Element('em'),
      new Element('strong'),
      new Element('mark'),
    ])
  )
  console.log(
    `concatenate array with null entry`,
    Element.concat([
      new Element('em'),
      null,
      new Element('mark'),
    ])
  )
}

function element_documentFragment() {
  console.log(
    `concatenate elements`,
    Element.documentFragment(
      new HTMLElement('em'),
      new HTMLElement('strong'),
      new HTMLElement('mark')
    )
  )
  console.log(
    `concatenate null arguments`,
    Element.documentFragment(
      new HTMLElement('em'),
      null,
      new HTMLElement('mark')
    )
  )
  console.log(
    `concatenate string arguments`,
    Element.documentFragment(
      new HTMLElement('em'),
      'a string',
      new HTMLElement('mark')
    )
  )
  console.log(
    `concatenate array`,
    Element.documentFragment([
      new HTMLElement('em'),
      new HTMLElement('strong'),
      new HTMLElement('mark'),
    ])
  )
  console.log(
    `concatenate array with null entry`,
    Element.documentFragment([
      new HTMLElement('em'),
      null,
      new HTMLElement('mark'),
    ])
  )
  console.log(
    `concatenate array with string entry`,
    Element.documentFragment([
      new HTMLElement('em'),
      'a string',
      new HTMLElement('mark'),
    ])
  )
}

// element();
// subclasses();
// element_attr();
// element_style();
// element_css();
// element_addContent();
// element_toString();
// element_view();
// element_concat();
// element_documentFragment();
// element_data();
