import Renderer from '../Renderer';
import Block from '../Block';
import Wrapper from './shared/Wrapper';
import Window from '../../nodes/Window';
import { INode } from '../../nodes/interfaces';
export default class WindowWrapper extends Wrapper {
    node: Window;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: INode);
    render(block: Block, _parent_node: string, _parent_nodes: string): void;
}
