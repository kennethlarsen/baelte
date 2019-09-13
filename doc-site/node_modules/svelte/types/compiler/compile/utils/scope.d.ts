import { Node } from '../../interfaces';
export declare function create_scopes(expression: Node): {
    map: WeakMap<object, any>;
    scope: Scope;
    globals: Map<string, Node>;
};
export declare class Scope {
    parent: Scope;
    block: boolean;
    declarations: Map<string, Node>;
    initialised_declarations: Set<string>;
    constructor(parent: Scope, block: boolean);
    add_declaration(node: Node): void;
    find_owner(name: string): Scope;
    has(name: string): boolean;
}
export declare function extract_names(param: Node): any[];
export declare function extract_identifiers(param: Node): Node[];
