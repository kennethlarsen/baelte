import Component from '../Component';
import Node from './shared/Node';
import Element from './Element';
import Text from './Text';
import Expression from './shared/Expression';
import TemplateScope from './shared/TemplateScope';
export default class Attribute extends Node {
    type: 'Attribute';
    start: number;
    end: number;
    scope: TemplateScope;
    component: Component;
    parent: Element;
    name: string;
    is_spread: boolean;
    is_true: boolean;
    is_static: boolean;
    is_synthetic: boolean;
    expression?: Expression;
    chunks: Array<Text | Expression>;
    dependencies: Set<string>;
    constructor(component: any, parent: any, scope: any, info: any);
    get_dependencies(): string[];
    get_value(block: any): any;
    get_static_value(): string | true;
    should_cache(): boolean;
}
