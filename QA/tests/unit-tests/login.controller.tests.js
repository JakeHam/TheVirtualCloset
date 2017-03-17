describe('LoginController', function () {

    var controller,
        virtualClosetMock,
        stateMock,
        deferredLogin;

    // Load the App Module
    beforeEach(module('starter'));

    // Instantiate the Controller and Mocks
    beforeEach(inject(function ($controller, $q) {
        deferredLogin = $q.defer();

        // mock virtualCloset
        virtualClosetMock = {
            login: jasmine.createSpy('login spy').and.returnValue(deferredLogin.promise)
        };

        // mock $state
        stateMock = jasmine.createSpyObj('$state spy', ['go']);

        // instantiate LoginController
        controller = $controller('LoginController', {
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

        // TODO: Currently fails do to no login implementation
        it('should call login on VirtualClosetApp', function () {
            expect(virtualClosetMock.login).toHaveBeenCalledWith('test1', 'password1');
        });

        describe('when the login is executed,', function () {
            it('if successful, should change state to my-closet', function () {

                // TODO: Mock the login response

                expect(stateMock.go).toHaveBeenCalledWith('my-closet');
            });

            // TODO: Double-check intended case with front-end team
            it('if unsuccessful, should show error message', function() {

                // TODO: Mock the login response

            });
        });
    });
});