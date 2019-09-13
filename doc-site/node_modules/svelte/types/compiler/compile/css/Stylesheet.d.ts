import MagicString from 'magic-string';
import Selector from './Selector';
import Element from '../nodes/Element';
import { Node, Ast } from '../../interfaces';
import Component from '../Component';
declare class Rule {
    selectors: Selector[];
    declarations: Declaration[];
    node: Node;
    parent: Atrule;
    constructor(node: Node, stylesheet: any, parent?: Atrule);
    apply(node: Element, stack: Element[]): void;
    is_used(dev: boolean): boolean;
    minify(code: MagicString, _dev: boolean): void;
    transform(code: MagicString, id: string, keyframes: Map<string, string>): boolean;
    validate(component: Component): void;
    warn_on_unused_selector(handler: (selector: Selector) => void): void;
}
declare class Declaration {
    node: Node;
    constructor(node: Node);
    transform(code: MagicString, keyframes: Map<string, string>): void;
    minify(code: MagicString): void;
}
declare class Atrule {
    node: Node;
    children: Array<Atrule | Rule>;
    declarations: Declaration[];
    constructor(node: Node);
    apply(node: Element, stack: Element[]): void;
    is_used(_dev: boolean): boolean;
    minify(code: MagicString, dev: boolean): void;
    transform(code: MagicString, id: string, keyframes: Map<string, string>): void;
    validate(component: Component): void;
    warn_on_unused_selector(handler: (selector: Selector) => void): void;
}
export default class Stylesheet {
    source: string;
    ast: Ast;
    filename: string;
    dev: boolean;
    has_styles: boolean;
    id: string;
    children: Array<Rule | Atrule>;
    keyframes: Map<string, string>;
    nodes_with_css_class: Set<Node>;
    constructor(source: string, ast: Ast, filename: string, dev: boolean);
    apply(node: Element): void;
    reify(): void;
    render(file: string, should_transform_selectors: boolean): {
        code: string;
        map: import("magic-string").SourceMap;
    };
    validate(component: Component): void;
    warn_on_unused_selectors(component: Component): void;
}
export {};
