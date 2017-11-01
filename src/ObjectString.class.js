const xjs = require('extrajs')

/**
 * An Object that contains string values only.
 * Equivalent to @type {Object<string>}, with some added restrictions and methods.
 * @private
 */
class ObjectString {
  /**
   * NOTE: TYPE DEFINITION
   * @summary This object’s values can be any one of the following types.
   * @description
   * ```json
   * {
   *   "$schema"    : "http://json-schema.org/schema#",
   *   "title"      : "ObjectString.ValueType",
   *   "description": "This object’s values can be any one of the following types.",
   *   "type"       : ["string", "number", "boolean"],
   *   "oneOf"      : [
   *     { "type": "string" , "description": "the value is a string" },
   *     { "type": "number" , "description": "the value is a number converted to a string; may not be `NaN`" },
   *     { "type": "boolean", "description": "the value is a boolean converted to a string" }
   *   ]
   * }
   * ```
   * @typedef {(string|number|boolean)} ObjectString.ValueType
   */
  /**
   * @summary Construct a new ObjectString object.
   * @param {Object<ObjectString.ValueType>=} data the data with which to initialize this objectstring
   */
  constructor(data = {}) {
    /** @private */ this._data = (function (d) {
      let returned = {}
      for (let i in d) {
        if (i.trim() !== '') returned[i.trim()] = `${d[i]}`.trim()
      }
      return returned
    })(data)
  }



  /**
   * @summary Return a shallow clone of this object’s data.
   * @description The returned value may be modified without affecting this object.
   *
   * Example:
   * ```js
   * let a = new ObjectString({ key1: 'val1' })
   * let temp = a.data
   * temp.key2 = 'val2'
   * let b = new ObjectString(temp)
   * a.toAttrString() // ' key1="val1"'
   * b.toAttrString() // ' key1="val1" key2="val2"'
   * a.toCssString()  // 'key1:val1;'
   * b.toCssString()  // 'key1:val1;key2:val2;'
   * let c = new ObjectString(a.data)
   * c.set('key3','val3')
   * a.toAttrString() // ' key1="val1"'
   * c.toAttrString() // ' key1="val1" key3="val3"'
   * a.toCssString()  // 'key1:val1;'
   * c.toCssString()  // 'key1:val1;key3:val3;'
   * ```
   * @return {Object<string>} a shallow clone of `this._obj`
   */
  get data() {
    return xjs.Object.cloneDeep(this._data)
  }



  /**
   * @summary Set a key, or override one if it exists.
   * @description Both key and value strings will be trimmed.
   * Examples:
   * ```js
   * objstr.set('key', 'value') // set the `key` key to `'value'`
   * objstr.set('key', '')      // set the `key` key to the empty string
   * ```
   * @param {string} key the property to set; nonempty string
   * @param {ObjectString.ValueType} value the value to set
   * @return {ObjectString} `this`
   */
  set(key, value) {
    if (key.trim() === '') return this
    if (xjs.Object.typeOf(value) === 'NaN') throw new TypeError('Provided value cannot be NaN.')
    this._data[key.trim()] = `${value}`.trim()
    return this
  }

  /**
   * @summary Set a key using a function called on an object.
   * @description The function should take 0 arguments and return a string.
   * If no object is provided, the function is called on `this`.
   *
   * Examples:
   * ```js
   * obj.action('key', function () { return this.name }, someOtherObject) // set the `key` key to the name of `someOtherObject`
   * obj.action('key', function () { return this.name })                  // set the `key` key to the name of `this`
   * ```
   * @param {string} key the key to set
   * @param {function():ObjectString.ValueType} valueFn a function to call
   * @param {*=} thisarg an object on which `valueFn` is called (if not provided, `this` is used)
   * @return {ObjectString} `this`
   */
  setFn(key, valueFn, thisarg = null) {
    this.set(key, valueFn.call(thisarg || this))
  }

  /**
   * @summary Get the value of the given key, or `undefined` if it does not exist.
   * @description Examples:
   * ```js
   * objstr.get('key') // get the actual value of the `key` key (or `undefined` if it had not been set)
   * ```
   * @param  {string} key the key to get
   * @return {string=} the value of the specified key
   */
  get(key) {
    return this._data[key]
  }

  /**
   * @summary Remove the provided key.
   * @description Examples:
   * ```js
   * obj.action('key') // delete the `key` key
   * ```
   * @param  {string} key the key to delete
   * @return {ObjectString} `this`
   */
  delete(key) {
    delete this._data[key]
    return this
  }

  /**
   * @summary Convert this object into an string of html attributes.
   * @description The string is returned in the following format:
   * ` key1="val1" key2="val2" key3="val3"`.
   * @return {string} a string containing attribute-value pairs
   */
  toAttrString() {
    let returned = ''
    for (let i in this._data) {
      returned += ` ${i}="${this._data[i]}"`
    }
    return returned
  }

  /**
   * @summary Convert this object into a css-valid string.
   * @description The string is returned in the following format:
   * `key1:val1;key2:val2;key3:val3;`.
   * @return {string} a valid css string containing property-value pairs
   */
  toCssString() {
    let returned = ''
    for (let i in this._data) {
      returned += `${i}:${this._data[i]};`
    }
    return returned
  }



  /**
   * @summary Return a new ObjectString object generated from an html string.
   * @description The returned object’s keys and values correspond to
   * the attributes and values given in the provided html string.
   * @param  {string} attr_string a snippet of html containing only attributes and values
   * @return {ObjectString} a new ObjectString object with the given html attribute-value pairs
   */
  static fromAttrString(attr_string) {
    throw new Error('feature not supported yet')
  }

  /**
   * @summary Return a new ObjectString object generated from a css string.
   * @description The returned object’s keys and values correspond to
   * the properties and values given in the provided css string.
   * @param  {string} css_string a css-valid string
   * @return {ObjectString} a new ObjectString object with the given css property-value pairs
   */
  static fromCssString(css_string) {
    let returned = new ObjectString()
    css_string.split(';').map((rule) => rule.split(':')).forEach(function (rule_arr) {
      rule_arr[0] = rule_arr[0] && rule_arr[0].trim() // css property
      rule_arr[1] = rule_arr[1] && rule_arr[1].trim() // css value
      if (rule_arr[0] && rule_arr[1]) returned.set(rule_arr[0], rule_arr[1])
    })
    return returned
  }
}

module.exports = ObjectString
