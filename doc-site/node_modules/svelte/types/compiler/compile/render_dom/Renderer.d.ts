import Block from './Block';
import { CompileOptions } from '../../interfaces';
import Component from '../Component';
import FragmentWrapper from './wrappers/Fragment';
import CodeBuilder from '../utils/CodeBuilder';
export default class Renderer {
    component: Component;
    options: CompileOptions;
    blocks: Array<Block | string>;
    readonly: Set<string>;
    meta_bindings: CodeBuilder;
    binding_groups: string[];
    block: Block;
    fragment: FragmentWrapper;
    file_var: string;
    locate: (c: number) => {
        line: number;
        column: number;
    };
    constructor(component: Component, options: CompileOptions);
}
