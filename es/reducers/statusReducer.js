'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timestampsReducer = exports.requestedReducer = exports.requestingReducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var _reducers = require('../utils/reducers');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var START = _constants.actionTypes.START,
    SET = _constants.actionTypes.SET,
    NO_VALUE = _constants.actionTypes.NO_VALUE;
var requestingReducer = exports.requestingReducer = function requestingReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      path = _ref.path;

  switch (type) {
    case START:
      return _extends({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)(path), true));
    case NO_VALUE:
    case SET:
      return _extends({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)(path), false));
    default:
      return state;
  }
};

var requestedReducer = exports.requestedReducer = function requestedReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref2 = arguments[1];
  var type = _ref2.type,
      path = _ref2.path;

  switch (type) {
    case START:
      return _extends({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)(path), false));
    case NO_VALUE:
    case SET:
      return _extends({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)(path), true));
    default:
      return state;
  }
};

var timestampsReducer = exports.timestampsReducer = function timestampsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref3 = arguments[1];
  var type = _ref3.type,
      path = _ref3.path;

  switch (type) {
    case START:
    case NO_VALUE:
    case SET:
      return _extends({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)(path), Date.now()));
    default:
      return state;
  }
};

exports.default = (0, _reducers.combineReducers)({
  requesting: requestingReducer,
  requested: requestedReducer,
  timestamps: timestampsReducer
});