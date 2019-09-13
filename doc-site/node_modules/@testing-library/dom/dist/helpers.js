"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDocument = getDocument;
exports.newMutationObserver = newMutationObserver;
exports.setTimeout = exports.setImmediate = exports.clearTimeout = void 0;

var _mutationobserverShim = _interopRequireDefault(require("@sheerun/mutationobserver-shim"));

const globalObj = typeof window === 'undefined' ? global : window; // we only run our tests in node, and setImmediate is supported in node.
// istanbul ignore next

function setImmediatePolyfill(fn) {
  return globalObj.setTimeout(fn, 0);
}

const clearTimeoutFn = globalObj.clearTimeout; // istanbul ignore next

exports.clearTimeout = clearTimeoutFn;
const setImmediateFn = globalObj.setImmediate || setImmediatePolyfill;
exports.setImmediate = setImmediateFn;
const setTimeoutFn = globalObj.setTimeout;
exports.setTimeout = setTimeoutFn;

function newMutationObserver(onMutation) {
  const MutationObserverConstructor = typeof window !== 'undefined' && typeof window.MutationObserver !== 'undefined' ? window.MutationObserver : _mutationobserverShim.default;
  return new MutationObserverConstructor(onMutation);
}

function getDocument() {
  /* istanbul ignore if */
  if (typeof window === 'undefined') {
    throw new Error('Could not find default container');
  }

  return window.document;
}