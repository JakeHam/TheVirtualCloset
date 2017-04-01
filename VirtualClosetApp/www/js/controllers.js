angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {}; 

 $scope.getItems = function(){
    // get from backend
    // DELETE below if search is done on Backend
    // set val to the value of the ev target
    
    //if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
  }

})
.controller('logoutCtrl', function($scope) {
    alert("got to logout controller");
 })
 .controller('loginCtrl', function($scope, $ionicPopup, $state) {
     var myPopup = $ionicPopup.show({
     templateUrl: 'templates/menu/login.html',
     scope: $scope
   });

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
     // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };
 })

 .controller('SearchCtrl', function($scope, $stateParams) {
   // getItems() {
   //  }
    //alert("got to search controller");
 })

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
