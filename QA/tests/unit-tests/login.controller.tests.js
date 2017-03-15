describe('LoginController', function () {

    var controller,
        virtualClosetMock,
        stateMock,
        deferredLogin,
        ionicPopupMock;

    // Load the App Module
    beforeEach(module('app'));

    // Instantiate the Controller and Mocks
    beforeEach(inject(function ($controller, $q) {
        deferredLogin = $q.defer();

        // mock virtualCloset
        virtualClosetMock = {
            login: jasmine.createSpy('login spy').and.returnValue(deferredLogin.promise)
        };

        // mock $state
        stateMock = jasmine.createSpyObj('$state spy', ['go']);

        // mock $ionicPopup
        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

        // instantiate LoginController
        controller = $controller('LoginController', {
                        '$ionicPopup': ionicPopupMock,
                        '$state': stateMock,
                        'VirtualCloset': virtualClosetMock }
        );
    }));

    describe('#doLogin', function () {

        // Call doLogin on the Controller
        beforeEach(inject(function(_$rootScope_) {
            $rootScope = _$rootScope_;
            controller.username = 'test1';
            controller.password = 'password1';
            controller.doLogin();
        }));

        it('should call login on VirtualClosetApp', function () {
            expect(virtualClosetMock.login).toHaveBeenCalledWith('test1', 'password1');
        });

        describe('when the login is executed,', function () {
            it('if successful, should change state to my-closet', function () {

                // TODO: Mock the login response from VirtualCloset

                expect(stateMock.go).toHaveBeenCalledWith('my-closet');
            });

            // TODO: Double-check intended case with front-end team
            it('if unsuccessful, should show a popup', function() {

                // TODO: Mock the login response from VirtualCloset

                expect(ionicPopupMock.alert).toHaveBeenCalled();
            });
        });
    });
});