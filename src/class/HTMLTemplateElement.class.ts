import * as fs from 'fs'
import * as util from 'util'

import xjs_DocumentFragment from './DocumentFragment.class'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `template` element.
 * @see https://www.w3.org/TR/html52/semantics-scripting.html#htmltemplateelement
 */
export default class xjs_HTMLTemplateElement extends xjs_HTMLElement {
	/**
	 * Read an HTML string and return the first `<template>` element found while walking the DOM tree.
	 *
	 * The `<template>` element will be wrapped in an `xjs.HTMLTemplate` object.
	 * To access the actual element, call {@link xjs_HTMLTemplateElement#node}.
	 * @param   str a string of markup
	 * @returns the first found `<template>` descendant, wrapped
	 * @throws  {ReferenceError} if there is no `<template>` descendant
	 */
	static fromString(str: string): xjs_HTMLTemplateElement {
		let elem: HTMLTemplateElement|null = xjs_DocumentFragment.fromString(str).node.querySelector('template')
		if (elem === null) {
			throw new ReferenceError(`No \`template\` element was found.`)
		}
		return new xjs_HTMLTemplateElement(elem)
	}

  /**
   * Read an HTML file and return the first `<template>` element found while walking the DOM tree.
   *
   * The `<template>` element will be wrapped in an `xjs.HTMLTemplate` object.
   * To access the actual element, call {@link xjs_HTMLTemplateElement#node}.
   * @param   filepath the path to the file
   * @returns the first found `<template>` descendant, wrapped
   * @throws  {ReferenceError} if there is no `<template>` descendant
   */
  static async fromFile(filepath: string): Promise<xjs_HTMLTemplateElement> {
		let str: string = await util.promisify(fs.readFile)(filepath, 'utf8')
		try {
			return xjs_HTMLTemplateElement.fromString(str)
		} catch {
			throw new ReferenceError(`No \`template\` element was found in file: \`${filepath}\`.`)
		}
  }
  /**
   * Synchronous version of {@link xjs_HTMLTemplateElement.fromFile}.
   * @param   filepath the path to the file
   * @returns the first found `<template>` descendant, wrapped
   * @throws  {ReferenceError} if there is no `<template>` descendant
   */
  static fromFileSync(filepath: string): xjs_HTMLTemplateElement {
		let str: string = fs.readFileSync(filepath, 'utf8')
		try {
			return xjs_HTMLTemplateElement.fromString(str)
		} catch {
			throw new ReferenceError(`No \`template\` element was found in file: \`${filepath}\`.`)
		}
  }


  /**
   * Construct a new xjs_HTMLTemplateElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTemplateElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): HTMLTemplateElement { return super.node as HTMLTemplateElement }

  /**
   * Return the `<template>` element’s template contents.
   * @see https://www.w3.org/TR/html52/semantics-scripting.html#dom-htmltemplateelement-content
   * @returns this element’s template contents
   */
  content(): DocumentFragment {
    return this.node.content
  }
}
