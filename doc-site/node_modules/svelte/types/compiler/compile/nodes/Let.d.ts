import Node from './shared/Node';
import Component from '../Component';
export default class Let extends Node {
    type: 'Let';
    name: string;
    value: string;
    names: string[];
    constructor(component: Component, parent: any, scope: any, info: any);
}
