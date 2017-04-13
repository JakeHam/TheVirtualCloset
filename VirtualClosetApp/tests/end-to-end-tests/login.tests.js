describe('Clicking the login button', function() {
  var email, password, loginButton;

  beforeEach(function() {
    browser.get('/#/app/login');
    email = element(by.model('$parent.email'));
    password = element(by.model('$parent.password'));
    // bad coding standard
    loginButton = element(by.css('div.centerDiv input[type="button"]'));
  });

  it('should validate the credentials for a successful login and display mycloset view', function() {
    email.sendKeys('test@test.test');
    password.sendKeys('testpass');
    loginButton.click();

    // give it a half-second to transition
    browser.sleep(500);
    expect(browser.getCurrentUrl()).toMatch('/app/mycloset');
  });

  it('should keep us on the login page on unsuccessful login', function() {
    email.sendKeys('bad');
    password.sendKeys('bad');
    loginButton.click();

    expect(browser.getCurrentUrl()).toMatch('/app/login');
  });
});
