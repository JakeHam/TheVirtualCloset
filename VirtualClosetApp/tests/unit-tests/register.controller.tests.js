describe('RegisterController', function () {

  var $scope, $ionicLoading, ctrl, $timeout, deferredLogin, stateMock;

  beforeEach(function () {
    module('starter');

    inject(function ($rootScope, $controller, $q, _$timeout_) {
      $scope = $rootScope.$new();
      $timeout = _$timeout_;

      ctrl = $controller('registerCtrl', {
        $scope: $scope,
        $ionicLoading: $ionicLoading,
        $state: stateMock
      });

      deferredLogin = $q.defer();

      // mock $state
      stateMock = jasmine.createSpyObj('$state spy', ['go']);

    });
  });

  it('should have a $scope variable', function () {
    expect($scope).toBeDefined();
  });

  describe('.register', function () {

    beforeEach(function () {
      var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
      var randEmail = '';
      for (var i=0; i<10; i++) {
        randEmail += chars[Math.floor(Math.random() * chars.length)];
      }
      randEmail += '@test.com';
      $scope.email = randEmail;
      $scope.password = 'testpass';
    });

    it('should create a new user', function () {
      expect($scope.loginUser($scope.email, $scope.password)).toHaveBeenCalledWith(randEmail, 'testpass');
    });

  });
});


