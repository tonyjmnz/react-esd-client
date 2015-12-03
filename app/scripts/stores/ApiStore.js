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

var formatStates = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.State, label:obj.State};
  });
  return opts;
};

var formatOrgTypes = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.type, label:obj.type};
  });
  return opts;
};

var formatCities = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.city, label:obj.city};
  });
  return opts;
};

var formatCounties = function(options) {
  var opts = options.map(function(obj) {
    return {value:obj.CountyName, label:obj.CountyName};
  });

  //workaround, removing duplicates from county list...
  /*var uniqueBuff = [];
  var uniqueArr = [];
  opts.forEach(function(el) {
    if (uniqueBuff.indexOf(el.value.toLowerCase()) === -1) {
      uniqueBuff.push(el.value.toLowerCase());
      uniqueArr.push(el);
    }
  });*/

  return opts;
};

var formatTabs = function(tabsResponse) {
  var tabs = tabsResponse.map(function(obj) {
    return obj.Tab;
  });

  return tabs;
};

var formatGeneral = function(generalResponse) {
  return generalResponse;
};

var formatLocations = function(locationsResponse) {
  return locationsResponse;
};

var formatPeople = function(peopleResponse) {
  var site = peopleResponse.site;
  site = site.map(function(pplSite) {
    if (!pplSite.person) {
      return pplSite;
    }

    if (!Array.isArray(pplSite.person)) {
      pplSite.person = [pplSite.person];
    }

    pplSite.person = pplSite.person.map(function(person) {
      return {
        name: person.honorific + ' ' + person.fName + ' ' + person.mName + ' ' + person.lName + ' ' + person.suffix,
        role: person.role,
      };
    });

    return pplSite;
  });

  peopleResponse.site = site;

  return peopleResponse;
};

var formatTreatment = function(treatmentResponse) {
  return treatmentResponse;
};

var formatTraining = function(trainingResponse) {
  return trainingResponse;
};

var formatFacilities = function(facilitiesResponse) {
  return facilitiesResponse;
};

var formatEquipment = function(equipmentResponse) {
  return equipmentResponse;
};

var formatPhysicians = function(physiciansResponse) {
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
      APIData.searchResults = action.data.map(function(obj) {
        delete obj.$;
        return obj;
      });
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
