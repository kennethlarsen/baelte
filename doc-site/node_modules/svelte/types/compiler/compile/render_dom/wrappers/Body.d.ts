import Block from '../Block';
import Wrapper from './shared/Wrapper';
import Body from '../../nodes/Body';
export default class BodyWrapper extends Wrapper {
    node: Body;
    render(block: Block, _parent_node: string, _parent_nodes: string): void;
}
