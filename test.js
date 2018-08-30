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
