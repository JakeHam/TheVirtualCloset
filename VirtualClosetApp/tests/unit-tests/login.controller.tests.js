describe('LoginController', function () {

  var $scope, $ionicLoading, ctrl, $timeout, deferredLogin, stateMock;

  beforeEach(function () {
    module('starter');

    inject(function ($rootScope, $controller, $q, _$timeout_) {
      $scope = $rootScope.$new();
      $timeout = _$timeout_;

      ctrl = $controller('loginCtrl', {
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

  describe('.loginToAccount', function () {

    beforeEach(function () {
      $scope.email = 'test@test.test';
      $scope.password = 'testpass';
    });

    it('should take us to mycloset on a good login', function () {
      expect($scope.loginUser($scope.email, $scope.password)).toHaveBeenCalledWith('test@test.test', 'testpass');
      expect(stateMock.go).toHaveBeenCalledWith('app.mycloset');
    });

    it('should take us back to login on a bad login', function () {
      $scope.loginUser('bad', 'bad');
      expect(stateMock.go).toHaveBeenCalledWith('app.login');
    })

  });
});


