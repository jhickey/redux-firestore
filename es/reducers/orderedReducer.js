'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _first2 = require('lodash/first');

var _first3 = _interopRequireDefault(_first2);

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = orderedReducer;

var _constants = require('../constants');

var _reducers = require('../utils/reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GET_SUCCESS = _constants.actionTypes.GET_SUCCESS,
    LISTENER_RESPONSE = _constants.actionTypes.LISTENER_RESPONSE,
    CLEAR_DATA = _constants.actionTypes.CLEAR_DATA;

function updateDocInOrdered(state, action) {
  var itemToAdd = (0, _first3.default)(action.payload.ordered);
  var subcollection = (0, _first3.default)(action.meta.subcollections);
  var storeUnderKey = action.meta.storeAs || action.meta.collection;

  return _extends({}, state, _defineProperty({}, storeUnderKey, (0, _reducers.updateItemInArray)(state[storeUnderKey] || [], action.meta.doc, function (item) {
    return (0, _reducers.updateObject)(item, subcollection ? _defineProperty({}, subcollection.collection, action.payload.ordered) : itemToAdd);
  })));
}

function orderedReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case GET_SUCCESS:
    case LISTENER_RESPONSE:
      if (!action.payload || !action.payload.ordered) {
        return state;
      }

      if (action.meta.doc) {
        return updateDocInOrdered(state, action);
      }
      return _extends({}, state, _defineProperty({}, action.meta.storeAs || action.meta.collection, action.payload.ordered));
    case CLEAR_DATA:
      if (action.preserve) {
        return (0, _pick3.default)(state, action.preserve);
      }
      return state;
    default:
      return state;
  }
}