import { FootnoteDefinition } from "mdast";
import { Node, Parent, Point } from "unist";
import visit = require("unist-util-visit");
import {
  Action,
  ActionTuple,
  Continue,
  Exit,
  Index,
  Skip
} from "unist-util-visit-parents";

function plugin() {
  return transformer;
}

interface ISomeObject {
  [key: string]: number;
}

function transformer(tree: Node) {
  const footnotes: ISomeObject = {};
  visit(tree, "footnote", convert);

  visit(tree, "footnoteDefinition", createIds(footnotes));

  visit(tree, "footnoteReference", replaceIds(footnotes));
}

function convert(node: Node, index: number, parent: Parent): Action {
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
  return true;
}

function createIds(footnotes: ISomeObject) {
  return (node: Node, index: number, parent: Parent) => {
    const identifier = String(node.identifier);

    if (!footnotes.hasOwnProperty(identifier)) {
      footnotes[identifier] = Object.keys(footnotes).length + 1;
    }
    node.identifier = String(footnotes[identifier]);
    node.label = String(footnotes[identifier]);
  };
}

function replaceIds(footnotes: ISomeObject) {
  return (node: Node, index: number, parent: Node) => {
    const identifier = String(node.identifier);

    if (!footnotes.hasOwnProperty(identifier)) {
      footnotes[identifier] = Object.keys(footnotes).length + 1;
    }
    node.identifier = String(footnotes[identifier]);
    node.label = String(footnotes[identifier]);
  };
}

function autoId(node: Point): string {
  const { line, column, offset } = node;
  return `l${line}c${column}o${offset}`;
}

module.exports = plugin;
