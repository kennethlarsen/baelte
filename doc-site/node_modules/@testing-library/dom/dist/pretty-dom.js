"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettyDOM = prettyDOM;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _prettyFormat = _interopRequireDefault(require("pretty-format"));

const {
  DOMElement,
  DOMCollection
} = _prettyFormat.default.plugins;

function prettyDOM(htmlElement, maxLength, options) {
  if (htmlElement.documentElement) {
    htmlElement = htmlElement.documentElement;
  }

  const debugContent = (0, _prettyFormat.default)(htmlElement, (0, _extends2.default)({
    plugins: [DOMElement, DOMCollection],
    printFunctionName: false,
    highlight: true
  }, options));
  return maxLength !== undefined && htmlElement.outerHTML.length > maxLength ? `${debugContent.slice(0, maxLength)}...` : debugContent;
}