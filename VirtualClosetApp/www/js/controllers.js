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
        $state.go('app.mycloset', {
          'fromRegistrationPage': true
        });

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
      myCloset.Tops = "";
      myCloset.Pants = "";
      myCloset.Shoes = "";
      myCloset.Formal = "";
      myCloset.Jackets = "";
      myCloset.Accessories = "";

      myCloset.Connections = [];
      myCloset.Wishlist = "";
      myCloset.Calendar = "";
      myCloset.Outfits = "";
      addClosetToDatabase(myCloset);
    }

    // This function calls the firebase-database to add the "myCloset" object.
    function addClosetToDatabase(myCloset) {
      firebase.database().ref(myCloset.accountID).set({
        'Tops': myCloset.Tops,
        'Pants': myCloset.Pants,
        'Shoes': myCloset.Shoes,
        'Formal': myCloset.Formal,
        'Jackets': myCloset.Jackets,
        'Accessories': myCloset.Accessories,

        'Connections': myCloset.Connections,
        'Wishlist': myCloset.Wishlist,
        'Calendar': myCloset.Calendar,
        'Outfits': myCloset.Outfits
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
          $state.go('app.mycloset', {
            'fromRegistrationPage': false
          });
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
  .controller('myClosetCtrl', function ($scope, $ionicLoading, $state, $rootScope, Item, $ionicHistory, $stateParams) {

    $scope.doneOrPlus2 = function () {
      if ($rootScope.flag == null) {
        $rootScope.flag = false;
      }


      if ($rootScope.flag == true) {
        $scope.ref = "#/app/outfits";
        return "icon ion-checkmark-round";
      }
      else {
        $scope.ref = "#/app/newItem";
        return "icon ion-plus-round";
      }

    }

    $scope.init = function () {
      var user = firebase.auth().currentUser;
      if (!user) {
        // Show modal with description of events
        //$ionicLoading.show({ template: 'Please log in', noBackdrop: true, duration: 1000 });
        $state.go("app.login");
      } else {
        // Only if myCloset is accessed from the Registration Page, we will add entries to the database.
        // NOTE: This code-block has to be removed as we want to add to the database when the user initiates
        // the appropriate event.
        // This is only a test block to understand how the code works.
        if ($stateParams.fromRegistrationPage == true) {
          // If successful login, then currentUser is set and display event modal
          // Show modal with description of events
          createClosetItem('Accessory1', 'img1', 'brand1', 'color1', 'Accessories');
          createClosetItem('Accessory2', 'img2', 'brand2', 'color2', 'Accessories');

          createClosetItem('Top1', 'img3', 'brand3', 'color3', 'Tops');
          createClosetItem('Top2', 'img4', 'brand4', 'color4', 'Tops');

          createClosetItem('Pant1', 'img5', 'brand5', 'color5', 'Pants');
          createClosetItem('Pant2', 'img6', 'brand6', 'color6', 'Pants');

          createClosetItem('Shoe1', 'img7', 'brand7', 'color7', 'Shoes');
          createClosetItem('Shoe2', 'img8', 'brand8', 'color8', 'Shoes');

          createClosetItem('Formal1', 'img9', 'brand9', 'color9', 'Formal');
          createClosetItem('Formal2', 'img10', 'brand10', 'color10', 'Formal');

          createClosetItem('Jacket1', 'img11', 'brand11', 'color11', 'Jackets');
          createClosetItem('Jacket2', 'img12', 'brand12', 'color12', 'Jackets');
        }
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
      var newItemId = ID();
      var updates = {};
      updates[$rootScope.email + '/' + itemCategory + '/' + newItemId] = itemObj;
      return firebase.database().ref().update(updates);
    }

    function uniqueNumber() {
      var date = Date.now();

      if (date <= uniqueNumber.previous) {
        date = ++uniqueNumber.previous;
      } else {
        uniqueNumber.previous = date;
      }

      return date;
    }

    uniqueNumber.previous = 0;

    function ID() {
      return uniqueNumber();
    };


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

  //camera controller
  .controller("CameraCtrl", function ($scope, $cordovaCamera, $ionicLoading, $state, $rootScope, Item, $ionicHistory) {
    //console.log('its workfsdfsfsdfing')
    $scope.takePicture = function () {
      //console.log('its workfsd111111111111fsfsdfing')
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
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        // An error occured. Show a message to the user
      });
    }

    $scope.addwishlistitem = function () {


      createClosetItem('item1', 'img1', 'brand1', 'color1', 'Wishlist');

    }






  })

  //wishlist controller
  .controller('WishlishCtrl', function ($scope, $rootScope) {

    var user = firebase.auth().currentUser;
    var getUserEmail = user.email;
    $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');

    return firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
      var wishlist = snapshot.val().wishlist;


    });
  })



  //$scope.onItemDelete =function(item){
  //$scope.wishlist.splice($scope.wishlist.indexOf(item),1);
  //}

  //$scope.dorefresh = function(){
  //get data from the source
  //$scope.wishlist = Wishlist.all();
  //}


  .controller('CalendarCtrl', function ($scope, Events) {
    Events.get().then(function (events) {
      console.log("events", events);
      $scope.events = events;
    });
    var addEvent = function (event) {
      var deferred = $q.defer();

      $cordovaCalendar.createEvent({
        title: event.title,
        notes: event.description,
        startDate: event.date,
        endDate: event.enddate
      }).then(function (result) {
        console.log('success');
        console.dir(result);
        deferred.resolve(1);
      }, function (err) {
        console.log('error');
        console.dir(err);
        deferred.resolve(0);
      });

      return deferred.promise;

    }
  })


  .controller('OutfitsCtrl', function ($scope, $ionicPopup, $rootScope) {
   if($rootScope.listOfLists == null){
     $rootScope.listOfLists = [];
   }
    $scope.showPopup = function () {
      $scope.data = {};
      var outfitPopup = $ionicPopup.show({
        template: '<input type = "text" ng-model = "data.outfit" placeholder="Outfit Name">',

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
              return $scope.data.outfit;
            }
          },

        ],

      });
      outfitPopup.then(function (res) {
        $rootScope.currName = res;
        var fullOutfit = {};
        fullOutfit.name = res;
        fullOutfit.outfitList = [];
        $rootScope.listOfLists.push(fullOutfit);
        console.log('Tapped!', res);
      });
    };



    $scope.selectItem = function (name) {
      if(!$rootScope.listOfLists.$isEmpty()){
        for(var i=0; i<$rootScope.listOfLists.size; i++){
          if(name.equals($rootScope.listOfLists[i].name)){
            $scope.subList = $rootScope.listOfLists[i].outfitList;
          }
        }
      }
    }

  })

  .controller('ClosetCtrl', function ($scope, $rootScope, $ionicLoading) {




if($rootScope.flag == null) {
      $rootScope.flag = false;
    }
    if ($rootScope.flag == true) {
      $scope.ref = "#/app/outfits";
    }
    else {
      $scope.ref = "#/app/newItem";
    }

    var user = firebase.auth().currentUser;
    var getUserEmail = user.email;
    $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
    return firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
      $scope.finalTopsArr = snapshot.val().Tops;
      $scope.finalPantsArr = snapshot.val().Pants;
      $scope.finalShoesArr = snapshot.val().Shoes;
      $scope.finalFormalsArr = snapshot.val().Formal;
      $scope.finalJacketsArr = snapshot.val().Jackets;
      $scope. finalAccessoriesArr = snapshot.val().Accessories;




      $scope.first = true;
      $scope.second = false;


      $scope.doneOrPlus = function () {
        if ($rootScope.flag == true) {
          $scope.ref = "#/app/outfits";
          return "icon ion-checkmark-round";
        }
        else {
          $scope.ref = "#/app/newItem";
          return "icon ion-plus-round";
        }

      }




      $scope.checkFlag = function () {
        if ($rootScope.flag == true) {
          if ($scope.first) {
            $scope.buttonType = "ion-button full outline";
            $ionicLoading.show({template: 'Added!', noBackdrop: true, duration: 1000});
            $scope.second = true;
            $scope.first = false;

            for(var i = 0; i<$rootScope.listOfLists.length; i++){
              if($rootScope.listOfLists[i].name == $rootScope.currName){
                $rootScope.listOfLists[i].outfitList. push($scope.top);
              }
            }
          }
          else if ($scope.second) {
            $scope.buttonType = "button button-full";
            $ionicLoading.show({template: 'Deleted!', noBackdrop: true, duration: 1000});
            $scope.second = false;
            $scope.first = true;
            for(var i = 0; i<$rootScope.listOfLists.length; i++){
              if($rootScope.listOfLists[i].name == $rootScope.currName){
                $rootScope.listOfLists[i].outfitList.splice(i,1);
              }
            }
          }
        }
        else {
          $ionicLoading.show({template: 'SELECTED!', noBackdrop: true, duration: 1000});
        }
      }

    });
  })
  .controller('ConnectionsCtrl',function ($scope, $rootScope) {

      var user = firebase.auth().currentUser;
      var getUserEmail = user.email;
      $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
      //var currentConnections = null;
      firebase.database().ref($rootScope.email).once('value').then(function (current) {
          $scope.currentConnections = current.Connections;
      })
      //noinspection JSAnnotator
      function addingConnections(connectionEmail) {
          if (currentConnections.indexOf(connectionEmail) == -1) {
              currentConnections.push(connectionEmail);
          }
          return currentConnections;
      }
      function removeConnection(connectionEmail) {
          if (currentConnections.indexOf(connectionEmail) > -1) {
              currentConnections.splice(index, 1);
          }
          return currentConnections;
      }
  })



  .controller('PlaylistCtrl', function ($scope, $stateParams) {

  });



















