import MagicString from 'magic-string';
import Stylesheet from './Stylesheet';
import { Node } from '../../interfaces';
import Component from '../Component';
export default class Selector {
    node: Node;
    stylesheet: Stylesheet;
    blocks: Block[];
    local_blocks: Block[];
    used: boolean;
    constructor(node: Node, stylesheet: Stylesheet);
    apply(node: Node, stack: Node[]): void;
    minify(code: MagicString): void;
    transform(code: MagicString, attr: string): void;
    validate(component: Component): void;
}
declare class Block {
    global: boolean;
    combinator: Node;
    selectors: Node[];
    start: number;
    end: number;
    should_encapsulate: boolean;
    constructor(combinator: Node);
    add(selector: Node): void;
}
export {};
