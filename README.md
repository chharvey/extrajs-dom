# extrajs-element
An HTML element in Javascript.

## API Docs (by example)

This section serves as documentation by example.
More rigorous API documentation is coming soon,
but the examples below illustrate typical ways to use this package.

Each example is a code snippet, that, when nested inside a function, would return `true`.
The function definition block is omitted for brevity.

### Stability Levels
- **(0) OBSOLETE**    : This feature is no longer supported. Do not use it.
- **(1) DEPRECATED**  : Breaking changes are planned for this feature, or it will be removed in future versions. It is no longer in development, and should not be relied upon.
- **(2) EXPERIMENTAL**: This feature is in development, but is unsupported or subject to change. It could be removed in future versions.
- **(3) STABLE**      : This feature has been tested and proven satisfactory. It is in development, but no breaking changes will be made unless absolutely necessary.
- **(4) LOCKED**      : Only patches will be made to this feature. It may be heavily relied upon and will not be removed in future versions.


### Constructor

#### `new Element(name, is_void = false)` (STABLE)
Construct a new element.
```js
let el1 = new Element('span')
return el1.html() === `<span></span>`
```
The constructor knows which HTML5 elements are void:
```js
let el1 = new Element('meta')
let el2 = new Element('link')
return (el1.html() === `<meta/>`) && (el2.html() === `<link/>`)
```
The constructor does not know non-HTML elements:
```js
let el1 = new Element('path')
let el2 = new Element('path', true)
return (el1.html() === `<path></path>` /* (invalid) */) && (el2.html() === `<path/>`)
```


### Getters and Setters

#### get `string : #name` (LOCKED)
Return the name of the element.
```js
return new Element('div').name === 'div'
```

#### get `boolean : #isVoid` (LOCKED)
Return `true` if this element is void.
```js
return (
  !new Element('div').isVoid
  && new Element('img').isVoid
  && !new Element('rect').isVoid
  && new Element('rect',true).isVoid
)
```

#### get `Object<string> : #attributes` (LOCKED)
Return an object of this element’s attributes.
```js
let el = new Element('div').attr('class','panel')
let at = el.attributes // { class: 'panel' }
return at.class === 'panel'
```

#### get `?string : #contents` (LOCKED)
Return a string of this element’s contents.
```js
let el = new Element('div').addContent(`once upon ...`)
return el.contents === `once upon ...`
```

#### get `Object<string> : #styles` (LOCKED)
Return an object of this element’s styles.
```js
let el = new Element('div').attr('style','color: blue;')
let st = el.styles // { color: 'blue' }
return st.color === 'blue'
```

#### get `Object<string> : #dataset` (LOCKED)
Return an object of this element’s `data-*` custom attributes.
```js
let el = new Element('div').attr('data-instanceof','Promise')
let da = el.dataset // { instanceof: 'Promise' }
return da.instanceof === 'Promise'
```


### Attribute Methods

#### `#attr()` (STABLE)
Set an attribute (string, boolean, or number value):
```js
let el1 = new Element('div').attr('itemtype', 'HTMLElement') // string
let el2 = new Element('div').attr('data-block', true) // boolean
let el3 = new Element('div').attr('data-nthchild', 3) // number
return (
  el1.html() === `<div itemtype="HTMLElement"></div>`
  && el1.html() === `<div data-block="true"></div>`
  && el1.html() === `<div data-nthchild="3"></div>`
)
```
Set a “boolean attribute”:
```js
let el = new Element('div').attr('itemscope', '')
return el.html() === `<div itemscope=""></div>`
```
Get the value of an attribute (or `undefined` if the attribute had not been set):
```js
let el = new Element('div').attr('itemtype', 'HTMLElement')
return (el.attr('itemtype') === 'HTMLElement') && (el.attr('itemscope') === undefined)
```
Remove an attribute:
```js
let el = new Element('div').attr('itemtype', 'HTMLElement')
el.attr('itemtype', null)
return el.html() === `<div></div>`
```
Set an attribute with a function (`this` refers to the element):
the function should take 0 arguments and return a string:
```js
let el = new Element('div').attr('id','my-div')
el.attr('data-id', function () { return `my-${this.name}` })
return el.html() === `<div id="my-div" data-id="my-div"></div>`
```
Set/remove (cannot get) multiple attributes with an object:
```js
let el = new Element('div').attr('data-id','anything')
el.attr({
  itemprop : 'name',
  itemscope: '',
  itemtype : 'Person',
  'data-id': null, // remove
})
return el.html() === `<div itemprop="name" itemscope="" itemtype="Person"></div>`
```

