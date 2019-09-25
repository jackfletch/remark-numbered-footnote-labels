import { Footnote, FootnoteDefinition, FootnoteReference } from "mdast";
import { Plugin, Transformer } from "unified";
import { Node, Parent, Point } from "unist";
import visit = require("unist-util-visit");

const plugin: Plugin = () => {
  const transformer: Transformer = (tree, _file) => {
    const footnotes: IFootnote = {};

    visit<Footnote>(tree, "footnote", convert);

    visit<FootnoteDefinition>(tree, "footnoteDefinition", createIds(footnotes));

    visit<FootnoteReference>(tree, "footnoteReference", replaceIds(footnotes));

    return tree;
  };

  return transformer;
};

interface IFootnote {
  [key: string]: number;
}

const convert: visit.Visitor<Footnote> = (
  node: Node,
  index: number,
  parent: Parent
) => {
  const id = autoId(node.position!.start);
  const footnoteDefinition = {
    children: node.children,
    identifier: id,
    type: "footnoteDefinition"
  };
  const footnoteReference = {
    identifier: id,
    type: "footnoteReference"
  };
  parent.children.splice(index, 1, footnoteReference, footnoteDefinition);
};

function createIds(footnotes: IFootnote) {
  const visitor: visit.Visitor<FootnoteDefinition> = (
    node: Node,
    index: number,
    parent: Parent
  ) => {
    const identifier = String(node.identifier);

    if (!footnotes.hasOwnProperty(identifier)) {
      footnotes[identifier] = Object.keys(footnotes).length + 1;
    }
    // node.identifier = String(footnotes[identifier]);
    node.label = String(footnotes[identifier]);
  };
  return visitor;
}

function replaceIds(footnotes: IFootnote) {
  const visitor: visit.Visitor<FootnoteReference> = (
    node: Node,
    index: number,
    parent: Parent
  ) => {
    const identifier = String(node.identifier);

    if (!footnotes.hasOwnProperty(identifier)) {
      footnotes[identifier] = Object.keys(footnotes).length + 1;
    }
    // node.identifier = String(footnotes[identifier]);
    node.label = String(footnotes[identifier]);
  };
  return visitor;
}

function autoId(node: Point): string {
  const { line, column, offset } = node;
  return `l${line}c${column}o${offset}`;
}

module.exports = plugin;
