import Wrapper from './shared/Wrapper';
import Renderer from '../Renderer';
import Block from '../Block';
import Slot from '../../nodes/Slot';
import FragmentWrapper from './Fragment';
export default class SlotWrapper extends Wrapper {
    node: Slot;
    fragment: FragmentWrapper;
    var: string;
    dependencies: Set<string>;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: Slot, strip_whitespace: boolean, next_sibling: Wrapper);
    render(block: Block, parent_node: string, parent_nodes: string): void;
}
