"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = waitWrapper;

var _waitForExpect = _interopRequireDefault(require("wait-for-expect"));

var _config = require("./config");

function wait(callback = () => {}, {
  timeout = 4500,
  interval = 50
} = {}) {
  return (0, _waitForExpect.default)(callback, timeout, interval);
}

function waitWrapper(...args) {
  return (0, _config.getConfig)().asyncWrapper(() => wait(...args));
}