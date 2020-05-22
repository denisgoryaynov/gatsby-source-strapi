'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('gatsby-source-filesystem'),
    createRemoteFileNode = _require.createRemoteFileNode;

var isImage = function isImage(obj) {
  // image fields have a mime property among other
  // maybe should find a better test
  return obj && Object.prototype.hasOwnProperty.call(obj, 'mime');
};

var isObject = function isObject(obj) {
  return obj && Object.prototype.toString.apply(obj) === '[object Object]';
};

var extractFields = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(apiURL, store, cache, createNode, createNodeId, touchNode, auth, item) {
    var fileNodeID, mediaDataCacheKey, cacheMediaData, itemUpdatedAt, source_url, fileNode, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _key, field;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!isImage(item)) {
              _context.next = 23;
              break;
            }

            fileNodeID = void 0;
            // using field on the cache key for multiple image field

            mediaDataCacheKey = 'strapi-media-' + item.id;
            _context.next = 5;
            return cache.get(mediaDataCacheKey);

          case 5:
            cacheMediaData = _context.sent;
            itemUpdatedAt = item.updatedAt || item.updated_at;

            // If we have cached media data and it wasn't modified, reuse
            // previously created file node to not try to redownload

            if (cacheMediaData && itemUpdatedAt === cacheMediaData.updatedAt) {
              fileNodeID = cacheMediaData.fileNodeID;
              touchNode({ nodeId: cacheMediaData.fileNodeID });
            }

            // If we don't have cached data, download the file

            if (fileNodeID) {
              _context.next = 22;
              break;
            }

            _context.prev = 9;

            // full media url
            source_url = '' + (item.url.startsWith('http') ? '' : apiURL) + item.url;
            _context.next = 13;
            return createRemoteFileNode({
              url: source_url,
              store: store,
              cache: cache,
              createNode: createNode,
              createNodeId: createNodeId,
              auth: auth,
              name: item.hash,
              ext: item.ext
            });

          case 13:
            fileNode = _context.sent;

            if (!fileNode) {
              _context.next = 18;
              break;
            }

            fileNodeID = fileNode.id;

            _context.next = 18;
            return cache.set(mediaDataCacheKey, {
              fileNodeID: fileNodeID,
              updatedAt: itemUpdatedAt
            });

          case 18:
            _context.next = 22;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](9);

          case 22:

            if (fileNodeID) {
              item.localFile___NODE = fileNodeID;
            }

          case 23:
            if (!Array.isArray(item)) {
              _context.next = 52;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 27;
            _iterator = (0, _getIterator3.default)(item);

          case 29:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 36;
              break;
            }

            key = _step.value;
            _context.next = 33;
            return extractFields(apiURL, store, cache, createNode, createNodeId, touchNode, auth, key);

          case 33:
            _iteratorNormalCompletion = true;
            _context.next = 29;
            break;

          case 36:
            _context.next = 42;
            break;

          case 38:
            _context.prev = 38;
            _context.t1 = _context['catch'](27);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 42:
            _context.prev = 42;
            _context.prev = 43;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 45:
            _context.prev = 45;

            if (!_didIteratorError) {
              _context.next = 48;
              break;
            }

            throw _iteratorError;

          case 48:
            return _context.finish(45);

          case 49:
            return _context.finish(42);

          case 50:
            _context.next = 80;
            break;

          case 52:
            if (!isObject(item)) {
              _context.next = 80;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 56;
            _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(item));

          case 58:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 66;
              break;
            }

            _key = _step2.value;
            field = item[_key];
            _context.next = 63;
            return extractFields(apiURL, store, cache, createNode, createNodeId, touchNode, auth, field);

          case 63:
            _iteratorNormalCompletion2 = true;
            _context.next = 58;
            break;

          case 66:
            _context.next = 72;
            break;

          case 68:
            _context.prev = 68;
            _context.t2 = _context['catch'](56);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t2;

          case 72:
            _context.prev = 72;
            _context.prev = 73;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 75:
            _context.prev = 75;

            if (!_didIteratorError2) {
              _context.next = 78;
              break;
            }

            throw _iteratorError2;

          case 78:
            return _context.finish(75);

          case 79:
            return _context.finish(72);

          case 80:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[9, 20], [27, 38, 42, 50], [43,, 45, 49], [56, 68, 72, 80], [73,, 75, 79]]);
  }));

  return function extractFields(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

// Downloads media from image type fields
exports.downloadMediaFiles = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref3) {
    var entities = _ref3.entities,
        apiURL = _ref3.apiURL,
        store = _ref3.store,
        cache = _ref3.cache,
        createNode = _ref3.createNode,
        createNodeId = _ref3.createNodeId,
        touchNode = _ref3.touchNode,
        auth = _ref3.jwtToken;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', _promise2.default.all(entities.map(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(entity) {
                var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context2.prev = 3;
                        _iterator3 = (0, _getIterator3.default)(entity);

                      case 5:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                          _context2.next = 12;
                          break;
                        }

                        item = _step3.value;
                        _context2.next = 9;
                        return extractFields(apiURL, store, cache, createNode, createNodeId, touchNode, auth, item);

                      case 9:
                        _iteratorNormalCompletion3 = true;
                        _context2.next = 5;
                        break;

                      case 12:
                        _context2.next = 18;
                        break;

                      case 14:
                        _context2.prev = 14;
                        _context2.t0 = _context2['catch'](3);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context2.t0;

                      case 18:
                        _context2.prev = 18;
                        _context2.prev = 19;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                          _iterator3.return();
                        }

                      case 21:
                        _context2.prev = 21;

                        if (!_didIteratorError3) {
                          _context2.next = 24;
                          break;
                        }

                        throw _iteratorError3;

                      case 24:
                        return _context2.finish(21);

                      case 25:
                        return _context2.finish(18);

                      case 26:
                        return _context2.abrupt('return', entity);

                      case 27:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined, [[3, 14, 18, 26], [19,, 21, 25]]);
              }));

              return function (_x10) {
                return _ref4.apply(this, arguments);
              };
            }())));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x9) {
    return _ref2.apply(this, arguments);
  };
}();