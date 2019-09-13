import { Node } from '../../interfaces';
export default function flatten_reference(node: Node): {
    name: any;
    nodes: any[];
    parts: any[];
    keypath: string;
};
