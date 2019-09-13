import Renderer from '../../Renderer';
import Element from '../../../nodes/Element';
import Wrapper from '../shared/Wrapper';
import Block from '../../Block';
import FragmentWrapper from '../Fragment';
import AttributeWrapper from './Attribute';
import Binding from './Binding';
export default class ElementWrapper extends Wrapper {
    node: Element;
    fragment: FragmentWrapper;
    attributes: AttributeWrapper[];
    bindings: Binding[];
    class_dependencies: string[];
    slot_block: Block;
    select_binding_dependencies?: Set<string>;
    var: string;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: Element, strip_whitespace: boolean, next_sibling: Wrapper);
    render(block: Block, parent_node: string, parent_nodes: string): void;
    get_render_statement(): string;
    get_claim_statement(nodes: string): string;
    add_bindings(block: Block): void;
    add_attributes(block: Block): void;
    add_spread_attributes(block: Block): void;
    add_event_handlers(block: Block): void;
    add_transitions(block: Block): void;
    add_animation(block: Block): void;
    add_actions(block: Block): void;
    add_classes(block: Block): void;
}
