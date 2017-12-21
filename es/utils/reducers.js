'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.pathToArr = pathToArr;
exports.getSlashStrPath = getSlashStrPath;
exports.getDotStrPath = getDotStrPath;
exports.pathFromMeta = pathFromMeta;
exports.updateObject = updateObject;
exports.updateItemInArray = updateItemInArray;
function pathToArr(path) {
  return path ? path.split(/\//).filter(function (p) {
    return !!p;
  }) : [];
}

function getSlashStrPath(path) {
  return pathToArr(path).join('/');
}

function getDotStrPath(path) {
  return pathToArr(path).join('.');
}

var combineReducers = exports.combineReducers = function combineReducers(reducers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    return Object.keys(reducers).reduce(function (nextState, key) {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

function pathFromMeta(meta) {
  if (!meta) {
    throw new Error('Action meta is required to build path for reducers.');
  }
  var collection = meta.collection,
      doc = meta.doc,
      subcollections = meta.subcollections,
      storeAs = meta.storeAs;

  if (storeAs) {
    return storeAs;
  }
  if (!collection) {
    throw new Error('Collection is required to construct reducer path.');
  }
  var basePath = collection;
  if (doc) {
    basePath += '.' + doc;
  }
  if (!subcollections) {
    return basePath;
  }
  var mappedCollections = subcollections.map(pathFromMeta);
  return basePath.concat('.' + mappedCollections.join('.'));
}

function updateObject(oldObject, newValues) {
  return _extends({}, oldObject, newValues);
}

function updateItemInArray(array, itemId, updateItemCallback) {
  var updatedItems = array.map(function (item) {
    if (item.id !== itemId) {
      return item;
    }

    var updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
}