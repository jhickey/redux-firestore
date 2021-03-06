'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CALL_FIRESTORE = exports.middleware = exports.actionTypes = exports.constants = exports.getFirestore = exports.actions = exports.createFirestoreInstance = exports.reduxFirestore = exports.enhancer = exports.firestoreReducer = exports.reducer = exports.version = undefined;

var _enhancer = require('./enhancer');

var _enhancer2 = _interopRequireDefault(_enhancer);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _actions = require('./actions');

var _createFirestoreInstance = require('./createFirestoreInstance');

var _createFirestoreInstance2 = _interopRequireDefault(_createFirestoreInstance);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = exports.version = '0.2.5';

exports.reducer = _reducer2.default;
exports.firestoreReducer = _reducer2.default;
exports.enhancer = _enhancer2.default;
exports.reduxFirestore = _enhancer2.default;
exports.createFirestoreInstance = _createFirestoreInstance2.default;
exports.actions = _actions.firestoreActions;
exports.getFirestore = _enhancer.getFirestore;
exports.constants = _constants2.default;
exports.actionTypes = _constants.actionTypes;
exports.middleware = _middleware2.default;
exports.CALL_FIRESTORE = _middleware.CALL_FIRESTORE;
exports.default = {
  version: version,
  reducer: _reducer2.default,
  firestoreReducer: _reducer2.default,
  enhancer: _enhancer2.default,
  reduxFirestore: _enhancer2.default,
  createFirestoreInstance: _createFirestoreInstance2.default,
  actions: _actions.firestoreActions,
  getFirestore: _enhancer.getFirestore,
  constants: _constants2.default,
  actionTypes: _constants.actionTypes,
  middleware: _middleware2.default,
  CALL_FIRESTORE: _middleware.CALL_FIRESTORE
};