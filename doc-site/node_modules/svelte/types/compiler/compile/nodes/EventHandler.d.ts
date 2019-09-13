import Node from './shared/Node';
import Expression from './shared/Expression';
import Component from '../Component';
import Block from '../render_dom/Block';
export default class EventHandler extends Node {
    type: 'EventHandler';
    name: string;
    modifiers: Set<string>;
    expression: Expression;
    handler_name: string;
    uses_context: boolean;
    can_make_passive: boolean;
    constructor(component: Component, parent: any, template_scope: any, info: any);
    render(block: Block): string;
}
