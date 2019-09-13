import Node from './shared/Node';
import Expression from './shared/Expression';
import Component from '../Component';
import TemplateScope from './shared/TemplateScope';
export default class Binding extends Node {
    type: 'Binding';
    name: string;
    expression: Expression;
    is_contextual: boolean;
    obj: string;
    prop: string;
    is_readonly: boolean;
    constructor(component: Component, parent: any, scope: TemplateScope, info: any);
    is_readonly_media_attribute(): boolean;
}
