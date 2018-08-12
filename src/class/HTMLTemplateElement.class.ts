import {dev_HTMLTemplateElement} from '../dev.d'
import xjs_DocumentFragment from './DocumentFragment.class'
import xjs_HTMLElement from './HTMLElement.class'

/**
 * @summary A rendering function.
 * @description
 * This function takes a document fragment and data, and may modify the fragment using the data.
 * Additionally it may use any rendering options passed.
 * It *should not* have a `this` context, and it *should not* have a return value.
 *
 * If this function does have a `this` context, a `this_arg` may be passed to
 * {@link xjs_HTMLTemplateElement#render}.
 * Any return value of the function does nothing.
 *
 * @param   frag the template content with which to render
 * @param   data the data to fill the template upon rendering
 * @param   options additional rendering options
 */
export type RenderingFunction = (this: any, frag: DocumentFragment, data: any, opts?: object) => void
export type RenderingFunctionV3<T> = (this: any, frag: DocumentFragment, data: T, opts?: object) => void

/**
 * Wrapper for HTML `template` element.
 * @see https://www.w3.org/TR/html52/semantics-scripting.html#htmltemplateelement
 */
export default class xjs_HTMLTemplateElement extends xjs_HTMLElement {
  /**
   * @summary Read an HTML file and return the first `<template>` element found while walking the DOM tree.
   * @description The `<template>` element will be wrapped in an `xjs.HTMLTemplate` object.
   * To access the actual element, call {@link xjs_HTMLTemplateElement#node}.
   * @param   filepath the path to the file
   * @returns the first found `<template>` descendant, wrapped
   * @throws  {ReferenceError} if there is no `<template>` descendant
   */
  static async fromFile(filepath: string): Promise<xjs_HTMLTemplateElement> {
    let elem: HTMLTemplateElement|null = (await xjs_DocumentFragment.fromFile(filepath)).node.querySelector('template')
    if (elem === null) {
      throw new ReferenceError(`No \`template\` element was found in file: ${filepath}`)
    }
    return new xjs_HTMLTemplateElement(elem)
  }
  /**
   * @summary Synchronous version of {@link xjs_HTMLTemplateElement.fromFile}.
   * @param   filepath the path to the file
   * @returns the first found `<template>` descendant, wrapped
   * @throws  {ReferenceError} if there is no `<template>` descendant
   */
  static fromFileSync(filepath: string): xjs_HTMLTemplateElement {
    let elem: HTMLTemplateElement|null = xjs_DocumentFragment.fromFileSync(filepath).node.querySelector('template')
    if (elem === null) {
      throw new ReferenceError(`No \`template\` element was found in file: ${filepath}`)
    }
    return new xjs_HTMLTemplateElement(elem)
  }


  /**
   * @summary Construct a new xjs_HTMLTemplateElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTemplateElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLTemplateElement { return super.node as dev_HTMLTemplateElement }

  /**
   * @summary Return the `<template>` element’s template contents.
   * @see https://www.w3.org/TR/html52/semantics-scripting.html#dom-htmltemplateelement-content
   * @returns this element’s template contents
   */
  content(): DocumentFragment {
    return this.node.content
  }


  /**
   * @summary Render this template with some data.
   * @param   renderer modifies the template by filling it in with data
   * @param   data the data to fill
   * @param   options additional rendering options
   * @param   this_arg a `this` context, if any, in which `renderer` is called
   * @returns the rendered output
   */
  render<T>(renderer: RenderingFunctionV3<T>, data: T, options: object = {}, this_arg: any = this): DocumentFragment {
    let frag = this.content().cloneNode(true) as DocumentFragment // COMBAK .cloneNode() returns type `Node` but should return type `this` <https://github.com/Microsoft/TypeScript/blob/master/lib/lib.dom.d.ts#L10294>
    renderer.call(this_arg, frag, data, options)
    return frag
  }
}
