"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAllByRole = queryAllByRole;
exports.findByRole = exports.findAllByRole = exports.getByRole = exports.getAllByRole = exports.queryByRole = void 0;

var _roleHelpers = require("../role-helpers");

var _allUtils = require("./all-utils");

function queryAllByRole(container, role, {
  exact = true,
  collapseWhitespace,
  trim,
  normalizer
} = {}) {
  const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
  const matchNormalizer = (0, _allUtils.makeNormalizer)({
    collapseWhitespace,
    trim,
    normalizer
  });
  return Array.from(container.querySelectorAll('*')).filter(node => {
    const isRoleSpecifiedExplicitly = node.hasAttribute('role');

    if (isRoleSpecifiedExplicitly) {
      return matcher(node.getAttribute('role'), node, role, matchNormalizer);
    }

    const implicitRoles = (0, _roleHelpers.getImplicitAriaRoles)(node);
    return implicitRoles.some(implicitRole => matcher(implicitRole, node, role, matchNormalizer));
  });
}

const getMultipleError = (c, role) => `Found multiple elements with the role "${role}"`;

const getMissingError = (container, role) => {
  const roles = (0, _roleHelpers.prettyRoles)(container);
  let roleMessage;

  if (roles.length === 0) {
    roleMessage = 'There are no available roles.';
  } else {
    roleMessage = `
Here are the available roles:

  ${roles.replace(/\n/g, '\n  ').replace(/\n\s\s\n/g, '\n\n')}
`.trim();
  }

  return `
Unable to find an element with the role "${role}"

${roleMessage}`.trim();
};

const [queryByRole, getAllByRole, getByRole, findAllByRole, findByRole] = (0, _allUtils.buildQueries)(queryAllByRole, getMultipleError, getMissingError);
exports.findByRole = findByRole;
exports.findAllByRole = findAllByRole;
exports.getByRole = getByRole;
exports.getAllByRole = getAllByRole;
exports.queryByRole = queryByRole;