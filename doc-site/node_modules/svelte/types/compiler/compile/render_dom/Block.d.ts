import CodeBuilder from '../utils/CodeBuilder';
import Renderer from './Renderer';
import Wrapper from './wrappers/shared/Wrapper';
export interface BlockOptions {
    parent?: Block;
    name: string;
    type: string;
    renderer?: Renderer;
    comment?: string;
    key?: string;
    bindings?: Map<string, {
        object: string;
        property: string;
        snippet: string;
        store: string;
        tail: string;
    }>;
    dependencies?: Set<string>;
}
export default class Block {
    parent?: Block;
    renderer: Renderer;
    name: string;
    type: string;
    comment?: string;
    wrappers: Wrapper[];
    key: string;
    first: string;
    dependencies: Set<string>;
    bindings: Map<string, {
        object: string;
        property: string;
        snippet: string;
        store: string;
        tail: string;
    }>;
    builders: {
        init: CodeBuilder;
        create: CodeBuilder;
        claim: CodeBuilder;
        hydrate: CodeBuilder;
        mount: CodeBuilder;
        measure: CodeBuilder;
        fix: CodeBuilder;
        animate: CodeBuilder;
        intro: CodeBuilder;
        update: CodeBuilder;
        outro: CodeBuilder;
        destroy: CodeBuilder;
    };
    event_listeners: string[];
    maintain_context: boolean;
    has_animation: boolean;
    has_intros: boolean;
    has_outros: boolean;
    has_intro_method: boolean;
    has_outro_method: boolean;
    outros: number;
    aliases: Map<string, string>;
    variables: Map<string, string>;
    get_unique_name: (name: string) => string;
    has_update_method: boolean;
    autofocus: string;
    constructor(options: BlockOptions);
    assign_variable_names(): void;
    add_dependencies(dependencies: Set<string>): void;
    add_element(name: string, render_statement: string, claim_statement: string, parent_node: string, no_detach?: boolean): void;
    add_intro(local?: boolean): void;
    add_outro(local?: boolean): void;
    add_animation(): void;
    add_variable(name: string, init?: string): void;
    alias(name: string): string;
    child(options: BlockOptions): Block;
    get_contents(local_key?: string): string;
    render_listeners(chunk?: string): void;
    toString(): string;
}
