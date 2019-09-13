import Wrapper from '../shared/Wrapper';
import Renderer from '../../Renderer';
import Block from '../../Block';
import InlineComponent from '../../../nodes/InlineComponent';
import FragmentWrapper from '../Fragment';
import TemplateScope from '../../../nodes/shared/TemplateScope';
export default class InlineComponentWrapper extends Wrapper {
    var: string;
    slots: Map<string, {
        block: Block;
        scope: TemplateScope;
        fn?: string;
    }>;
    node: InlineComponent;
    fragment: FragmentWrapper;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: InlineComponent, strip_whitespace: boolean, next_sibling: Wrapper);
    render(block: Block, parent_node: string, parent_nodes: string): void;
}
