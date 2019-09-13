export { compile, parse, preprocess, VERSION } from './types/compiler/index';

  export interface Node {
    start: number;
    end: number;
    type: string;
    [propName: string]: any;
  }

  export type WalkerContext = {
    skip: () => void;
  };

  export type WalkerListener = (
    this: WalkerContext,
    node: Node,
    parent?: Node,
    prop?: string,
    index?: number
  ) => void;

  export interface WalkerOptions {
    enter?: WalkerListener;
    leave?: WalkerListener;
  }

  export function walk(ast: Node, options: WalkerOptions): void;

