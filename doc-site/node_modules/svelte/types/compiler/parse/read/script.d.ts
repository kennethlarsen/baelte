import { Parser } from '../index';
import { Node } from '../../interfaces';
export default function read_script(parser: Parser, start: number, attributes: Node[]): {
    start: number;
    end: number;
    context: any;
    content: any;
};
