angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicLoading, $state, $ionicHistory) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/menu/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };

    $ionicModal.fromTemplateUrl('templates/menu/logout.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the logout modal to close it
    $scope.closeLogout = function () {
      $scope.modal.hide();
    };

    // Open the logout modal
    $scope.logout = function () {
      $scope.modal.show();

    };

    // Perform the logout action
    $scope.doLogout = function () {
      firebase.auth().signOut().then(function () {
        console.log('Signed Out Firebase user');
        $ionicLoading.show({template: 'Logout successful!', noBackdrop: true, duration: 1000});
        $scope.closeLogout();

        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go("app.login");
      }, function (error) {
        console.error('Sign Out Error', error);
        $ionicLoading.show({template: 'Logout Unsuccessful!', noBackdrop: true, duration: 1000});
      });

    };

    $scope.backToMyCloset = function () {
      $scope.closeLogout();
    }


  })


  // Register controller
  .controller('registerCtrl', function ($scope, $ionicLoading, $state, $rootScope, $ionicHistory) {

    // Register button is pressed.
    $scope.register = function () {
      $scope.createUser($scope.email, $scope.password);
    }

    $scope.createUser = function (email, password) {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        $ionicLoading.show({template: 'Created Firebase User!', noBackdrop: true, duration: 1000});

        // Creating unique AccountId for current user.
        // The accountID is the email without the "@" and ".com" symbols.
        var user = firebase.auth().currentUser;
        var getUserEmail = user.email;
        $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');

        // Set the closet database structure.
        setCloset();

        // After successfully creating database template.
        // Navigate to the My Closet Page.
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go("app.mycloset");

      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        $ionicLoading.show({template: 'Creation of user unsuccessful! Try again!', noBackdrop: true, duration: 1000});
      });
    };

    // This function creates the myCloset object with the predefined structure.
    function setCloset() {
      var myCloset = {};
      myCloset.accountID = $rootScope.email;
      myCloset.Tops = [];
      myCloset.Pants = [];
      myCloset.Shoes = [];
      myCloset.Formal = [];
      myCloset.Jackets = [];
      myCloset.Accessories = [];
      addClosetToDatabase(myCloset);
    }

    // This function calls the firebase-database to add the "myCloset" object.
    function addClosetToDatabase(myCloset) {
      firebase.database().ref(myCloset.accountID).set({
        Tops: myCloset.Tops,
        Pants: myCloset.Pants,
        Shoes: myCloset.Shoes,
        Formal: myCloset.Formal,
        Jackets: myCloset.Jackets,
        Accessories: myCloset.Accessories
      });
    };

    $scope.backToLogin = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("app.login");
    }

  })

  // Login controller
  .controller('loginCtrl', function ($scope, $ionicLoading, $state, $rootScope, $ionicHistory) {
    $scope.loginToAccount = function () {
      console.log("Attempting firebase login with username: " + $scope.email + " | password: " + $scope.password);
      $scope.loginUser($scope.email, $scope.password).then(function () {
        // Check if currentUser is set (we were succesfully able to login)
        var user = firebase.auth().currentUser;
        if (!user) {
          // Show modal with description of events
          $ionicLoading.show({
            template: 'Login Unsuccessful! Check credentials, check connection or create user',
            noBackdrop: true,
            duration: 1000
          });
          $ionicHistory.nextViewOptions({
            disableBack: true
          });

          $state.go("app.login");
        } else {
          // If successful login, then currentUser is set and display event modal
          // Show modal with description of events

          // Retrieve the accountID for getting information as necessary.
          var getUserEmail = user.email;
          $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');

          // Navigate to MyCloset page.
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go("app.mycloset");
          $ionicLoading.show({template: 'Sucessful login with existing user', noBackdrop: true, duration: 1000});

        }
      });
    };

    $scope.loginUser = function (email, password) {
      return firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    };

    $scope.toRegisterPage = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("app.register");
    }
  })

  // myClosetCtrl controller
  .controller('myClosetCtrl', function ($scope, $ionicLoading, $state, $rootScope, Item, $ionicHistory) {

    $scope.init = function () {
      var user = firebase.auth().currentUser;
      if (!user) {
        // Show modal with description of events
        //$ionicLoading.show({ template: 'Please log in', noBackdrop: true, duration: 1000 });
        $state.go("app.login");
      } else {
        // If successful login, then currentUser is set and display event modal
        // Show modal with description of events
        createClosetItem('item1', 'img1', 'brand1', 'color1', 'Accessories');
        createClosetItem('item2', 'img2', 'brand2', 'color2', 'Accessories');

        createClosetItem('item3', 'img3', 'brand3', 'color3', 'Tops');
        createClosetItem('item4', 'img4', 'brand4', 'color4', 'Tops');

        createClosetItem('item5', 'img5', 'brand5', 'color5', 'Pants');
        createClosetItem('item6', 'img6', 'brand6', 'color6', 'Pants');

        createClosetItem('item7', 'img7', 'brand7', 'color7', 'Shoes');
        createClosetItem('item8', 'img8', 'brand8', 'color8', 'Shoes');

        createClosetItem('item9', 'img9', 'brand9', 'color9', 'Formal');
        createClosetItem('item10', 'img10', 'brand10', 'color10', 'Formal');

        createClosetItem('item11', 'img11', 'brand11', 'color11', 'Jackets');
        createClosetItem('item12', 'img12', 'brand12', 'color12', 'Jackets');
      }
    }
    $scope.init();

    // This function creates the item object with the predefined structure.
    function createClosetItem(itemName, itemImg, itemBrand, itemColor, itemCategory) {
      // Get accountID {email} for cur user.
      var user = firebase.auth().currentUser;
      var getUserEmail = user.email;
      $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');

      var itemObj = new Item(itemName, itemImg, itemBrand, itemColor);
      //getAllItems();
      //console.log($rootScope.completeContent);
      addItemToCloset(itemObj, itemCategory);
    }

    // This function calls the firebase-database to add the existing "myCloset" object.
    function addItemToCloset(itemObj, itemCategory) {
      var updates = {};
      updates[$rootScope.email + '/' + itemCategory + '/' + itemObj._name] = itemObj;
      return firebase.database().ref().update(updates);
    }


  })

  .factory('Item', function () {

    // The variable user is created when an instance of the factory is created
    // This is similar to a "contructor" in Java
    var item = function (name, img, brand, color) {
      // Public variables
      // These can be accessed by any controller that has the factory injected into it
      var _name = '';
      var _img = '';
      var _brand = '';
      var _color = '';

      // Private Functions
      // (these are only accessible within the factory itself)
      // This function is run upon initialization/load of the factory (it is called "init" for convention)
      function init() {
        _name = name;
        _img = img;
        _brand = brand;
        _color = color;
      }

      // Here the init function is called
      init();

      // Return factory instance
      return {
        // The return statements below make the functions declared within the service
        // available to each instance that is created. They are returned so that they may be accessed

        _name: name,
        _img: img,
        _brand: brand,
        _color: color
      }
    };
    return item;

  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];
  })

  .controller('MainCtrl', function ($scope, $cordovaCamera) {
    $scope.takeImage = function () {
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 250,
        targetHeight: 250,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.srcImage = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        // error
      });
    }
  })


  .controller('ClosetCtrl', function ($scope, $rootScope) {


    var user = firebase.auth().currentUser;
    var getUserEmail = user.email;
    $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');

    return firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {

      var tops = snapshot.val().Tops;
      $scope.finalTopsArr = {};
      for(var i =0; i< tops.size; i++){
        var top = tops[i];
        top.brand = tops[i]._brand;
        top.color = tops[i]._color;
        top.img = tops[i]._img;
        top.name = tops[i].name;

        finalTopsArr.push(top);
      }

      var pants = snapshot.val().Pants;
      $scope.finalPantsArr = {};
      for(var i =0; i< pants.size; i++){
        var pant = pants[i];
        pant.brand = pants[i]._brand;
        pant.color = pants[i]._color;
        pant.img = pants[i]._img;
        pant.name = pants[i].name;

        finalPantsArr.push(pant);
      }

      var shoes = snapshot.val().Shoes;
      $scope.finalShoesArr = {};
      for(var i =0; i< shoes.size; i++){
        var shoe = shoes[i];
        shoe.brand = shoes[i]._brand;
        shoe.color = shoes[i]._color;
        shoe.img = shoes[i]._img;
        shoe.name = shoes[i].name;

        finalShoesArr.push(shoe);
      }

      var formals = snapshot.val().Formal;
      $scope.finalFormalsArr = {};
      for(var i =0; i< formals.size; i++){
        var formal = formals[i];
        formal.brand = formals[i]._brand;
        formal.color = formals[i]._color;
        formal.img = formals[i]._img;
        formal.name = formals[i].name;

        finalFormalsArr.push(formal);
      }

      var jackets = snapshot.val().Jackets;
      $scope.finalJacketsArr = {};
      for(var i =0; i< jackets.size; i++){
        var jacket = jackets[i];
        jacket.brand = jackets[i]._brand;
        jacket.color = jackets[i]._color;
        jacket.img = jackets[i]._img;
        jackets.name = jackets[i].name;

        finalJacketsArr.push(jacket);
      }

      var accessories = snapshot.val().Accessories;
      $scope.finalAccessoriesArr = {};
      for(var i =0; i< accessories.size; i++){
        var accessory = accessories[i];
        accessory.brand = accessories[i]._brand;
        accessory.color = accessories[i]._color;
        accessory.img = accessories[i]._img;
        accessory.name = accessories[i].name;

        finalAccessoriesArr.push(accessory);
      }

      $scope.first = true;
      $scope.second = false;
      $scope.outfitList = {};

      $scope.checkFlag = function() {
          if($rootScope.flag == true){
            if($scope.first) {
              $scope.buttonType = "ion-button full outline";
              $ionicLoading.show({template: 'Added!', noBackdrop: true, duration: 1000});
              $scope.second = true;
              $scope.first = false;
              scope.outfitList.push($scope.top);
            }
            else if ($scope.second){
              $scope.buttonType = "button button-full";
              $ionicLoading.show({template: 'Deleted!', noBackdrop: true, duration: 1000});
              $scope.second = false;
              $scope.first = true;
              scope.outfitList.remove($scope.top);
            }
          }
          else{
            $ionicLoading.show({ template: 'SELECTED!', noBackdrop: true, duration: 1000 });
          }
      }

    });


  })


  .controller('OutfitsCtrl', function($scope, $ionicPopup, $rootScope) {
    $scope.showPopup = function() {
      $scope.data = {}
      var outfitPopup = $ionicPopup.show({
        template: '<input type = "text" ng-modal = "data.outfit" placeholder="Outfit Name">',
        title: 'New Outfit',
        scope: $scope,
        cssClass: 'closetbutton',

        buttons: [
          {text: 'Cancel'},
          {
            text: 'Add Items',
            onTap: function (e) {
              $rootScope.flag = true;
              location.href = "#/app/mycloset";
            }
          },

        ],

      });
      outfitPopup.then(function (res) {
        console.log('Tapped!', res);
      });
    };

    $scope.selectItem= function(){

    }

  })


  .controller('PlaylistCtrl', function ($scope, $stateParams) {

  });
