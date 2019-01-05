// <https://github.com/Microsoft/TypeScript/issues/21150>

declare interface dev_ParentNode extends ParentNode {
  append (...nodes: (Node|string)[]): void
  prepend(...nodes: (Node|string)[]): void
}

declare interface dev_ChildNode extends ChildNode {
  after      (...nodes: (Node|string)[]): void
  before     (...nodes: (Node|string)[]): void
  replaceWith(...nodes: (Node|string)[]): void
}


export type dev_Document         = Document         & dev_ParentNode
export type dev_DocumentFragment = DocumentFragment & dev_ParentNode

export type dev_Element                 = Element                 & dev_ParentNode & dev_ChildNode
export type dev_HTMLElement             = HTMLElement             & dev_ParentNode & dev_ChildNode
export type dev_HTMLMetaElement         = HTMLMetaElement         & dev_ParentNode & dev_ChildNode
export type dev_HTMLLinkElement         = HTMLLinkElement         & dev_ParentNode & dev_ChildNode
export type dev_HTMLOListElement        = HTMLOListElement        & dev_ParentNode & dev_ChildNode
export type dev_HTMLUListElement        = HTMLUListElement        & dev_ParentNode & dev_ChildNode
export type dev_HTMLDListElement        = HTMLDListElement        & dev_ParentNode & dev_ChildNode
export type dev_HTMLLIElement           = HTMLLIElement           & dev_ParentNode & dev_ChildNode
export type dev_HTMLTableSectionElement = HTMLTableSectionElement & dev_ParentNode & dev_ChildNode
export type dev_HTMLTableRowElement     = HTMLTableRowElement     & dev_ParentNode & dev_ChildNode
export type dev_HTMLTableCellElement    = HTMLTableCellElement    & dev_ParentNode & dev_ChildNode
export type dev_HTMLAnchorElement       = HTMLAnchorElement       & dev_ParentNode & dev_ChildNode
export type dev_HTMLDataElement         = HTMLDataElement         & dev_ParentNode & dev_ChildNode
export type dev_HTMLTimeElement         = HTMLTimeElement         & dev_ParentNode & dev_ChildNode
export type dev_HTMLImageElement        = HTMLImageElement        & dev_ParentNode & dev_ChildNode
export type dev_HTMLTemplateElement     = HTMLTemplateElement     & dev_ParentNode & dev_ChildNode
