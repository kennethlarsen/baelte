import Renderer from '../../Renderer';
import Block from '../../Block';
import { INode } from '../../../nodes/interfaces';
export default class Wrapper {
    renderer: Renderer;
    parent: Wrapper;
    node: INode;
    prev: Wrapper | null;
    next: Wrapper | null;
    var: string;
    can_use_innerhtml: boolean;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: INode);
    cannot_use_innerhtml(): void;
    get_or_create_anchor(block: Block, parent_node: string, parent_nodes: string): string;
    get_update_mount_node(anchor: string): string;
    is_dom_node(): boolean;
    render(_block: Block, _parent_node: string, _parent_nodes: string): void;
}
