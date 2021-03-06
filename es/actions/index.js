'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firestoreActions = undefined;

var _firestore = require('./firestore');

var firestoreActions = _interopRequireWildcard(_firestore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.firestoreActions = firestoreActions;
exports.default = { firestoreActions: firestoreActions };