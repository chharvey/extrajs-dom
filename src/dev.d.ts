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

declare interface dev_HTMLElement             extends HTMLElement            , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLMetaElement         extends HTMLMetaElement        , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLLinkElement         extends HTMLLinkElement        , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLOListElement        extends HTMLOListElement       , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLUListElement        extends HTMLUListElement       , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLDListElement        extends HTMLDListElement       , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLLIElement           extends HTMLLIElement          , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLTableSectionElement extends HTMLTableSectionElement, dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLTableRowElement     extends HTMLTableRowElement    , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLTableCellElement    extends HTMLTableCellElement   , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLAnchorElement       extends HTMLAnchorElement      , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLDataElement         extends HTMLDataElement        , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLTimeElement         extends HTMLTimeElement        , dev_ParentNode, dev_ChildNode {}
declare interface dev_HTMLTemplateElement     extends HTMLTemplateElement    , dev_ParentNode, dev_ChildNode {}

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
  dev_HTMLTableCellElement,
  dev_HTMLAnchorElement,
  dev_HTMLDataElement,
  dev_HTMLTimeElement,
  dev_HTMLTemplateElement,
}
