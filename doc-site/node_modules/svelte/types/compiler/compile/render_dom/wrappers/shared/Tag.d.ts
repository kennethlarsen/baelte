import Wrapper from './Wrapper';
import Renderer from '../../Renderer';
import Block from '../../Block';
import MustacheTag from '../../../nodes/MustacheTag';
import RawMustacheTag from '../../../nodes/RawMustacheTag';
export default class Tag extends Wrapper {
    node: MustacheTag | RawMustacheTag;
    constructor(renderer: Renderer, block: Block, parent: Wrapper, node: MustacheTag | RawMustacheTag);
    rename_this_method(block: Block, update: ((value: string) => string)): {
        init: string;
    };
}
