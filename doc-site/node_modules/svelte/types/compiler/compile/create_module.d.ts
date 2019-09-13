import { ModuleFormat, Node } from '../interfaces';
interface Export {
    name: string;
    as: string;
}
export default function create_module(code: string, format: ModuleFormat, name: string, banner: string, sveltePath: string, helpers: Array<{
    name: string;
    alias: string;
}>, globals: Array<{
    name: string;
    alias: string;
}>, imports: Node[], module_exports: Export[], source: string): string;
export {};
