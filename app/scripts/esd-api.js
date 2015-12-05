var $ = require('jquery');
require('jquery-xml2json');

var apiURL = require('./config').apiURL;

var getOrganizations = function(params, callback) {
    var path = "/Organizations";
    AJAXRequest(path, params, callback);
};

var getTabs = function(params, callback) {
    var path = "/Application/Tabs";
    AJAXRequest(path, params, callback);
};

var getGeneralInfo = function(params, callback) {
    var path = "/" + params.orgId +"/General";
    AJAXRequest(path, {}, callback, true);
};

var getLocationsInfo = function(params, callback) {
    var path = "/" + params.orgId +"/Locations";
    AJAXRequest(path, {}, callback, true);
};

var getPeopleInfo = function(params, callback) {
    var path = "/" + params.orgId +"/People";
    AJAXRequest(path, {}, callback, true);
};

var getTreatmentInfo = function(params, callback) {
    var path = "/" + params.orgId +"/Treatments";
    AJAXRequest(path, {}, callback, true);
};

var getTrainingInfo = function(params, callback) {
    var path = "/" + params.orgId +"/Training";
    AJAXRequest(path, {}, callback, true);
};

var getFacilitiesInfo = function(params, callback) {
    var path = "/" + params.orgId +"/Facilities";
    AJAXRequest(path, {}, callback, true);
};

var getEquipmentInfo = function(params, callback) {
    var path = "/" + params.orgId +"/Equipment";
    AJAXRequest(path, {}, callback, true);
};

var getPhysiciansInfo = function(params, callback) {
    var path = "/" + params.orgId +"/Physicians";
    AJAXRequest(path, {}, callback, true);
};

var getStates = function(callback) {
  var path = "/States"
  AJAXRequest(path, {}, callback);
};

var getOrgTypes = function(callback) {
  var path = "/OrgTypes"
  AJAXRequest(path, {}, callback);
};

var getCities = function(params, callback) {
    var path = "/Cities";
    AJAXRequest(path, params, callback);
};

var getCounties = function(params, callback) {
    var path = "/Counties";
    AJAXRequest(path, params, callback);
};

var AJAXRequest = function(path, params, callback, returnsObject) {
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
      var jsonResponse = $.xml2json(xmlResponse);
      //return just the data node or the rows
      var data = returnsObject ? jsonResponse.data : jsonResponse.data.row;

      //set to empty array in case we get 0 results.
      if (data === undefined) data = returnsObject ? {} : [];
      //wrap data in array in case we only get one result.
      if (!Array.isArray(data) && !returnsObject) data = [data];

      callback(data);
    }
  });
}

module.exports = {
  getOrganizations: getOrganizations,
  getOrgTypes: getOrgTypes,
  getStates: getStates,
  getCities: getCities,
  getCounties: getCounties,
  getTabs: getTabs,
  getGeneralInfo: getGeneralInfo,
  getLocationsInfo: getLocationsInfo,
  getPeopleInfo: getPeopleInfo,
  getTreatmentInfo: getTreatmentInfo,
  getTrainingInfo: getTrainingInfo,
  getFacilitiesInfo: getFacilitiesInfo,
  getEquipmentInfo: getEquipmentInfo,
  getPhysiciansInfo: getPhysiciansInfo,
};
