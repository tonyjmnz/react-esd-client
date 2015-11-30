var $ = require('jquery');
require('jquery-xml2json');

var apiURL = "http://people.rit.edu/dmgics/754/23/proxy.php";

var getOrganizations = function(params, callback) {
    var path = "/Organizations";
    AJAXRequest(path, params, callback);
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
}

module.exports = {
  getOrganizations: getOrganizations,
  getOrgTypes: getOrgTypes,
  getStates: getStates,
  getCities: getCities,
  getCounties: getCounties
};
