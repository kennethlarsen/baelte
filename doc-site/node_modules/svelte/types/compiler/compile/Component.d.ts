import MagicString from 'magic-string';
import Stats from '../Stats';
import { Scope } from './utils/scope';
import Stylesheet from './css/Stylesheet';
import Fragment from './nodes/Fragment';
import { Node, Ast, CompileOptions, Var, Warning } from '../interfaces';
import TemplateScope from './nodes/shared/TemplateScope';
import Slot from './nodes/Slot';
interface ComponentOptions {
    namespace?: string;
    tag?: string;
    immutable?: boolean;
    accessors?: boolean;
    preserveWhitespace?: boolean;
}
export default class Component {
    stats: Stats;
    warnings: Warning[];
    ignores: Set<string>;
    ignore_stack: Array<Set<string>>;
    ast: Ast;
    source: string;
    code: MagicString;
    name: string;
    compile_options: CompileOptions;
    fragment: Fragment;
    module_scope: Scope;
    instance_scope: Scope;
    instance_scope_map: WeakMap<Node, Scope>;
    component_options: ComponentOptions;
    namespace: string;
    tag: string;
    accessors: boolean;
    vars: Var[];
    var_lookup: Map<string, Var>;
    imports: Node[];
    module_javascript: string;
    javascript: string;
    hoistable_nodes: Set<Node>;
    node_for_declaration: Map<string, Node>;
    partly_hoisted: string[];
    fully_hoisted: string[];
    reactive_declarations: Array<{
        assignees: Set<string>;
        dependencies: Set<string>;
        node: Node;
        declaration: Node;
    }>;
    reactive_declaration_nodes: Set<Node>;
    has_reactive_assignments: boolean;
    injected_reactive_declaration_vars: Set<string>;
    helpers: Map<string, string>;
    globals: Map<string, string>;
    indirect_dependencies: Map<string, Set<string>>;
    file: string;
    locate: (c: number) => {
        line: number;
        column: number;
    };
    locator: (search: number, startIndex?: number) => {
        line: number;
        column: number;
    };
    stylesheet: Stylesheet;
    aliases: Map<string, string>;
    used_names: Set<string>;
    globally_used_names: Set<string>;
    slots: Map<string, Slot>;
    slot_outlets: Set<string>;
    constructor(ast: Ast, source: string, name: string, compile_options: CompileOptions, stats: Stats, warnings: Warning[]);
    add_var(variable: Var): void;
    add_reference(name: string): void;
    add_sourcemap_locations(node: Node): void;
    alias(name: string): string;
    helper(name: string): string;
    global(name: string): string;
    generate(result: string): {
        js: any;
        css: any;
        ast: Ast;
        warnings: Warning[];
        vars: {
            name: string;
            export_name: string;
            injected: boolean;
            module: boolean;
            mutated: boolean;
            reassigned: boolean;
            referenced: boolean;
            writable: boolean;
        }[];
        stats: {
            timings: {
                total: number;
            };
        };
    };
    get_unique_name(name: string): string;
    get_unique_name_maker(): (name: string) => string;
    error(pos: {
        start: number;
        end: number;
    }, e: {
        code: string;
        message: string;
    }): void;
    warn(pos: {
        start: number;
        end: number;
    }, warning: {
        code: string;
        message: string;
    }): void;
    extract_imports(content: any): void;
    extract_exports(content: any): void;
    extract_javascript(script: any): string;
    walk_module_js(): void;
    walk_instance_js_pre_template(): void;
    walk_instance_js_post_template(): void;
    track_mutations(): void;
    extract_reactive_store_references(): void;
    invalidate(name: any, value?: any): any;
    rewrite_props(get_insert: (variable: Var) => string): void;
    hoist_instance_declarations(): void;
    extract_reactive_declarations(): void;
    qualify(name: any): any;
    warn_if_undefined(name: string, node: any, template_scope: TemplateScope): void;
    push_ignores(ignores: any): void;
    pop_ignores(): void;
}
export {};
