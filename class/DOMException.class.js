const ERROR_NAMES = require('../src/domexception-errornames.json').data

/**
 * Represents a DOM exception.
 * @see https://heycam.github.io/webidl/#idl-DOMException
 */
class DOMException {
  /**
   * Construct a new DOMException object.
   * @param {string=} name the name of this exception
   * @param {string=} message the message this exception reads
   */
  constructor(name = 'Error', message = '') {
    /**
     * The name of this exception.
     * @private
     * @final
     * @type {string}
     */
    this._NAME = name

    /**
     * The message of this exception.
     * @private
     * @final
     * @type {string}
     */
    this._MESSAGE = message
  }


  /**
   * The name of this exception.
   * @see https://heycam.github.io/webidl/#dom-domexception-name
   * @type {string}
   */
  get name() { return this._NAME }

  /**
   * The message this exception reads.
   * @see https://heycam.github.io/webidl/#dom-domexception-message
   * @type {string}
   */
  get message() {
    return this._MESSAGE || (ERROR_NAMES[this.name] || {}).description || ''
  }

  /**
   * The code for this exception.
   * @see https://heycam.github.io/webidl/#dom-domexception-code
   * @type {number}
   */
  get code() {
    return (ERROR_NAMES[this.name] || {}).code || 0
  }

  // /**
  //  * Use `ERROR_NAMES` instead.
  //  */
  // static get INDEX_SIZE_ERR()              { return  1 }
  // static get DOMSTRING_SIZE_ERR()          { return  2 }
  // static get HIERARCHY_REQUEST_ERR()       { return  3 }
  // static get WRONG_DOCUMENT_ERR()          { return  4 }
  // static get INVALID_CHARACTER_ERR()       { return  5 }
  // static get NO_DATA_ALLOWED_ERR()         { return  6 }
  // static get NO_MODIFICATION_ALLOWED_ERR() { return  7 }
  // static get NOT_FOUND_ERR()               { return  8 }
  // static get NOT_SUPPORTED_ERR()           { return  9 }
  // static get INUSE_ATTRIBUTE_ERR()         { return 10 }
  // static get INVALID_STATE_ERR()           { return 11 }
  // static get SYNTAX_ERR()                  { return 12 }
  // static get INVALID_MODIFICATION_ERR()    { return 13 }
  // static get NAMESPACE_ERR()               { return 14 }
  // static get INVALID_ACCESS_ERR()          { return 15 }
  // static get VALIDATION_ERR()              { return 16 }
  // static get TYPE_MISMATCH_ERR()           { return 17 }
  // static get SECURITY_ERR()                { return 18 }
  // static get NETWORK_ERR()                 { return 19 }
  // static get ABORT_ERR()                   { return 20 }
  // static get URL_MISMATCH_ERR()            { return 21 }
  // static get QUOTA_EXCEEDED_ERR()          { return 22 }
  // static get TIMEOUT_ERR()                 { return 23 }
  // static get INVALID_NODE_TYPE_ERR()       { return 24 }
  // static get DATA_CLONE_ERR()              { return 25 }
}


module.exports = DOMException
