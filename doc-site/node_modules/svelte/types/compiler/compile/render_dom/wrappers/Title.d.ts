import Wrapper from './shared/Wrapper';
import Renderer from '../Renderer';
import Block from '../Block';
import Title from '../../nodes/Title';
export default class TitleWrapper extends Wrapper {
    node: Title;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: Title, _strip_whitespace: boolean, _next_sibling: Wrapper);
    render(block: Block, _parent_node: string, _parent_nodes: string): void;
}
