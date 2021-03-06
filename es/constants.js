'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var actionsPrefix = exports.actionsPrefix = '@@reduxFirestore';

var actionTypes = exports.actionTypes = {
  START: actionsPrefix + '/START',
  ERROR: actionsPrefix + '/ERROR',
  CLEAR_DATA: actionsPrefix + '/CLEAR_DATA',
  CLEAR_ERROR: actionsPrefix + '/CLEAR_ERROR',
  CLEAR_ERRORS: actionsPrefix + '/CLEAR_ERRORS',
  SET_LISTENER: actionsPrefix + '/SET_LISTENER',
  UNSET_LISTENER: actionsPrefix + '/UNSET_LISTENER',
  GET_REQUEST: actionsPrefix + '/GET_REQUEST',
  GET_SUCCESS: actionsPrefix + '/GET_SUCCESS',
  GET_FAILURE: actionsPrefix + '/GET_FAILURE',
  SET_REQUEST: actionsPrefix + '/SET_REQUEST',
  SET_SUCCESS: actionsPrefix + '/SET_SUCCESS',
  SET_FAILURE: actionsPrefix + '/SET_FAILURE',
  ADD_REQUEST: actionsPrefix + '/ADD_REQUEST',
  ADD_SUCCESS: actionsPrefix + '/ADD_SUCCESS',
  ADD_FAILURE: actionsPrefix + '/ADD_FAILURE',
  UPDATE_REQUEST: actionsPrefix + '/UPDATE_REQUEST',
  UPDATE_SUCCESS: actionsPrefix + '/UPDATE_SUCCESS',
  UPDATE_FAILURE: actionsPrefix + '/UPDATE_FAILURE',
  DELETE_REQUEST: actionsPrefix + '/DELETE_REQUEST',
  DELETE_SUCCESS: actionsPrefix + '/DELETE_SUCCESS',
  DELETE_FAILURE: actionsPrefix + '/DELETE_FAILURE',
  ATTACH_LISTENER: actionsPrefix + '/ATTACH_LISTENER',
  LISTENER_RESPONSE: actionsPrefix + '/LISTENER_RESPONSE',
  LISTENER_ERROR: actionsPrefix + '/LISTENER_ERROR',
  ON_SNAPSHOT_REQUEST: actionsPrefix + '/ON_SNAPSHOT_REQUEST',
  ON_SNAPSHOT_SUCCESS: actionsPrefix + '/ON_SNAPSHOT_SUCCESS',
  ON_SNAPSHOT_FAILURE: actionsPrefix + '/ON_SNAPSHOT_FAILURE'
};

var defaultConfig = exports.defaultConfig = {
  enableLogging: false,
  enhancerNamespace: 'firestore',
  helpersNamespace: null
};

exports.default = {
  actionsPrefix: actionsPrefix,
  actionTypes: actionTypes,
  defaultConfig: defaultConfig
};