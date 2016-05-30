angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {


  $scope.doSomething = function() {
    console.log("I did something!");
  };


})



.controller('DashCtrl', function($scope, DatabaseService, $ionicSlideBoxDelegate) {

  $scope.items = [];


  DatabaseService.readAll('games').then(
    function(data){
      $scope.items = data;
      $ionicSlideBoxDelegate.update();
  });


  $scope.viewDetails = function($game) {
    console.log($game);
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
