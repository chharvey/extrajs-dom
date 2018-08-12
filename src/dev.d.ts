// <https://github.com/Microsoft/TypeScript/issues/21150>

declare interface dev_ParentNode extends ParentNode {
  append (...nodes: (Node|string)[]): void;
  prepend(...nodes: (Node|string)[]): void;
}

declare interface dev_ChildNode extends ChildNode {
  after      (...nodes: (Node|string)[]): void;
  before     (...nodes: (Node|string)[]): void;
  replaceWith(...nodes: (Node|string)[]): void;
}


type dev_Document         = Document         & dev_ParentNode;
type dev_DocumentFragment = DocumentFragment & dev_ParentNode;

type dev_Element                 = Element                 & dev_ParentNode & dev_ChildNode;
type dev_HTMLElement             = HTMLElement             & dev_ParentNode & dev_ChildNode;
type dev_HTMLMetaElement         = HTMLMetaElement         & dev_ParentNode & dev_ChildNode;
type dev_HTMLLinkElement         = HTMLLinkElement         & dev_ParentNode & dev_ChildNode;
type dev_HTMLOListElement        = HTMLOListElement        & dev_ParentNode & dev_ChildNode;
type dev_HTMLUListElement        = HTMLUListElement        & dev_ParentNode & dev_ChildNode;
type dev_HTMLDListElement        = HTMLDListElement        & dev_ParentNode & dev_ChildNode;
type dev_HTMLLIElement           = HTMLLIElement           & dev_ParentNode & dev_ChildNode;
type dev_HTMLTableSectionElement = HTMLTableSectionElement & dev_ParentNode & dev_ChildNode;
type dev_HTMLTableRowElement     = HTMLTableRowElement     & dev_ParentNode & dev_ChildNode;
type dev_HTMLAnchorElement       = HTMLAnchorElement       & dev_ParentNode & dev_ChildNode;
type dev_HTMLDataElement         = HTMLDataElement         & dev_ParentNode & dev_ChildNode;
type dev_HTMLTimeElement         = HTMLTimeElement         & dev_ParentNode & dev_ChildNode;
type dev_HTMLTemplateElement     = HTMLTemplateElement     & dev_ParentNode & dev_ChildNode;

export {
  dev_Document,
  dev_DocumentFragment,
  dev_Element,

  dev_HTMLElement,
  dev_HTMLMetaElement,
  dev_HTMLLinkElement,
  dev_HTMLOListElement,
  dev_HTMLUListElement,
  dev_HTMLDListElement,
  dev_HTMLLIElement,
  dev_HTMLTableSectionElement,
  dev_HTMLTableRowElement,
  dev_HTMLAnchorElement,
  dev_HTMLDataElement,
  dev_HTMLTimeElement,
  dev_HTMLTemplateElement,
}
