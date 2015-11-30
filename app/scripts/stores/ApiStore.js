var $ = require('jquery');
require('jquery-xml2json');

var apiURL = "http://people.rit.edu/dmgics/754/23/proxy.php";

// var getOrganizations = function(params, callback) {
//     var path = "/Organizations";
//     AJAXRequest(path, params, callback);
// };

// var getStates = function(callback) {
//   var path = "/States"
//   AJAXRequest(path, {}, callback);
// };

// var getOrgTypes = function(callback) {
//   var path = "/OrgTypes"
//   AJAXRequest(path, {}, callback);
// };

// var getCities = function(params, callback) {
//     var path = "/Cities";
//     AJAXRequest(path, params, callback);
// };

// var getCounties = function(params, callback) {
//     var path = "/Counties";
//     AJAXRequest(path, params, callback);
// };

// var AJAXRequest = function(path, params, callback) {
//   var queryStringify = function(path, params) {
//     var paramsString = '';
//     Object.keys(params).map(function(key) {
//       paramsString += key + '=' + escape(params[key]) + '&';
//     });
//     return {path: path + '?' + paramsString};
//   };


//   $.ajax({
//     type: "GET",
//     url: apiURL,
//     data: queryStringify(path, params),
//     dataType: "text",
//     success: function(xmlResponse) {
//       console.log('ajax response');
//       callback($.xml2json(xmlResponse).data.row);
//     }
//   });
// }

// module.exports = {
//   getOrganizations: getOrganizations,
//   getOrgTypes: getOrgTypes,
//   getStates: getStates,
//   getCities: getCities,
//   getCounties: getCounties
// };





/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _searchResults = {};


var AJAXRequest = function(path, params, callback) {
  var queryStringify = function(path, params) {
    var paramsString = '';
    Object.keys(params).map(function(key) {
      paramsString += key + '=' + escape(params[key]) + '&';
    });
    return {path: path + '?' + paramsString};
  };


  $.ajax({
    type: "GET",
    url: apiURL,
    data: queryStringify(path, params),
    dataType: "text",
    success: function(xmlResponse) {
      console.log('ajax response');
      callback($.xml2json(xmlResponse).data.row);
    }
  });
};

var setResults = function(data) {
  _searchResults = data;
};

var search = function(params, callback) {
  var path = "/Organizations";

  var storeData = function(data) {
    setResults(data);
    callback();
  };

  AJAXRequest(path, params, storeData);
};

var ApiStore = assign({}, EventEmitter.prototype, {

  getData:function() {
    return _searchResults;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {

    case TodoConstants.APP_DO_SEARCH:
      //create(text);
      var searchComplete = function() {
        ApiStore.emitChange();
      };

      search(action.params, searchComplete);
      break;
    /*case TodoConstants.APP_STATE_CHANGE_COMPLETE:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;*/


    default:
      // no op
  }
});

module.exports = ApiStore;
