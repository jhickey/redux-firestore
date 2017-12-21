'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsetListeners = exports.unsetListener = exports.setListeners = exports.setListener = exports.deleteRef = exports.update = exports.get = exports.set = exports.add = undefined;

var _invoke2 = require('lodash/invoke');

var _invoke3 = _interopRequireDefault(_invoke2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _actions = require('../utils/actions');

var _constants = require('../constants');

var _query = require('../utils/query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var add = exports.add = function add(firebase, dispatch, queryOption) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var meta = (0, _query.getQueryConfig)(queryOption);
  return (0, _actions.wrapInDispatch)(dispatch, {
    ref: (0, _query.firestoreRef)(firebase, dispatch, meta),
    method: 'add',
    meta: meta,
    args: args,
    types: [_constants.actionTypes.ADD_REQUEST, _constants.actionTypes.ADD_SUCCESS, _constants.actionTypes.ADD_FAILURE]
  });
};

var set = exports.set = function set(firebase, dispatch, queryOption) {
  for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    args[_key2 - 3] = arguments[_key2];
  }

  var meta = (0, _query.getQueryConfig)(queryOption);
  return (0, _actions.wrapInDispatch)(dispatch, {
    ref: (0, _query.firestoreRef)(firebase, dispatch, meta),
    method: 'set',
    meta: meta,
    args: args,
    types: [_constants.actionTypes.SET_REQUEST, _constants.actionTypes.SET_SUCCESS, _constants.actionTypes.SET_FAILURE]
  });
};

var get = exports.get = function get(firebase, dispatch, queryOption) {
  var meta = (0, _query.getQueryConfig)(queryOption);
  return (0, _actions.wrapInDispatch)(dispatch, {
    ref: (0, _query.firestoreRef)(firebase, dispatch, meta),
    method: 'get',
    meta: meta,
    types: [_constants.actionTypes.GET_REQUEST, {
      type: _constants.actionTypes.GET_SUCCESS,
      payload: function payload(snap) {
        var ordered = (0, _query.orderedFromSnap)(snap);
        var data = (0, _query.dataByIdSnapshot)(snap);
        return { data: data, ordered: ordered };
      }
    }, _constants.actionTypes.GET_FAILURE]
  });
};

var update = exports.update = function update(firebase, dispatch, queryOption) {
  for (var _len3 = arguments.length, args = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    args[_key3 - 3] = arguments[_key3];
  }

  var meta = (0, _query.getQueryConfig)(queryOption);
  return (0, _actions.wrapInDispatch)(dispatch, {
    ref: (0, _query.firestoreRef)(firebase, dispatch, meta),
    method: 'update',
    meta: meta,
    args: args,
    types: [_constants.actionTypes.UPDATE_REQUEST, _constants.actionTypes.UPDATE_SUCCESS, _constants.actionTypes.UPDATE_FAILURE]
  });
};

var deleteRef = exports.deleteRef = function deleteRef(firebase, dispatch, queryOption) {
  var meta = (0, _query.getQueryConfig)(queryOption);
  if (!meta.doc) {
    throw new Error('Only docs can be deleted');
  }
  return (0, _actions.wrapInDispatch)(dispatch, {
    ref: (0, _query.firestoreRef)(firebase, dispatch, meta),
    method: 'delete',
    meta: meta,
    types: [_constants.actionTypes.DELETE_REQUEST, _constants.actionTypes.DELETE_SUCCESS, _constants.actionTypes.DELETE_FAILURE]
  });
};

var setListener = exports.setListener = function setListener(firebase, dispatch, queryOpts, successCb, errorCb) {
  var meta = (0, _query.getQueryConfig)(queryOpts);
  var unsubscribe = (0, _query.firestoreRef)(firebase, dispatch, meta).onSnapshot(function (docData) {
    dispatch({
      type: _constants.actionTypes.LISTENER_RESPONSE,
      meta: meta,
      payload: {
        data: (0, _query.dataByIdSnapshot)(docData),
        ordered: (0, _query.orderedFromSnap)(docData),
        snapshot: docData
      }
    });
    if (successCb) {
      successCb(docData);
    }
  }, function (err) {
    (0, _invoke3.default)(console, 'error', err);
    dispatch({
      type: _constants.actionTypes.LISTENER_ERROR,
      meta: meta,
      payload: err
    });
    if (errorCb) {
      errorCb(err);
    }
  });
  (0, _query.attachListener)(firebase, dispatch, meta, unsubscribe);
};

var setListeners = exports.setListeners = function setListeners(firebase, dispatch, listeners) {
  if (!(0, _isArray3.default)(listeners)) {
    throw new Error('Listeners must be an Array of listener configs (Strings/Objects)');
  }
  return listeners.map(function (listener) {
    return setListener(firebase, dispatch, listener);
  });
};

var unsetListener = exports.unsetListener = function unsetListener(firebase, dispatch, opts) {
  return (0, _query.detachListener)(firebase, dispatch, (0, _query.getQueryConfig)(opts));
};

var unsetListeners = exports.unsetListeners = function unsetListeners(firebase, dispatch, listeners) {
  if (!(0, _isArray3.default)(listeners)) {
    throw new Error('Listeners must be an Array of listener configs (Strings/Objects)');
  }
  return listeners.map(function (listener) {
    return unsetListener(firebase, dispatch, listener);
  });
};

exports.default = {
  get: get,
  firestoreRef: _query.firestoreRef,
  add: add,
  update: update,
  setListener: setListener,
  setListeners: setListeners,
  unsetListener: unsetListener,
  unsetListeners: unsetListeners
};