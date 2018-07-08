// <https://github.com/Microsoft/TypeScript/issues/21150>

declare interface dev_ParentNode {
  append (...nodes: (Node|string)[]): void;
  prepend(...nodes: (Node|string)[]): void;
}

declare interface dev_ChildNode {
  after      (...nodes: (Node|string)[]): void;
  before     (...nodes: (Node|string)[]): void;
  replaceWith(...nodes: (Node|string)[]): void;
}


declare interface dev_Document         extends Document        , dev_ParentNode {}
declare interface dev_DocumentFragment extends DocumentFragment, dev_ParentNode {}
declare interface dev_Element          extends Element         , dev_ParentNode, dev_ChildNode {}

declare interface dev_HTMLLinkElement extends HTMLLinkElement, dev_ParentNode, dev_ChildNode {}

export {dev_Document, dev_DocumentFragment, dev_Element, dev_HTMLLinkElement}
