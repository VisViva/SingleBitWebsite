angular.module('HistoryService', []).factory('History', ['$location', function($location) {

  var history = this;

  history.lastRoute = '';

  history.saveAsLastRoute = function(){
    history.lastRoute = $location.path().substr(1);
  };

  history.getLastRoute = function(){
    return history.lastRoute;
  };

  history.historyExists = function(){
    return (history.lastRoute == '') ? false : true;
  }

  return {

    // Interaction with history

    saveAsLastRoute : function(){
      history.saveAsLastRoute();
    },

    getLastRoute : function(){
      return history.getLastRoute();
    },

    historyExists : function(){
      return history.historyExists();
    }
  }
}]);
