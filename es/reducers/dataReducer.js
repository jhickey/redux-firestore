'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _setWith2 = require('lodash/fp/setWith');

var _setWith3 = _interopRequireDefault(_setWith2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

exports.default = dataReducer;

var _constants = require('../constants');

var _reducers = require('../utils/reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLEAR_DATA = _constants.actionTypes.CLEAR_DATA,
    GET_SUCCESS = _constants.actionTypes.GET_SUCCESS,
    LISTENER_RESPONSE = _constants.actionTypes.LISTENER_RESPONSE;
function dataReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case GET_SUCCESS:
    case LISTENER_RESPONSE:
      var meta = action.meta,
          payload = action.payload;

      if (!payload || payload.data === undefined) {
        return state;
      }

      var docName = meta.subcollections ? meta.subcollections.slice(-1)[0].doc : meta.doc;
      var data = docName ? (0, _get3.default)(payload.data, docName) : payload.data;

      var previousData = (0, _get3.default)(state, (0, _reducers.pathFromMeta)(meta));

      if (!previousData || meta.subcollections) {
        return (0, _setWith3.default)(Object, (0, _reducers.pathFromMeta)(meta), data, state);
      }

      var mergedData = (0, _assign3.default)(previousData, data);

      return (0, _setWith3.default)(Object, (0, _reducers.pathFromMeta)(meta), mergedData, state);
    case CLEAR_DATA:
      if (action.preserve) {
        return (0, _pick3.default)(state, action.preserve);
      }
      return {};
    default:
      return state;
  }
}