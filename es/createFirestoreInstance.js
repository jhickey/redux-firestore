'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var _actions2 = require('./utils/actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createFirestoreInstance = function createFirestoreInstance(firebase, configs, dispatch) {
  var defaultInternals = { listeners: {} };

  var aliases = [{ action: _actions.firestoreActions.deleteRef, name: 'delete' }, { action: _actions.firestoreActions.setListener, name: 'onSnapshot' }];

  firebase._ = firebase._ ? _extends({}, firebase._, defaultInternals) : defaultInternals;

  var methods = (0, _actions2.mapWithFirebaseAndDispatch)(firebase, dispatch, _actions.firestoreActions, aliases);

  if (configs.helpersNamespace) {
    return _extends({}, firebase, firebase.firestore, _defineProperty({}, configs.helpersNamespace, methods));
  }
  return _extends({}, firebase, firebase.firestore, methods);
};

exports.default = createFirestoreInstance;