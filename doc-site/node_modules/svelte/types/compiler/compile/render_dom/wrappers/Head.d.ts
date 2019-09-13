import Wrapper from './shared/Wrapper';
import Renderer from '../Renderer';
import Block from '../Block';
import Head from '../../nodes/Head';
import FragmentWrapper from './Fragment';
export default class HeadWrapper extends Wrapper {
    fragment: FragmentWrapper;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: Head, strip_whitespace: boolean, next_sibling: Wrapper);
    render(block: Block, _parent_node: string, _parent_nodes: string): void;
}
