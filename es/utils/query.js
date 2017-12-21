'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataByIdSnapshot = exports.orderedFromSnap = exports.getQueryConfigs = exports.getQueryConfig = exports.detachListener = exports.attachListener = exports.firestoreRef = undefined;

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _trim2 = require('lodash/trim');

var _trim3 = _interopRequireDefault(_trim2);

var _size2 = require('lodash/size');

var _size3 = _interopRequireDefault(_size2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var addWhereToRef = function addWhereToRef(ref, where) {
  if (!(0, _isArray3.default)(where)) {
    throw new Error('where parameter must be an array');
  }
  if ((0, _isString3.default)(where[0])) {
    return where.length > 1 ? ref.where.apply(ref, _toConsumableArray(where)) : ref.where(where[0]);
  }
  return where.reduce(function (acc, whereArgs) {
    if (!(0, _isArray3.default)(whereArgs)) {
      throw new Error('Where currently only supports arrays. Each option must be an Array of arguments to pass to where.');
    }
    return whereArgs.length > 1 ? acc.where.apply(acc, _toConsumableArray(whereArgs)) : acc.where(whereArgs);
  }, ref);
};

var addOrderByToRef = function addOrderByToRef(ref, orderBy) {
  if (!(0, _isArray3.default)(orderBy) && !(0, _isString3.default)(orderBy)) {
    throw new Error('orderBy parameter must be an array or string');
  }
  if ((0, _isString3.default)(orderBy)) {
    return ref.orderBy(orderBy);
  }
  return orderBy.reduce(function (acc, orderByArgs) {
    if ((0, _isString3.default)(orderByArgs)) {
      return acc.orderBy(orderByArgs);
    } else if ((0, _isArray3.default)(orderByArgs)) {
      return orderByArgs.length > 1 ? acc.orderBy.apply(acc, _toConsumableArray(orderByArgs)) : acc.orderBy(orderByArgs[0]);
    }
    throw new Error('orderBy currently only supports arrays. Each option must be an Array of arguments to pass to orderBy.');
  }, ref);
};

var firestoreRef = exports.firestoreRef = function firestoreRef(firebase, dispatch, meta) {
  if (!firebase.firestore) {
    throw new Error('Firestore must be required and initalized.');
  }
  var collection = meta.collection,
      doc = meta.doc,
      subcollections = meta.subcollections,
      where = meta.where,
      orderBy = meta.orderBy,
      limit = meta.limit;

  var ref = firebase.firestore().collection(collection);

  if (doc) {
    ref = ref.doc(doc);
  }
  if (subcollections) {
    (0, _forEach3.default)(subcollections, function (subcollection) {
      if (subcollection.collection) {
        ref = ref.collection(subcollection.collection);
      }
      if (subcollection.doc) {
        ref = ref.doc(subcollection.doc);
      }
      if (subcollection.where) {
        ref = addWhereToRef(ref, subcollection.where);
      }
      if (subcollection.orderBy) {
        ref = addOrderByToRef(ref, subcollection.orderBy);
      }
      if (subcollection.limit) {
        ref = ref.limit(subcollection.limit);
      }
    });
  }
  if (where) {
    ref = addWhereToRef(ref, where);
  }
  if (orderBy) {
    ref = addOrderByToRef(ref, orderBy);
  }
  if (limit) {
    ref = ref.limit(limit);
  }
  return ref;
};

var whereToStr = function whereToStr(where) {
  return (0, _isString3.default)(where[0]) ? where.join(':') : where.map(whereToStr);
};

var getQueryName = function getQueryName(meta) {
  var collection = meta.collection,
      doc = meta.doc,
      subcollections = meta.subcollections,
      where = meta.where;

  if (!collection) {
    throw new Error('Collection is required to build query name');
  }
  var basePath = collection;
  if (doc) {
    basePath = basePath.concat('/' + doc);
  }
  if (subcollections) {
    var mappedCollections = subcollections.map(function (subcollection) {
      return subcollection.collection.concat(subcollection.doc ? '/' + subcollection.doc : '');
    });
    basePath = basePath + '/' + mappedCollections.join('/');
  }
  if (where) {
    if (!(0, _isArray3.default)(where)) {
      throw new Error('Where must be an array');
    }
    return basePath.concat('/' + whereToStr(where));
  }
  return basePath;
};

var attachListener = exports.attachListener = function attachListener(firebase, dispatch, meta, unsubscribe) {
  if (!meta) {
    throw new Error('Meta data is required to attach listener.');
  }
  if (!(0, _has3.default)(firebase, '_.listeners')) {
    throw new Error('Internal Firebase object required to attach listener. Confirm that reduxFirestore enhancer was added when you were creating your store');
  }
  var name = getQueryName(meta);

  if (!firebase._.listeners[name]) {
    firebase._.listeners[name] = unsubscribe;
  }

  dispatch({
    type: _constants.actionTypes.SET_LISTENER,
    meta: meta,
    payload: { name: name }
  });

  return firebase._.listeners;
};

var detachListener = exports.detachListener = function detachListener(firebase, dispatch, meta) {
  var name = getQueryName(meta);
  if (firebase._.listeners[name]) {
    firebase._.listeners[name]();
    delete firebase._.listeners[name];
  } else {
    console.warn('Listener does not exist for ' + name);
  }

  dispatch({
    type: _constants.actionTypes.UNSET_LISTENER,
    meta: meta,
    payload: { name: name }
  });
};

var queryStrToObj = function queryStrToObj(queryPathStr) {
  var pathArr = (0, _trim3.default)(queryPathStr, ['/']).split('/');

  var _pathArr = _toArray(pathArr),
      collection = _pathArr[0],
      doc = _pathArr[1],
      subCollection = _pathArr[2],
      other = _pathArr.slice(3);

  return {
    collection: collection,
    doc: doc,
    subCollection: subCollection,
    other: other
  };
};

var getQueryConfig = exports.getQueryConfig = function getQueryConfig(query) {
  if ((0, _isString3.default)(query)) {
    return queryStrToObj(query);
  }
  if ((0, _isObject3.default)(query)) {
    if (!query.collection && !query.doc) {
      throw new Error('Collection and/or Doc are required parameters within query definition object');
    }
    return query;
  }
  throw new Error('Invalid Path Definition: Only Strings and Objects are accepted.');
};

var getQueryConfigs = exports.getQueryConfigs = function getQueryConfigs(queries) {
  if ((0, _isArray3.default)(queries)) {
    return queries.map(getQueryConfig);
  }
  if ((0, _isString3.default)(queries)) {
    return queryStrToObj(queries);
  }
  if ((0, _isObject3.default)(queries)) {
    return [getQueryConfig(queries)];
  }
  throw new Error('Querie(s) must be an Array or a string');
};

var orderedFromSnap = exports.orderedFromSnap = function orderedFromSnap(snap) {
  var ordered = [];
  if (snap.data && snap.exists) {
    var obj = (0, _isObject3.default)(snap.data()) ? _extends({ id: snap.id }, snap.data() || snap.data) : { id: snap.id, data: snap.data() };
    ordered.push(obj);
  } else if (snap.forEach) {
    snap.forEach(function (doc) {
      var obj = (0, _isObject3.default)(doc.data()) ? _extends({ id: doc.id }, doc.data() || doc.data) : { id: doc.id, data: doc.data() };
      ordered.push(obj);
    });
  }
  return ordered;
};

var dataByIdSnapshot = exports.dataByIdSnapshot = function dataByIdSnapshot(snap) {
  var data = {};
  if (snap.data && snap.exists) {
    data[snap.id] = snap.data();
  } else if (snap.forEach) {
    snap.forEach(function (doc) {
      data[doc.id] = doc.data() || doc;
    });
  }
  return (0, _size3.default)(data) ? data : null;
};