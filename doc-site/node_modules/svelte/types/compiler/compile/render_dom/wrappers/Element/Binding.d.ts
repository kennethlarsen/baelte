import Binding from '../../../nodes/Binding';
import ElementWrapper from '../Element';
import Block from '../../Block';
export default class BindingWrapper {
    node: Binding;
    parent: ElementWrapper;
    object: string;
    handler: {
        uses_context: boolean;
        mutation: string;
        contextual_dependencies: Set<string>;
        snippet?: string;
    };
    snippet: string;
    is_readonly: boolean;
    needs_lock: boolean;
    constructor(block: Block, node: Binding, parent: ElementWrapper);
    get_dependencies(): Set<string>;
    is_readonly_media_attribute(): boolean;
    render(block: Block, lock: string): void;
}
