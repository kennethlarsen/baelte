import { Parser } from '../index';
import { Node } from '../../interfaces';
export default function read_style(parser: Parser, start: number, attributes: Node[]): {
    start: number;
    end: number;
    attributes: Node[];
    children: any;
    content: {
        start: number;
        end: number;
        styles: string;
    };
};
