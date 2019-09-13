"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoles = getRoles;
exports.logRoles = logRoles;
exports.getImplicitAriaRoles = getImplicitAriaRoles;
exports.prettyRoles = prettyRoles;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ariaQuery = require("aria-query");

var _queryHelpers = require("./query-helpers");

const elementRoleList = buildElementRoleList(_ariaQuery.elementRoles);

function getImplicitAriaRoles(currentNode) {
  for (const _ref of elementRoleList) {
    const {
      selector,
      roles
    } = _ref;

    if (currentNode.matches(selector)) {
      return [...roles];
    }
  }

  return [];
}

function buildElementRoleList(elementRolesMap) {
  function makeElementSelector({
    name,
    attributes = []
  }) {
    return `${name}${attributes.map(({
      name: attributeName,
      value
    }) => value ? `[${attributeName}=${value}]` : `[${attributeName}]`).join('')}`;
  }

  function getSelectorSpecificity({
    attributes = []
  }) {
    return attributes.length;
  }

  let result = [];

  for (const [element, roles] of elementRolesMap.entries()) {
    result = [...result, {
      selector: makeElementSelector(element),
      roles: Array.from(roles),
      specificity: getSelectorSpecificity(element)
    }];
  }

  return result.sort(function ({
    specificity: leftSpecificity
  }, {
    specificity: rightSpecificity
  }) {
    return rightSpecificity - leftSpecificity;
  });
}

function getRoles(container) {
  function flattenDOM(node) {
    return [node, ...Array.from(node.children).reduce((acc, child) => [...acc, ...flattenDOM(child)], [])];
  }

  return flattenDOM(container).reduce((acc, node) => {
    const roles = getImplicitAriaRoles(node);
    return roles.reduce((rolesAcc, role) => Array.isArray(rolesAcc[role]) ? (0, _extends2.default)({}, rolesAcc, {
      [role]: [...rolesAcc[role], node]
    }) : (0, _extends2.default)({}, rolesAcc, {
      [role]: [node]
    }), acc);
  }, {});
}

function prettyRoles(container) {
  const roles = getRoles(container);
  return Object.entries(roles).map(([role, elements]) => {
    const delimiterBar = '-'.repeat(50);
    const elementsString = elements.map(el => (0, _queryHelpers.debugDOM)(el.cloneNode(false))).join('\n\n');
    return `${role}:\n\n${elementsString}\n\n${delimiterBar}`;
  }).join('\n');
}

function logRoles(container) {
  // eslint-disable-next-line no-console
  console.log(prettyRoles(container));
}