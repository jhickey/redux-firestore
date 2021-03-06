'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduxFirestoreMiddleware = exports.CALL_FIRESTORE = undefined;

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function callFirestore(firebaseInstance, callInfoObj) {
  var method = callInfoObj.method;
  var modelArgs = callInfoObj.modelArgs,
      methodArgs = callInfoObj.methodArgs;

  if (!(0, _isArray3.default)(modelArgs)) modelArgs = [modelArgs];
  if (!(0, _isArray3.default)(methodArgs)) methodArgs = [methodArgs];
  if (!firebaseInstance || !firebaseInstance.firestore) {
    throw new Error('firestore is not a Firebase namespace');
  }

  return !methodArgs ? firebaseInstance.firestore()[method] : firebaseInstance.firestore()[method].apply(firebaseInstance, methodArgs);
}

var CALL_FIRESTORE = exports.CALL_FIRESTORE = 'CALL_FIRESTORE';

var typesMap = {
  get: [_constants.actionTypes.GET_REQUEST, _constants.actionTypes.GET_SUCCESS, _constants.actionTypes.GET_FAILURE]
};

var reduxFirestoreMiddleware = exports.reduxFirestoreMiddleware = function reduxFirestoreMiddleware(firestore) {
  return function (store) {
    return function (next) {
      return function (action) {
        var callAPI = action.type === CALL_FIRESTORE ? action : undefined;
        if (typeof callAPI === 'undefined') return next(action);

        var method = callAPI.method;


        if (typeof method === 'function') method = method(store.getState());

        if (typeof method !== 'string') throw new Error('Specify a method.');

        var args = callAPI.args;

        var types = typesMap[method];

        if (!Array.isArray(types) || types.length !== 3) {
          throw new Error('Expected an array of three action types.');
        }

        if (!types.every(function (type) {
          return typeof type === 'string';
        })) {
          throw new Error('Expected action types to be strings.');
        }

        function actionWith(data) {
          var finalAction = _extends({}, action, data);
          delete finalAction[CALL_FIRESTORE];
          return finalAction;
        }

        var _types = _slicedToArray(types, 3),
            requestType = _types[0],
            successType = _types[1],
            failureType = _types[2];

        next({ type: requestType });
        var callInfoObj = { method: method };
        return callFirestore(firestore, callInfoObj).then(function (response) {
          return next({ response: response, method: method, args: args, type: successType });
        }).catch(function (error) {
          return next(actionWith({
            type: failureType,
            error: error.message || error || 'Something bad happened'
          }));
        });
      };
    };
  };
};

exports.default = reduxFirestoreMiddleware;