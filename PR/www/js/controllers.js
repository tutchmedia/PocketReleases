angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {


  $scope.doSomething = function() {
    console.log("I did something!");
  };


})



.controller('DashCtrl', function($scope, DatabaseService, $ionicSlideBoxDelegate, $stateParams, $state, $ionicLoading) {

  $scope.items = [];
  $scope.games = [];


  // Featured Slider
  DatabaseService.readFiltered('games', '[{"fieldName":"featured","operator":"equals","value":"true"}]').then(
    function(data){
      $scope.items = data;
      $ionicSlideBoxDelegate.update();
      $ionicLoading.hide();
  });

  //Latest Games

  DatabaseService.readFiltered('games', '[{"fieldName":"featured","operator":"equals","value":"false"}]').then(
    function(data){
      $scope.games = data;
      $ionicSlideBoxDelegate.update();
      $ionicLoading.hide();
  });


  // Pull to Refresh
  $scope.doRefresh = function() {

    // Featured Slider
    DatabaseService.readFiltered('games', '[{"fieldName":"featured","operator":"equals","value":"true"}]').then(
      function(data){
        $scope.items = data;
        $ionicSlideBoxDelegate.update();
        $ionicLoading.hide();
    });

    //Latest Games

    DatabaseService.readFiltered('games', '[{"fieldName":"featured","operator":"equals","value":"false"}]').then(
      function(data){
        $scope.games = data;
        $ionicSlideBoxDelegate.update();
        $ionicLoading.hide();
    }).finally(function() {
         // Stop the ion-refresher from spinning
         $scope.$broadcast('scroll.refreshComplete');
       });
    };




  $scope.viewGameDetails = function(game) {
    console.log(game);
    $state.go("tab.game-detail", {id: game.id});
  }

})


.controller('GameDetailCtrl', function($scope, $stateParams, DatabaseService, $ionicLoading) {

  $scope.liked = false;


  $scope.game = [];

  console.log($stateParams);
  $scope.game = DatabaseService.readOne('games', $stateParams.id).then(
    function(data) {
      $scope.game = data;
      $ionicLoading.hide();
    });
})

.controller('ChatsCtrl', function($scope, DatabaseService, $ionicLoading) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.chats = Chats.all();

  $scope.games = [];

  $scope.game = DatabaseService.readAll('games').then(
    function(data) {
      $scope.games = data;
      $ionicLoading.hide();
    });



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
