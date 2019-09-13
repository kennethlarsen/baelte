import { Node, Ast, ParserOptions } from '../interfaces';
export declare class Parser {
    readonly template: string;
    readonly filename?: string;
    readonly customElement: boolean;
    index: number;
    stack: Node[];
    html: Node;
    css: Node[];
    js: Node[];
    meta_tags: {};
    constructor(template: string, options: ParserOptions);
    current(): Node;
    acorn_error(err: any): void;
    error({ code, message }: {
        code: string;
        message: string;
    }, index?: number): void;
    eat(str: string, required?: boolean, message?: string): boolean;
    match(str: string): boolean;
    match_regex(pattern: RegExp): string;
    allow_whitespace(): void;
    read(pattern: RegExp): string;
    read_identifier(): string;
    read_until(pattern: RegExp): string;
    require_whitespace(): void;
}
export default function parse(template: string, options?: ParserOptions): Ast;
