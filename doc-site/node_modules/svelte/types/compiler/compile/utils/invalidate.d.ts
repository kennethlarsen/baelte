import Component from '../Component';
import MagicString from 'magic-string';
import { Node } from '../../interfaces';
import { Scope } from './scope';
export declare function invalidate(component: Component, scope: Scope, code: MagicString, node: Node, names: Set<string>): void;
