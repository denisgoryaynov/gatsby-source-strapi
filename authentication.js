'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fp = require('lodash/fp');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var loginData = _ref2.loginData,
        reporter = _ref2.reporter,
        apiURL = _ref2.apiURL;
    var validIndentifier, validPassword, authenticationActivity, loginResponse;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validIndentifier = (0, _fp.has)('identifier', loginData) && loginData.identifier.length !== 0;
            validPassword = (0, _fp.has)('password', loginData) && loginData.password.length !== 0;

            if (!(validIndentifier && validPassword)) {
              _context.next = 17;
              break;
            }

            authenticationActivity = reporter.activityTimer('Authenticate Strapi User');

            authenticationActivity.start();

            // Make API request.
            _context.prev = 5;
            _context.next = 8;
            return _axios2.default.post(apiURL + '/auth/local', loginData);

          case 8:
            loginResponse = _context.sent;


            authenticationActivity.end();

            if (!(0, _fp.has)('data', loginResponse)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', loginResponse.data.jwt);

          case 12:
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](5);

            reporter.panic('Strapi authentication error: ' + _context.t0);

          case 17:
            return _context.abrupt('return', null);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 14]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();