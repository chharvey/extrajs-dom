import xjs_HTMLTemplateElement from './HTMLTemplateElement.class'

/**
 * A processing function specifies how to transform a template into markup.
 *
 * This function modifies a given document fragment, filling it in with given data.
 * Additionally it may use any rendering options passed.
 * It *should not* have a `this` context, and it *should not* have a return value.
 *
 * If this function does have a `this` context, a `this_arg` may be passed to
 * {@link xjs_HTMLTemplateElement.render}.
 * Any return value of the function does nothing.
 *
 * @param   <T> the type of the `data` parameter
 * @param   <U> the type of the `options` object parameter
 * @param   frag the template content with which to render
 * @param   data the data to fill the template upon rendering
 * @param   options additional rendering options
 */
export interface ProcessingFunction<T, U extends object> extends Function {
	(this: any, frag: DocumentFragment, data: T, opts: U): void;
	call(this_arg: any, frag: DocumentFragment, data: T, opts: U): void;
}


/**
 * A Component stores processing operations for a template and a processing function.
 */
export default class Component<T, U extends object> {
	/**
	 * This object’s template, which is to be processed.
	 */
	private readonly _TEMPLATE: xjs_HTMLTemplateElement;
	/**
	 * This object’s processing function, which processed the template.
	 */
	private readonly _PROCESSOR: ProcessingFunction<T, U>;

	/**
	 * Construct a new Component object.
	 * @param template  the template to process
	 * @param processor the processing function to use
	 */
	constructor(template: xjs_HTMLTemplateElement, processor: ProcessingFunction<T, U>) {
		this._TEMPLATE  = template
		this._PROCESSOR = processor
	}

	/**
	 * Process this component’s template with some data.
	 * @param   <T> the type of the data to fill
	 * @param   <U> the type of the `options` object
	 * @param   data     the data to fill
	 * @param   options  additional processing options
	 * @param   this_arg the `this` context, if any, in which this object’s processor is called
	 * @returns the processed output
	 */
	process(data: T, options: U = ({} as U), this_arg: unknown = null): DocumentFragment {
		return this._TEMPLATE.render(this._PROCESSOR, data, options, this_arg)
	}
}
