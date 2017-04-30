var basePath = browser.params.basePath;
var loginPage = require(basePath + '/tests/e2e/pages/LoginPage.js');
var myClosetPage = require(basePath + '/tests/e2e/pages/MyClosetPage.js');
var header = require(basePath + '/tests/e2e/pages/Header.js');

var EC = protractor.ExpectedConditions;

describe('Navigation: ', function() {
  /* Setup */
  beforeAll(function() {
    loginPage.get();
    loginPage.fillEmail("jakehamelhs@gmail.com");
    loginPage.fillPass("testpass");
    loginPage.login();
    browser.wait(EC.urlContains('mycloset'), 5000);
  });
  /* Reset to My Closet Page after each */
  afterEach(function() {
    browser.actions().mouseMove(header.backButton).click().perform();
    // header.backButton.click();
    expect(browser.getCurrentUrl()).toContain('mycloset');
  })

  it('Clicking the tops button should link to Tops Page', function() {
    myClosetPage.topsButton.click();
    expect(browser.getCurrentUrl()).toContain('tops');
  });

  it('Clicking the pants button should link to Pants Page', function() {
    myClosetPage.pantsButton.click();
    expect(browser.getCurrentUrl()).toContain('pants');
  });

  it('Clicking the shoes button should link to Shoes Page', function() {
    myClosetPage.shoesButton.click();
    expect(browser.getCurrentUrl()).toContain('shoes');
  });

  it('Clicking the formal button should link to the Formal Page', function() {
    myClosetPage.formalButton.click();
    expect(browser.getCurrentUrl()).toContain('formal');
  });

  it('Clicking the jackets button should link to the Jackets Page', function() {
    myClosetPage.jacketsButton.click();
    expect(browser.getCurrentUrl()).toContain('jackets');
  });

  it('Clicking the accessories button should link to the Accessories Page', function() {
    myClosetPage.accessoriesButton.click();
    expect(browser.getCurrentUrl()).toContain('accessories');
  });

});