#### `#attrStr()` (EXPERIMENTAL)
Set (cannot remove) one or more attributes using one or more strings of the form `attr="val"`.
```js
new Element('div').attrStr('itemprop="name"', 'itemscope=""', 'itemtype="Person"')
return el.html() === `<div itemprop="name" itemscope="" itemtype="Person"></div>`
```

#### `#id()` (LOCKED)
Set, remove, or get the `[id]` attribute. Shortcut for `#attr('id',value)`.

set the id (string, boolean, or number):
```js
let el = new Element('div').id('my-div')
return el.html() === `<div id="my-div"></div>`
```
set the id with a function (`this` refers to the element):
the function should take 0 arguments and return a string:
```js
let el = new Element('div').id(function () { return `my-${this.name}` })
return el.html() === `<div id="my-div"></div>`
```
get the id (or `undefined` if the attribute had not been set):
```js
let el = new Element('div').id('my-div')
return el.id() === 'my-div'
```
remove the id:
```js
let el = new Element('div').id('my-div')
el.id(null)
return el.html() === `<div></div>`
```

#### `#class()` (LOCKED)
Set, remove, or get the `[class]` attribute. Shortcut for `#attr('class',value)`.

set the class (string, boolean, or number):
```js
let el = new Element('div').class('my-div your-div')
return el.html() === `<div class="my-div your-div"></div>`
```
set the class with a function (`this` refers to the element):
the function should take 0 arguments and return a string:
```js
let el = new Element('div').class(function () { return `my-${this.name} your-div` })
return el.html() === `<div class="my-div your-div"></div>`
```
get the class (or `undefined` if the attribute had not been set):
```js
let el = new Element('div').class('my-div your-div')
return el.id() === 'my-div your-div'
```
remove the class:
```js
let el = new Element('div').class('my-div your-div')
el.id(null)
return el.html() === `<div></div>`
```

#### `#addClass()` (LOCKED)
Append to the `[class]` attribute.
```js
let el1 = new Element('div').class('my-div your-div').addClass('o-Object c-Component')
let el2 = new Element('span').class('my-span your-span').addClass()
return (
  el1.html() === `<div class="my-div your-div o-Object c-Component"></div>`
  && el2.html() === `<span class="my-span your-span"></span>`
)
```

#### `#removeClass()` (LOCKED)
Remove a class.
```js
let el = new Element('div').class('my-div your-div o-Object c-Component')
el.removeClass('o-Object')
return el.html() === `<div class="my-div your-div c-Component"></div>`
```

#### `#style()` (STABLE)
Shortcut for setting the `[style]` attribute.

Set the style (string only):
```js
let el = new Element('div').style('background:none; font-weight:bold;')
return el.html() === `<div style="background:none; font-weight:bold;"></div>`
```
Set the style with an object:
```js
let el = new Element('div').style({ background: 'none', 'font-weight': bold })
return el.html() === `<div style="background:none;font-weight:bold;"></div>`
```
set the style with a function (`this` refers to the element):
the function should take 0 arguments and return a string:
```js
let el = new Element('div').style(function () { return `content: '${this.name}';` })
return el.html() === `<div style="content:'div';"></div>`
```
remove the `[style]` attribute:
```js
let el = new Element('div').style(function () { return `content: '${this.name}';` })
el.style(null)
return el.html() === `<div></div>`
```
get the value of `[style]` (or `undefined` if the attribute had not been set):
```js
let el = new Element('div').style(function () { return `content: '${this.name}';` })
return el.style() === 'content:\'div\';'
```
reminder: get the value of `[style]` as an *object* (e.g. `{content: 'div'}`)
using the `#styles` getter function.

