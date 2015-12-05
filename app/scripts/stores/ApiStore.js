var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var APIData = {
  orgTypes: [],
  states: [],
  cities: [],
  counties: [],
  searchResults: [],
  general: {},
  locations: {},
  treatment: {},
  training: {},
  facilities: {},
  equipment: {},
  physicians: {},
  people: {},
};

//converts a property of an object into an array
// "" => []
// {} => [{}]
// [{},{},{}] => [{},{},{}]
var arrayify = function(obj, property) {
  if (!obj) {
    obj = {}
  }

  if (!obj[property]) {
    obj[property] = [];
    return obj;
  }

  if (!Array.isArray(obj[property])) {
    obj[property] = [obj[property]];
  }
  return obj;
};

//format the states in a k=>v pair for the select
var formatStates = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.State, label:obj.State};
  });
  return opts;
};

//format the org types in a k=>v pair for the select
var formatOrgTypes = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.type, label:obj.type};
  });
  return opts;
};

//format the cities in a k=>v pair for the select
var formatCities = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.city, label:obj.city};
  });
  return opts;
};

//format the counties in a k=>v pair for the select
var formatCounties = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.CountyName, label:obj.CountyName};
  });

  return opts;
};

//format the tabs from an object array into a string array
var formatTabs = function(tabsResponse) {
  var tabs = tabsResponse.map(function(obj) {
    return obj.Tab;
  });
  return tabs;
};

//in case we need to modify the general info
var formatGeneral = function(generalResponse) {
  return generalResponse;
};

//formats the people info for showing in the tabbed view
var formatPeople = function(peopleResponse) {
  peopleResponse = arrayify(peopleResponse, 'site');

  peopleResponse.site = peopleResponse.site.map(function(pplSite) {

    pplSite = arrayify(pplSite, 'person');
    pplSite.person = pplSite.person.map(function(person) {
      return {
        name: person.honorific + ' ' + person.fName + ' ' + person.mName + ' ' +
          person.lName + ' ' + person.suffix,
        role: person.role,
      };
    });

    return pplSite;
  });

  return peopleResponse;
};

//formats the locations info for showing in the tabbed view
var formatLocations = function(locationsResponse) {
  locationsResponse = arrayify(locationsResponse, 'location');
  return locationsResponse;
};

//formats the treatment info for showing in the tabbed view
var formatTreatment = function(treatmentResponse) {
  treatmentResponse = arrayify(treatmentResponse, 'treatment');
  return treatmentResponse;

};

//formats the training info for showing in the tabbed view
var formatTraining = function(trainingResponse) {
  trainingResponse = arrayify(trainingResponse, 'training');
  return trainingResponse;

};

//formats the facilities info for showing in the tabbed view
var formatFacilities = function(facilitiesResponse) {
  facilitiesResponse = arrayify(facilitiesResponse, 'facility');
  return facilitiesResponse;

};

//formats the equipment info for showing in the tabbed view
var formatEquipment = function(equipmentResponse) {
  equipmentResponse = arrayify(equipmentResponse, 'equipment');
  return equipmentResponse;

};

//formats the physicians info for showing in the tabbed view
var formatPhysicians = function(physiciansResponse) {
  physiciansResponse = arrayify(physiciansResponse, 'physician');

  physiciansResponse.physician =
    physiciansResponse.physician.map(function(phys) {
      return {
        name: phys.fName + ' ' + phys.mName + ' ' + phys.lName,
        license: phys.license,
        phone: phys.phone,
      };
    });

  return physiciansResponse;
};

var ApiStore = assign({}, EventEmitter.prototype, {

  getData: function() {
    return APIData.searchResults;
  },

  getStates: function() {
    return APIData.states;
  },

  getOrgTypes: function() {
    return APIData.orgTypes;
  },

  getCities: function() {
    return APIData.cities;
  },

  getCounties: function() {
    return APIData.counties;
  },

  getTabs: function() {
    return APIData.tabs;
  },

  getGeneral: function() {
    return APIData.general;
  },

  getLocations: function() {
    return APIData.locations;
  },

  getPhysicians: function() {
    return APIData.physicians;
  },

  getTraining: function() {
    return APIData.training;
  },

  getEquipment: function() {
    return APIData.equipment;
  },

  getTreatment: function() {
    return APIData.treatment;
  },

  getFacilities: function() {
    return APIData.facilities;
  },

  getPeople: function() {
    return APIData.people;
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

  switch(action.actionType) {

    case AppConstants.NEW_DATA:
      APIData.searchResults = action.data;
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_STATES:
      APIData.states = formatStates(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_ORGS:
      APIData.orgTypes = formatOrgTypes(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_CITIES:
      APIData.cities = formatCities(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_COUNTIES:
      APIData.counties = formatCounties(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_TABS:
      APIData.tabs = formatTabs(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_GENERAL:
      APIData.general = formatGeneral(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_LOCATIONS:
      APIData.locations = formatLocations(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_PEOPLE:
      APIData.people = formatPeople(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_TREATMENT:
      APIData.treatment = formatTreatment(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_TRAINING:
      APIData.training = formatTraining(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_FACILITIES:
      APIData.facilities = formatFacilities(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_EQUIPMENT:
      APIData.equipment = formatEquipment(action.data);
      ApiStore.emitChange();
      break;

    case AppConstants.NEW_PHYSICIANS:
      APIData.physicians = formatPhysicians(action.data);
      ApiStore.emitChange();
      break;

    default:

  }
});

module.exports = ApiStore;
