var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

  /**
   * @param  {string} text
   */
  search: function(params) {
    AppDispatcher.dispatch({
      actionType: AppConstants.APP_DO_SEARCH,
      params: params
    });
  }
};

module.exports = AppActions;
