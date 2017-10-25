const View    = require('extrajs-view')
const Element = require('./index.js').Element


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

function element_attr() {
  let x = new Element('span')
  console.log(`new Element:\t`, x.html())
  x = x.attr('attr1','val1')
  console.log(`set attr1="val1":\t`, x.html())
  let y = x.attr('attr1')
  console.log(`get attr1:\t`, y)
  x = x.attr('attr2','')
  console.log(`set attr2="":\t`, x.html())
  x = x.attr('attr2',null)
  console.log(`remove attr2:\t`, x.html())
  x = x.attr('attr3',function () { return this.attr('attr1') })
  console.log(`set attr3 to value of attr1:\t`, x.html())
  try {
    x = x.attr()
    console.log(`provide no args to #attr():\t`, x.html())
  } catch (e) {
    console.error(`failed to call #attr() with no args: ${e}`)
  }
  try {
    x = x.attr(null)
    console.log(`provide null to #attr():\t`, x.html())
  } catch (e) {
    console.error(`failed to call #attr(null): ${e}`)
  }
  x = x.attr({
    attr1withobj: 'string',
    attr2withobj: 42,
    attr3withobj: true,
    attr4withobj: function () { return `${this.name} is ${(!this.isVoid)?'not ':''}void` },
    attr2: null,
  })
  console.log(`set/remove multiple attributes of multiple types:\t`, x.html())
  x = x.attr({})
  console.log(`pass empty object to #attr():\t`, x.html())
  try {
    let myvar; // undefined
    x = x.attr({
      undefinedattriute: myvar
    })
    console.log(`pass undefined as obj value to #attr():\t`, x.html())
  } catch (e) {
    console.error(`failed to pass undefined in object to #attr(): ${e}`)
  }
  try {
    x = x.attr('trying-NaN',NaN)
  } catch (e) {
    console.error(`failed to pass NaN to #attr(): ${e}:\t`, x.html())
  }
  x = x.attr('ternary1', (true) ? 'true' : null)
  console.log(`set attributes with ternary:\t`, x.html())
  x = x.attr('ternary2', (false) ? 'true' : null)
  console.log(`remove attributes with ternary:\t`, x.html())

  console.log(`get all attriutes in object form:\t`, x.attributes)
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

function element_data() {
  class Person {
    constructor(name) {
      this.name = name
    }
    get view() {
      return new View(function () {
        return `<span>${this.name}</span>`
      }, this)
        .addDisplay(function cap(capitalize) {
          return `<h1 style="text-transform: ${(capitalize) ? 'uppercase' : 'normal'}">${this.name}</h1>`
        })
    }
  }
  let chris = new Person('Chris')
  // console.log(chris.view())
  // console.log(chris.view.cap(true))
  // console.log(chris.view.cap(false))
  console.log(Element.data(chris, {display:{name:'cap'}}))
}

// element();
// element_attr();
// element_style();
// element_css();
// element_data();
// element_addContent();
// element_toString();
// element_view();
// element_concat();
// element_data();
