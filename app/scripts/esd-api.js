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
      var data = $.xml2json(xmlResponse).data.row;

      //set to empty array in case we get 0 results.
      if (data === undefined) data = [];
      //wrap data in array in case we only get one result.
      if (!Array.isArray(data)) data = [data];

      callback(data);
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
