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
        console.log('Signed Out User');
        $ionicLoading.show({template: 'Logout successful!', noBackdrop: true, duration: 2000});
        $scope.closeLogout();

        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go("app.login");
      }, function (error) {
        console.error('Sign Out Error', error);
        $ionicLoading.show({template: 'Logout Unsuccessful!', noBackdrop: true, duration: 2000});
      });

    };

    $scope.backToMyCloset = function () {
      $scope.closeLogout();
    }
  })

  .controller('menuCtrl', function ($scope, $state, $rootScope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };
  })

  // Register controller
  .controller('registerCtrl', function ($scope, $ionicLoading, $state, $rootScope, $ionicHistory) {
    // Register button is pressed.
    $scope.register = function () {
      $scope.createUser($scope.email, $scope.password);
    }

    $scope.createUser = function (email, password) {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        $ionicLoading.show({template: 'Created User!', noBackdrop: true, duration: 2000});

        // Creating unique AccountId for current user.
        // The accountID is the email without the "@" and ".com" symbols.
        var user = firebase.auth().currentUser;
        var getUserEmail = user.email;
        $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');

        // Set the closet database structure.
        setCloset();

        $scope.email = "";
        $scope.password = "";
        $ionicHistory.clearCache();
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
        $ionicLoading.show({template: 'Unsuccessful, Try again!', noBackdrop: true, duration: 2000});
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

      myCloset.Connections = "";
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

  .controller('searchCtrl', function ($scope, $state, $rootScope, $ionicHistory) {

  })

  // Login controller
  .controller('loginCtrl', function ($scope, $ionicLoading, $state, $rootScope, $ionicHistory) {
    $scope.loginToAccount = function () {
      $scope.loginUser($scope.email, $scope.password).then(function () {
        // Check if currentUser is set (we were succesfully able to login)
        var user = firebase.auth().currentUser;
        if (!user) {
          // Show modal with description of events
          $ionicLoading.show({
            template: 'Unsuccessful, Check credentials, check connection or create user',
            noBackdrop: true,
            duration: 3000
          });
          $ionicHistory.nextViewOptions({
            disableBack: true
          });

          $state.go("app.login");
        } else {
          // If successful login, then currentUser is set and display event modal
          // Show modal with description of events
          $scope.email = "";
          $scope.password = "";
          $ionicHistory.clearCache();
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
          $ionicLoading.show({template: 'Successful Login!', noBackdrop: true, duration: 2000});

        }
      });
    };
    $scope.googleLogin = function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
      });
      $state.go('app.mycloset', {
        'fromRegistrationPage': false // ??? upper rights all weird
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

    var newItemId;

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
      }
    }
    $scope.init();

    // This function creates the item object with the predefined structure.
    function createClosetItem(itemName, itemImg, itemBrand, itemColor, itemCategory) {
      // Get accountID {email} for cur user.

      var user = firebase.auth().currentUser;
      var getUserEmail = user.email;
      $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');

      newItemId = ID();
      var itemObj = new Item(itemName, newItemId, itemImg, itemBrand, itemColor);
      //getAllItems();

      //console.log($rootScope.completeContent);
      addItemToCloset(itemObj, itemCategory);
    }

    // This function calls the firebase-database to add the existing "myCloset" object.
    function addItemToCloset(itemObj, itemCategory) {
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
    var item = function (name, id, img, brand, color) {
      // Public variables
      // These can be accessed by any controller that has the factory injected into it
      var _name = '';
      var _id = '';
      var _img = '';
      var _brand = '';
      var _color = '';

      // Private Functions
      // (these are only accessible within the factory itself)
      // This function is run upon initialization/load of the factory (it is called "init" for convention)
      function init() {
        _name = name;
        _id = id;
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
        _id: id,
        _img: img,
        _brand: brand,
        _color: color
      }
    };
    return item;

  })


  //$scope, $cordovaCamera, $ionicLoading, $state, Item, $rootScope, $ionicHistory,$stateParams
  .controller("newitemCtrl", function ($scope, $cordovaCamera, $ionicLoading, $state, Item, $rootScope, $ionicHistory, $stateParams, $timeout) {
    var newItemId;
    $scope.takePicture = function () {

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
       // $ionicLoading.show({template: $scope.imgURI, noBackdrop: true, duration: 6000});

      }, function (err) {
        // An error occured. Show a message to the user
      });
    }



    $scope.backtocloset = function (item) {

      //window.alert(item._category);
      createClosetItem(item._name, 'img1', item._brand, item._color, item._category);
      $timeout(function () {
        $scope.displayErrorMsg = false;
      }, 3000);

      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $state.go("app.mycloset");

    }

    // This function creates the item object with the predefined structure.
    function createClosetItem(itemName, itemImg, itemBrand, itemColor, itemCategory) {
      // Get accountID {email} for cur user.

      var user = firebase.auth().currentUser;
      var getUserEmail = user.email;
      $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');

      newItemId = ID();
      var itemObj = new Item(itemName, newItemId, itemImg, itemBrand, itemColor);

      addItemToCloset(itemObj, itemCategory);
    }

    // This function calls the firebase-database to add the existing "myCloset" object.
    function addItemToCloset(itemObj, itemCategory) {
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


  //camera controller
  .controller("CameraCtrl", function ($scope, $cordovaCamera, $ionicLoading, $state, Item, $rootScope, $ionicHistory, $stateParams) {
    var newItemId = ID();
    //console.log('its workfsdfsfsdfing')
    $scope.takePicture = function () {

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

    $scope.backtowishlist = function (item) {


      createClosetItem(item._name, 'img1', item._brand, item._color, 'Wishlist');


      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $state.go("app.wishlist");

    }

    // This function creates the item object with the predefined structure.
    function createClosetItem(itemName, itemImg, itemBrand, itemColor, itemCategory) {
      // Get accountID {email} for cur user.

      var user = firebase.auth().currentUser;
      var getUserEmail = user.email;
      $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');


      var itemObj = new Item(itemName, newItemId, itemImg, itemBrand, itemColor);

      addItemToCloset(itemObj, itemCategory);
    }

    // This function calls the firebase-database to add the existing "myCloset" object.
    function addItemToCloset(itemObj, itemCategory) {
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

  //wishlist controller
  .controller('WishlishCtrl', function ($scope, $rootScope) {

    $scope.doFefresh = function () {
      // get data from the source
      // $scope.wishlistArr = Wishlist.all();

      $scope.$apply();

    }

    var user = firebase.auth().currentUser;
    var getUserEmail = user.email;
    $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
    return firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
      $scope.wishlistArr = snapshot.val().Wishlist;
    });

    $scope.removeItem = function(wishitem) {

       firebase.database().ref($rootScope.email+'/Wishlist/'+ wishitem._id).remove();

       firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
         $scope.wishlistArr = snapshot.val().Wishlist;

         $timeout(function() { $scope.displayErrorMsg = false;}, 1000);
         $state.go('app.wishlist');
       });
     }

  })
  //$scope.onItemDelete =function(item){
  //$scope.wishlist.splice($scope.wishlist.indexOf(item),1);
  //}


  .controller('CalendarCtrl', function ($scope, Events, $cordovaCalendar, $ionicPopup) {
    Events.get().then(function (events) {
      console.log("events", events);
      $scope.events = events;
    });
    $scope.selectItem = function (event) {
      console.log(event.outfit);
      $scope.finally = si.ID;
      firebase.database().ref($rootScope.email + '/Calendar/' + $scope.finally).once('value').then(function (snapshot) {
        $scope.subList = snapshot.val().List;

        $timeout(function () {
          $scope.displayErrorMsg = false;
        }, 1000);
        $state.go('app.outfits');
        console.log("DONE");

      });
    }
    $scope.addEvent = function () {
      showPopup();
      // var deferred = $q.defer();
      document.addEventListener("deviceready", onDeviceReady, false);
    }
    function onDeviceReady() {
      showPopup();
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
      });
      return deferred.promise;
    }

    function showPopup() {
      $scope.data = {};
      var outfitPopup = $ionicPopup.show({
        template: '<input type = "text"  placeholder="Event Name" ng-model = "data.name"><br><input type = "datetime-local"  ng-model ="data.date"><br><input type = "outfit"  placeholder="Outfit" ng-model ="data.outfit">',

        title: 'New Event',
        scope: $scope,
        cssClass: 'closetbutton',

        buttons: [
          {text: 'Cancel'},
          {
            text: 'Submit',
            onTap: function (e) {
              console.log("here");
              $scope.events.push(
                {
                  "title": $scope.data.name,
                  "description": "hoc est tediosus",
                  "date": $scope.data.date,
                  "outfit": $scope.data.outfit
                }
              );
              location.href = "#/app/calendar";
              return $scope.data.event;
            }
          },
        ],
      });
      outfitPopup.then(function (res) {
        $rootScope.currName = res;
        $rootScope.listOfLists.push(fullOutfit);
        console.log('Tapped!', res);
      });
    };
  })

  .controller('OutfitsCtrl', function ($scope, $ionicPopup, $rootScope, $state, $timeout, $ionicLoading, $ionicHistory) {


    firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
      $scope.finalOutfits = snapshot.val().Outfits;
    });
    var newItemId;
    if ($rootScope.listOfLists == null) {
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
        newItemId = ID();
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
        $rootScope.outfitList = [];
        var fullOutfit = {};
        fullOutfit.name = res;
        fullOutfit.ID = newItemId;
        addItemToCloset(fullOutfit);
        $rootScope.currOutFitID = newItemId;
        function addItemToCloset(fullOut) {
          var updates = {};
          updates[$rootScope.email + '/Outfits/' + newItemId] = fullOut;
          return firebase.database().ref().update(updates);
        }

        console.log('Tapped!', res);
      });
    };

    $scope.outfitDelete = function (si) {
      $scope.rem = si.ID;
      firebase.database().ref($rootScope.email + '/Outfits/' + $scope.rem).remove();
      $timeout(function () {
        $scope.displayErrorMsg = false;
      }, 2000);
      $state.reload();
      console.log("DONE");

    }

    $scope.selectItem = function (si) {
      console.log(si.ID);
      $scope.finally = si.ID;
      firebase.database().ref($rootScope.email + '/Outfits/' + $scope.finally).once('value').then(function (snapshot) {
        $scope.subList = snapshot.val().List;

        $timeout(function () {
          $scope.displayErrorMsg = false;
        }, 300);
        $state.go('app.outfits');
        console.log("DONE");

      });
    }
  })


  .controller('ClosetCtrl', function ($scope, $rootScope, $ionicLoading, $timeout, $ionicHistory, $state) {

    var user = firebase.auth().currentUser;
    var getUserEmail = user.email;
    $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
    return firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
      $scope.finalTopsArr = snapshot.val().Tops;
      $scope.finalPantsArr = snapshot.val().Pants;
      $scope.finalShoesArr = snapshot.val().Shoes;
      $scope.finalFormalsArr = snapshot.val().Formal;
      $scope.finalJacketsArr = snapshot.val().Jackets;
      $scope.finalAccessoriesArr = snapshot.val().Accessories;


      $scope.doneOrPlus = function () {
        if ($rootScope.flag == true) {
          $scope.ref = "#/app/outfits";
          $rootScope.out = true;
          return "icon ion-checkmark-round";
        }
        else {
          $scope.ref = "#/app/newItem";
          $rootScope.out = false;
          return "icon ion-plus-round";
        }

      }


      $scope.goToNew = function () {
        $state.go('app.newItem');
      }

      $scope.addOutfitItems = function () {
        if ($rootScope.out) {
          addItemToCloset($rootScope.outfitList);
          $rootScope.flag2 = true;
        }

        // This function calls the firebase-database to add the existing "myCloset" object.
        function addItemToCloset(oL) {
          var updates = {};
          updates[$rootScope.email + '/Outfits/' + $rootScope.currOutFitID + '/List/'] = oL;
          return firebase.database().ref().update(updates);

        }

        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.outfits');


      }

      $scope.removeItem = function(item,categoryname) {
         //console.log(si.ID);
         if(categoryname =='Tops'){
           firebase.database().ref($rootScope.email+'/Tops/'+ item._id).remove();

           firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
             $scope.finalTopsArr = snapshot.val().Tops;

             $timeout(function() { $scope.displayErrorMsg = false;}, 1000);
             $state.go('app.tops');
           });
         }else if(categoryname =='Jackets'){
           firebase.database().ref($rootScope.email+'/Jackets/'+ item._id).remove();

           firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
             $scope.finalJacketsArr = snapshot.val().Jackets;

             $timeout(function() { $scope.displayErrorMsg = false;}, 1000);
             $state.go('app.jackets');
           });
         }else if(categoryname =='Pants'){
           firebase.database().ref($rootScope.email+'/Pants/'+ item._id).remove();

          firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
             $scope.finalPantsArr = snapshot.val().Pants;

             $timeout(function() { $scope.displayErrorMsg = false;}, 1000);
             $state.go('app.pants');
           });
         }else if(categoryname =='Shoes'){
           firebase.database().ref($rootScope.email+'/Shoes/'+ item._id).remove();

           firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
             $scope.finalShoesArr = snapshot.val().Shoes;

             $timeout(function() { $scope.displayErrorMsg = false;}, 1000);
             $state.go('app.shoes');
           });
         }else if(categoryname =='Formal'){
           firebase.database().ref($rootScope.email+'/Formal/'+ item._id).remove();

           firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
             $scope.finalFormalsArr = snapshot.val().Formal;

            $timeout(function() { $scope.displayErrorMsg = false;}, 1000);
             $state.go('app.formal');
           });
         }else if(categoryname =='Accessories'){
           firebase.database().ref($rootScope.email+'/Accessories/'+ item._id).remove();

           firebase.database().ref($rootScope.email).once('value').then(function (snapshot) {
             $scope.finalAccessoriesArr = snapshot.val().Accessories;

             $timeout(function() { $scope.displayErrorMsg = false;}, 1000);
             $state.go('app.accessories');
           });
         }

       }

      $scope.checkFlag = function (item) {
        if ($rootScope.flag == true) {
          var toAdd = true;
          for (var i = 0; i < $rootScope.outfitList.length; i++) {
            if ($rootScope.outfitList[i]._id == item._id) {
              $scope.buttonType = "button button-full";
              $rootScope.outfitList.splice(i, 1);
              toAdd = false;
              $ionicLoading.show({template: 'Deleted!', noBackdrop: true, duration: 1000});
            }
          }

          if (toAdd) {
            $scope.buttonType = "ion-button full outline";
            $rootScope.outfitList.push(item);
            $ionicLoading.show({template: 'Added!', noBackdrop: true, duration: 1000});
          }
        }
        else {
          $state.go("app.iteminfo");
          $rootScope.selecteditem = item;
        }
      }
    });

  })
  .controller('ConnectionsCtrl', function ($scope, $rootScope, $ionicLoading, $state) {
    var newItemId;
    $scope.submitEmailConnections = function () {
      var getUserEmail1 = $scope.connectionEmail;
      var newUser = getUserEmail1.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
      return firebase.database().ref(newUser).once('value').then(function (snapshot) {
        if (snapshot.val() == null) {
          $ionicLoading.show({template: 'Please Enter a Valid Email Address!', noBackdrop: true, duration: 3000});
        }
        else {
          // This is a verified User. 
          newItemId = ID();
          addConnection(newUser, 'Connections', newItemId);
        }
      });        // This function calls the firebase-database to add the existing "myCloset" object. 
      function addConnection(connectionEmail, itemCategory, newConnectionsId) {
        var user = firebase.auth().currentUser;
        var getUserEmail = user.email;
        $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
        console.log($rootScope.email);
        console.log(connectionEmail);
        var updates = {};
        updates[$rootScope.email + '/' + itemCategory + '/' + newConnectionsId] = connectionEmail;
        //updates[$rootScope.email + '/' + itemCategory] = "works";       return firebase.database().ref().update(updates);  
      }

      function uniqueNumber() {
        var date = Date.now();
        if (date <= uniqueNumber.previous) {
          date = ++uniqueNumber.previous;
        }
        else {
          uniqueNumber.previous = date;
        }
        return date;
      }

      uniqueNumber.previous = 0;
      function ID() {
        return uniqueNumber();
      };
    }
    var user = firebase.auth().currentUser;
    var getUserEmail = user.email;
    $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
    firebase.database().ref($rootScope.email).on('value', function (snapshot) {
      $scope.listOfConnections = snapshot.val().Connections;
    });
    $scope.toNewUserClosetPage = function (connectionEmail) {
      $state.go('app.mycloset',
        {
          'fromRegistrationPage': false,
          'fromConnectionPage': true,
          'connectionEmail': connectionEmail
        });
    }
  })


  .controller('optionsCtrl', function ($scope, $stateParams, $ionicLoading, $ionicPopup, $rootScope, $timeout, $state) {

    $scope.deleteAccount = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Closet',
        cssClass: 'closetbutton',
        template: 'Are you sure you want to Delete your Virtual Closet Account?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          var user = firebase.auth().currentUser;

          user.delete().then(function () {
            $ionicLoading.show({template: 'Closet Deleted!', noBackdrop: true, duration: 2000});
            $state.go("app.login");
          }, function (error) {
            //console.log(error);
            $ionicLoading.show({
              template: 'Need to Verify Credentials, Please Re-Login and Try Again!',
              noBackdrop: true,
              duration: 2000
            });
          });
        } else {
          //console.log('On Cancel');
        }
      });
    };


    $scope.resetCloset = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Reset Closet',
        cssClass: 'closetbutton',
        template: 'Are you sure you want to Reset your Virtual Closet?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          var user = firebase.auth().currentUser;
          var getUserEmail = user.email;
          $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
          emptyCloset();
          setCloset();
          $ionicLoading.show({template: 'Closet Reset!', noBackdrop: true, duration: 2000});
        } else {
          //console.log('On Cancel');
        }
      });
    };

    // This function resets the closet.
    function emptyCloset() {
      var updates = {};
      updates[$rootScope.email] = "";
      return firebase.database().ref().update(updates);
    }

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

      myCloset.Connections = "";
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

    // This function resets the closet.
    function emptyClosetCategory(itemCategory) {
      var user = firebase.auth().currentUser;
      var getUserEmail = user.email;
      $rootScope.email = getUserEmail.replace(/[&\/\\#,+()$~%.'":*?<>{}@]/g, '');
      var updates = {};
      updates[$rootScope.email + '/' + itemCategory] = "";
      return firebase.database().ref().update(updates);
    }


    // Triggered on a button click, or some other target
    $scope.resetClosetCategory = function () {
      $scope.data = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<label class="item item-input item-select"><select ng-model="data.wifi" height="20%"><option selected>Accessories</option> <option >Formal</option> <option>Jackets</option> <option>Pants</option> <option>Shoes</option> <option>Tops</option> <br></select></label>',
        title: 'Reset Closet Category',
        subTitle: 'Select Closet Category',
        scope: $scope,
        cssClass: 'closetbutton',
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Submit</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.wifi) {
                e.preventDefault();
              } else {
                emptyClosetCategory($scope.data.wifi);
                $ionicLoading.show({template: 'Category Reset Successfully!', noBackdrop: true, duration: 2000});

              }
            }
          },
        ]
      });
      myPopup.then(function (res) {
        //console.log('Tapped!', res);
      });
    };


  });
