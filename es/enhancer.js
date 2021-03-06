'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirestore = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

var _createFirestoreInstance = require('./createFirestoreInstance');

var _createFirestoreInstance2 = _interopRequireDefault(_createFirestoreInstance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var firestoreInstance = void 0;

exports.default = function (firebaseInstance, otherConfig) {
  return function (next) {
    return function (reducer, initialState, middleware) {
      var store = next(reducer, initialState, middleware);

      var configs = _extends({}, _constants.defaultConfig, otherConfig);

      firestoreInstance = (0, _createFirestoreInstance2.default)(firebaseInstance.firebase_ || firebaseInstance, configs, store.dispatch);

      store.firestore = firestoreInstance;

      return store;
    };
  };
};

var getFirestore = exports.getFirestore = function getFirestore() {
  if (!firestoreInstance) {
    throw new Error('Firebase instance does not yet exist. Check your compose function.');
  }

  return firestoreInstance;
};