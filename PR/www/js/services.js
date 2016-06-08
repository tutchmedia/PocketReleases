angular.module('starter.services', [])



.service('DatabaseService', function($http, Backand, $ionicLoading){    

      var baseUrl = '/1/objects/';

      return {

        // read all rows in the object
          readAll: function(objectName) { 
            $ionicLoading.show(); 
            return $http({
              method: 'GET',
              url: Backand.getApiUrl() + baseUrl + objectName
           }).then(
          function(response) {
              return response.data.data;
            });
          },


          readFiltered: function(objectName, filter) { 
            $ionicLoading.show(); 
            return $http({
              method: 'GET',
              url: Backand.getApiUrl() + baseUrl + objectName + '?filter=' + encodeURIComponent(filter)
           }).then(
          function(response) {
              return response.data.data;
            });
          },

        // read one row with given id
          readOne: function(objectName, id) {
            $ionicLoading.show(); 
          return $http({
            method: 'GET',
            url: Backand.getApiUrl() + baseUrl + objectName 
                + '/' + id
          }).then(
            function(response) {
              return response.data;
            });
          }
      };
    })


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
