'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var _reducers = require('../utils/reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var listenersById = function listenersById() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      path = _ref.path,
      payload = _ref.payload;

  switch (type) {
    case _constants.actionTypes.SET_LISTENER:
      return _extends({}, state, _defineProperty({}, payload.name, {
        name: payload.name,
        path: path
      }));
    case _constants.actionTypes.UNSET_LISTENER:
      return (0, _omit3.default)(state, [payload.name]);
    default:
      return state;
  }
};

var allListeners = function allListeners() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref2 = arguments[1];
  var type = _ref2.type,
      payload = _ref2.payload;

  switch (type) {
    case _constants.actionTypes.SET_LISTENER:
      return [].concat(_toConsumableArray(state), [payload.name]);
    case _constants.actionTypes.UNSET_LISTENER:
      return state.filter(function (name) {
        return name !== payload.name;
      });
    default:
      return state;
  }
};

var listenersReducer = (0, _reducers.combineReducers)({
  byId: listenersById,
  allIds: allListeners
});

exports.default = listenersReducer;