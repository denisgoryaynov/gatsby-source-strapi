'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var apiURL = _ref2.apiURL,
        contentType = _ref2.contentType,
        singleType = _ref2.singleType,
        jwtToken = _ref2.jwtToken,
        queryLimit = _ref2.queryLimit,
        reporter = _ref2.reporter;

    var apiBase, apiEndpoint, _ref3, data;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Define API endpoint.
            apiBase = singleType ? apiURL + '/' + singleType : apiURL + '/' + (0, _pluralize2.default)(contentType);
            apiEndpoint = apiBase + '?_limit=' + queryLimit;


            reporter.info('Starting to fetch data from Strapi - ' + apiEndpoint);

            _context.prev = 3;
            _context.next = 6;
            return (0, _axios2.default)(apiEndpoint, addAuthorizationHeader({}, jwtToken));

          case 6:
            _ref3 = _context.sent;
            data = _ref3.data;
            return _context.abrupt('return', (0, _lodash.castArray)(data).map(clean));

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](3);

            reporter.panic('Failed to fetch data from Strapi', _context.t0);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 11]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Remove fields starting with `_` symbol.
 *
 * @param {object} item - Entry needing clean
 * @returns {object} output - Object cleaned
 */
var clean = function clean(item) {
  (0, _lodash.forEach)(item, function (value, key) {
    if (key === '__v') {
      // Remove mongo's __v
      delete item[key];
    } else if (key === '_id') {
      // Rename mongo's "_id" key to "id".
      delete item[key];
      item.id = value;
    } else if ((0, _lodash.startsWith)(key, '__')) {
      // Gatsby reserves double-underscore prefixes – replace prefix with "strapi"
      delete item[key];
      item['strapi_' + key.slice(2)] = value;
    } else if ((0, _lodash.isObject)(value)) {
      item[key] = clean(value);
    }
  });

  return item;
};

var addAuthorizationHeader = function addAuthorizationHeader(options, token) {
  if (token) {
    (0, _lodash.set)(options, 'headers.Authorization', 'Bearer ' + token);
  }

  return options;
};