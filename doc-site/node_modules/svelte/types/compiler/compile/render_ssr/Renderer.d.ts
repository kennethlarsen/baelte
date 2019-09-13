import { AppendTarget, CompileOptions } from '../../interfaces';
import { INode } from '../nodes/interfaces';
export interface RenderOptions extends CompileOptions {
    locate: (c: number) => {
        line: number;
        column: number;
    };
}
export default class Renderer {
    has_bindings: boolean;
    code: string;
    targets: AppendTarget[];
    append(code: string): void;
    render(nodes: INode[], options: RenderOptions): void;
}
