import Renderer from '../Renderer';
import Block from '../Block';
import Tag from './shared/Tag';
import Wrapper from './shared/Wrapper';
import MustacheTag from '../../nodes/MustacheTag';
import RawMustacheTag from '../../nodes/RawMustacheTag';
export default class RawMustacheTagWrapper extends Tag {
    var: string;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: MustacheTag | RawMustacheTag);
    render(block: Block, parent_node: string, _parent_nodes: string): void;
}
