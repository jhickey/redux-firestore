'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var _reducers = require('../utils/reducers');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var CLEAR_ERRORS = _constants.actionTypes.CLEAR_ERRORS,
    CLEAR_ERROR = _constants.actionTypes.CLEAR_ERROR,
    LOGIN_ERROR = _constants.actionTypes.LOGIN_ERROR,
    LISTENER_ERROR = _constants.actionTypes.LISTENER_ERROR,
    ERROR = _constants.actionTypes.ERROR;

var errorsAllIds = function errorsAllIds() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref = arguments[1];
  var meta = _ref.meta,
      type = _ref.type;

  if (!meta || !meta.id) {
    return state;
  }
  switch (type) {
    case LOGIN_ERROR:
    case ERROR:
      return [].concat(_toConsumableArray(state), [meta.id]);
    case CLEAR_ERRORS:
      return [];
    case CLEAR_ERROR:
      return state.filter(function (lId) {
        return lId !== meta.id;
      });
    default:
      return state;
  }
};

var errorsByQuery = function errorsByQuery() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref2 = arguments[1];
  var meta = _ref2.meta,
      payload = _ref2.payload,
      type = _ref2.type;

  if (!meta || !meta.id) {
    return state;
  }
  switch (type) {
    case LOGIN_ERROR:
    case ERROR:
      return _extends({}, state, _defineProperty({}, meta.id, payload));
    case LISTENER_ERROR:
      return _extends({}, state, _defineProperty({}, (0, _reducers.pathFromMeta)(meta), payload));
    case CLEAR_ERRORS:
      return [];
    case CLEAR_ERROR:
      return state.filter(function (lId) {
        return lId !== payload.id;
      });
    default:
      return state;
  }
};

var errorsReducer = (0, _reducers.combineReducers)({
  byQuery: errorsByQuery,
  allIds: errorsAllIds
});

exports.default = errorsReducer;