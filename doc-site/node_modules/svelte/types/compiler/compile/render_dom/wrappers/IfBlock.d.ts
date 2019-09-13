import Wrapper from './shared/Wrapper';
import Renderer from '../Renderer';
import Block from '../Block';
import EachBlock from '../../nodes/EachBlock';
import IfBlock from '../../nodes/IfBlock';
import ElseBlock from '../../nodes/ElseBlock';
import FragmentWrapper from './Fragment';
declare class IfBlockBranch extends Wrapper {
    block: Block;
    fragment: FragmentWrapper;
    dependencies?: string[];
    condition?: string;
    snippet?: string;
    is_dynamic: boolean;
    var: any;
    constructor(renderer: Renderer, block: Block, parent: IfBlockWrapper, node: IfBlock | ElseBlock, strip_whitespace: boolean, next_sibling: Wrapper);
}
export default class IfBlockWrapper extends Wrapper {
    node: IfBlock;
    branches: IfBlockBranch[];
    needs_update: boolean;
    var: string;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: EachBlock, strip_whitespace: boolean, next_sibling: Wrapper);
    render(block: Block, parent_node: string, parent_nodes: string): void;
    render_compound(block: Block, parent_node: string, _parent_nodes: string, dynamic: any, { name, anchor, has_else, if_name, has_transitions }: {
        name: any;
        anchor: any;
        has_else: any;
        if_name: any;
        has_transitions: any;
    }, detaching: any): void;
    render_compound_with_outros(block: Block, parent_node: string, _parent_nodes: string, dynamic: any, { name, anchor, has_else, has_transitions }: {
        name: any;
        anchor: any;
        has_else: any;
        has_transitions: any;
    }, detaching: any): void;
    render_simple(block: Block, parent_node: string, _parent_nodes: string, dynamic: any, { name, anchor, if_name, has_transitions }: {
        name: any;
        anchor: any;
        if_name: any;
        has_transitions: any;
    }, detaching: any): void;
}
export {};
