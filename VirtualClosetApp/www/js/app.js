// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

//angular.module('starter', ['ionic', 'starter.controllers'])
var userEvents = [];

angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])
  // .constant('FirebaseUrl', 'https://ionicle.firebaseio.com/')
  // .service('rootRef', ['FirebaseUrl', Firebase])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .factory('Events', function ($q, $cordovaCalendar) {
    var incrementDate = function (date, amount) {
      var tmpDate = new Date(date);
      tmpDate.setDate(tmpDate.getDate() + amount)
      return tmpDate;
    };
    //create fake events, but make it dynamic so they are in the next week
    userEvents.push(
      {
        "title": "Meetup on Ionic",
        "description": "We'll talk about beer, not Ionic.",
        "date": incrementDate(new Date(), 1),
      }
    );

    var getEvents = function ($cordovaCalendar) {
      var deferred = $q.defer();
      var promises = [];
      userEvents.forEach(function (ev) {
        //add enddate as 1 hour plus
        ev.enddate = incrementDate(ev.date, 1);
        console.log('try to find '+JSON.stringify(ev));

        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
          promises.push($cordovaCalendar.findEvent({
            title:ev.title,
            startDate:ev.date
          }));        
        }
      });
      $q.all(promises).then(function (results) {
        console.log("in the all done");
        //should be the same len as events
        for (var i = 0; i < results.length; i++) {
          userEvents[i].status = results[i].length === 1;
        }
        deferred.resolve(userEvents);
      });
      return deferred.promise;
    }
    return {
      get: getEvents
    };
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.tops', {
        cache: false,
        url: '/tops',
        views: {
          'menuContent': {
            templateUrl: 'templates/closet/tops.html'
          }
        },
        controller: 'topsCtrl'
      })


      .state('app.pants', {
        cache: false,
        url: '/pants',
        views: {
          'menuContent': {
            templateUrl: 'templates/closet/pants.html'
          }
        },
        controller: 'ClosetCtrl'
      })

      .state('app.shoes', {
        cache: false,
        url: '/shoes',
        views: {
          'menuContent': {
            templateUrl: 'templates/closet/shoes.html'
          }
        },
        controller: 'ClosetCtrl'
      })

      .state('app.formal', {
        cache: false,
        url: '/formal',
        views: {
          'menuContent': {
            templateUrl: 'templates/closet/formal.html'
          }
        },
        controller: 'ClosetCtrl'
      })


      .state('app.newItem', {
        cache: false,
        url: '/newItem',
        views: {
          'menuContent': {
            templateUrl: 'templates/closet/newItem.html'
          }
        },
        controller: 'newitemCtrl',

      })


      .state('app.newItemWishlist', {
        cache: false,
        url: '/newItemWishlist',
        views: {
          'menuContent': {
            templateUrl: 'templates/closet/newItemWishlist.html'
          }
        },
        controller: 'CameraCtrl'
      })

      .state('app.editem', {
        url: '/editem',
        views: {
          'menuContent': {
            templateUrl: 'templates/closet/editem.html'
          }
        },
        controller: 'CameraCtrl'
      })

      .state('app.jackets', {
        cache: false,
        url: '/jackets',
        views: {
          'menuContent': {
            templateUrl: 'templates/closet/jackets.html'
          }
        },
        controller: 'ClosetCtrl'
      })

      .state('app.accessories', {
        url: '/accessories',
        views: {
          'menuContent': {
            templateUrl: 'templates/closet/accessories.html'
          }
        },
        controller: 'ClosetCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/menu/search.html'
            //controller: 'SearchCtrl'
          }
        }
      })

      .state('app.mycloset', {

        url: '/mycloset',
        views: {
          'menuContent': {
            templateUrl: 'templates/menu/mycloset.html'
          }
        },
        controller: 'myClosetCtrl',
        params: {fromRegistrationPage: false}
      })


      .state('app.outfits', {
        cache: false,
        url: '/outfits',
        views: {
          'menuContent': {
            templateUrl: 'templates/menu/outfits.html'
          }
        },
        controller: 'OutfitsCtrl'
      })

      .state('app.calendar', {
        url: '/calendar',
        views: {
          'menuContent': {
            templateUrl: 'templates/menu/calendar.html'
          }
        },
        controller: 'CalendarCtrl'
      })

      .state('app.wishlist', {
        url: '/wishlist',
        views: {
          'menuContent': {
            templateUrl: 'templates/menu/wishlist.html'
          }
        },
        controller: 'WishlishCtrl',
        cache: false
      })

      .state('app.options', {
        url: '/options',
        views: {
          'menuContent': {
            templateUrl: 'templates/menu/options.html'
          }
        },
        controller: 'optionsCtrl'
      })

      // Define register.
      .state('app.register', {
        url: '/register',
        views: {
          'menuContent': {
            templateUrl: 'templates/authentication/register.html'
          }
        },
        cache: false,
        controller: 'registerCtrl'
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/authentication/login.html'
          }
        },
        cache: false,
        controller: 'loginCtrl'
      })


      .state('app.connections', {
        url: '/connections',
        views: {
          'menuContent': {
            templateUrl: 'templates/menu/connections.html'
          }
        },
        controller: 'ConnectionsCtrl'
      })

      .state('app.iteminfo', {
        url: '/iteminfo',
        views: {
          'menuContent': {
            templateUrl: 'templates/closet/itemInfo.html'
          }
        },
        cache: false,
        controller: 'ClosetCtrl'
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
  });