#### `#css()` (STABLE)
Set a single css style (string, boolean, or number value):
```js
let el1 = new Element('div').css('background', 'red') // string
let el2 = new Element('div').css('content', false) // boolean
let el3 = new Element('div').css('opacity', 0.5) // number
let el4 = new Element('div').css('content', '\'true\'') // another string, with escaped quotes
return (
  el1.html() === `<div style="background:red;"></div>`
  && el2.html() === `<div style="content:false;"></div>`
  && el3.html() === `<div style="opacity:0.5;"></div>`
  && el4.html() === `<div style="content:'true';"></div>`
)
```
Get the value of a css property (or `undefined` if the property had not been set):
```js
let el = new Element('div').css('font-weight', '300')
return (el.css('font-weight') === '300') && (el.css('font-style') === undefined)
```
Remove a css propety:
```js
let el = new Element('div')
  .css('background', 'red')
  .css('font-weight', 'bold')
  .css('font-weight', null)
return el.html() === `<div style="background:red;"></div>`
```
*CHANGED!* Remove a css property with empty string:
```js
let el = new Element('div')
  .css('background', 'red')
  .css('font-weight', 'bold')
  .css('font-weight', '') // does *NOT* set `font-weight:'';`. removes it!
return el.html() === `<div style="background:red;"></div>`
```
Set an attribute with a function (`this` refers to the element):
the function should take 0 arguments and return a string:
```js
let el = new Element('div').attr('id','#c0ffee')
el.css('color', function () { return this.attr('id') })
return el.html() === `<div id="#c0ffee" style="color:#c0fefe;"></div>`
```
Set/remove (cannot get) multiple css properties with an object:
```js
let el = new Element('div').attr('data-id','anything')
el.attr({
  background  : 'red',
  margin      : '1rem',
  opacity     : 0.5,
  visibility  : null, // remove the `visibility` property
  'text-align': '',   // remove the `text-align` property
})
return el.html() === `<div style="background:red;margin:1rem;opacity:0.5;"></div>`
```

#### `#data()` (LOCKED)
Shortcut for setting any `[data-*]` custom attribute.

Set:
```js
let el = new Element('div').data('type','division')
return el.html() === `<div data-type="division"></div>`
```
Get:
```js
let el = new Element('div').attr('data-type','division').data('class','null')
return (el.data('type') === 'division') && (el.data('quality') === undefined)
```
reminder: get all the `[data-*]` custom attributes as an *object*
(e.g. `{type: 'division', class: 'null'}`) using the `#dataset` getter function.

Remove:
```js
let el = new Element('div').attr('data-type','division').data('class','null')
el.data('type', null)
return el.html() === '<div data-class="null"></div>'
```

### Content Methods

#### `#addContent()` (LOCKED)
Add text or html content:
```js
let el1 = new Element('div').addContent(`hello world`)
let el2 = new Element('div').addContent(`<strong>hello world</strong>`)
let el3 = new Element('div').addContent(new Element('strong').addContent(`hello world`).html())
return (
  el1.html() === `<div>hello world</div>`
  && el2.html() === `<div><strong>hello world</strong></div>`
  && el3.html() === `<div><strong>hello world</strong></div>`
)
```

#### `#addElements()` (LOCKED)
Add an array of Element objects as content:
```js
let el = new Element('div').addElements([
  new Element('strong').addContent(`hello `),
  new Element('em').addContent(`world`),
  new Element('mark').addElements([ new Element('i').addContent(`!`) ]),
])
return el.html() === `<div><strong>hello </strong><em>world</em><mark><i>!</i></mark></div>`
```

#### `#html()` (STABLE)
Output as an html string. (see any of the above examples.)
May rename this to `#toString()`? as it applies to more than HTML elements.

### Static Methods

#### `Element.concat()` (LOCKED)
Concatenate multiple element outputs. useful if you need siblings with no parent.

multiple Element arguments:
```js
let snip = Element.concat(
  new Element('strong').addContent(`hello `),
  new Element('em').addContent(`world`),
  new Element('mark').addContent(`!`)
)
return snip === `<strong>hello </strong><em>world</em><mark>!</mark>`
```
one single array argument:
```js
let snip = Element.concat([
  new Element('strong').addContent(`hello `),
  new Element('em').addContent(`world`),
  new Element('mark').addContent(`!`),
])
return snip === `<strong>hello </strong><em>world</em><mark>!</mark>`
```

#### `Element.data()` (EXPERIMENTAL)
This one’s a doozie. Coming soon.
