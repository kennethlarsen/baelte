import Renderer from '../Renderer';
import Block from '../Block';
import Wrapper from './shared/Wrapper';
import EachBlock from '../../nodes/EachBlock';
import FragmentWrapper from './Fragment';
import ElseBlock from '../../nodes/ElseBlock';
export declare class ElseBlockWrapper extends Wrapper {
    node: ElseBlock;
    block: Block;
    fragment: FragmentWrapper;
    is_dynamic: boolean;
    var: any;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: ElseBlock, strip_whitespace: boolean, next_sibling: Wrapper);
}
export default class EachBlockWrapper extends Wrapper {
    block: Block;
    node: EachBlock;
    fragment: FragmentWrapper;
    else?: ElseBlockWrapper;
    vars: {
        create_each_block: string;
        each_block_value: string;
        get_each_context: string;
        iterations: string;
        fixed_length: number;
        data_length: string;
        view_length: string;
        length: string;
    };
    context_props: string[];
    index_name: string;
    var: string;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: EachBlock, strip_whitespace: boolean, next_sibling: Wrapper);
    render(block: Block, parent_node: string, parent_nodes: string): void;
    render_keyed({ block, parent_node, parent_nodes, snippet, initial_anchor_node, initial_mount_node, update_anchor_node, update_mount_node }: {
        block: Block;
        parent_node: string;
        parent_nodes: string;
        snippet: string;
        initial_anchor_node: string;
        initial_mount_node: string;
        update_anchor_node: string;
        update_mount_node: string;
    }): void;
    render_unkeyed({ block, parent_nodes, snippet, initial_anchor_node, initial_mount_node, update_anchor_node, update_mount_node }: {
        block: Block;
        parent_nodes: string;
        snippet: string;
        initial_anchor_node: string;
        initial_mount_node: string;
        update_anchor_node: string;
        update_mount_node: string;
    }): void;
}
