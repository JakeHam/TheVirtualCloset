var basePath = browser.params.basePath;
var loginPage = require(basePath + '/tests/e2e/pages/LoginPage.js');
var myClosetPage = require(basePath + '/tests/e2e/pages/MyClosetPage.js');
var header = require(basePath + '/tests/e2e/pages/Header.js');
var sidebar = require(basePath + '/tests/e2e/pages/Sidebar.js');

var EC = protractor.ExpectedConditions;

describe('Navigation', function() {
  /* Setup */
  beforeAll(function() {
    loginPage.get();
    loginPage.fillEmail("jakehamelhs@gmail.com");
    loginPage.fillPass("testpass");
    loginPage.login();
    browser.wait(EC.urlContains('mycloset'), 5000);
  });

  describe('for My Closet Page: ', function() {
    /* Reset to My Closet Page after each */
    afterEach(function() {
      browser.actions().mouseMove(header.backButton).click().perform();
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

  describe('for sidebar: ', function() {
    // We don't start with My Closet because we are already on that page
    it('Clicking the search link should link to the Search Page', function() {
      sidebar.toggle();
      sidebar.clickSearchLink();
      expect(browser.getCurrentUrl()).toContain('search');
    });

    it('Clicking the outfits link should link to the Outfits Page', function() {
      sidebar.toggle();
      sidebar.clickOutfitsLink();
      expect(browser.getCurrentUrl()).toContain('outfits');
    });

    it('Clicking the calendar link should link to the Calendar Page', function() {
      sidebar.toggle();
      sidebar.clickCalendarLink();
      expect(browser.getCurrentUrl()).toContain('calendar');
    });

    it('Clicking the wish list link should link to the Wish List Page', function() {
      sidebar.toggle();
      sidebar.clickWishListLink();
      expect(browser.getCurrentUrl()).toContain('wishlist');
    });

    it('Clicking the connections link should link to the Connections Page', function() {
      sidebar.toggle();
      sidebar.clickConnectionsLink();
      expect(browser.getCurrentUrl()).toContain('connections');
    });

    it('Clicking the options link should link to the Options Page', function() {
      sidebar.toggle();
      sidebar.clickOptionsLink();
      expect(browser.getCurrentUrl()).toContain('options');
    });

    it('Clicking the my closet link should link to the My Closet Page', function() {
      sidebar.toggle();
      sidebar.clickMyClosetLink();
      expect(browser.getCurrentUrl()).toContain('mycloset');
    });

    it('Clicking the logout link should log us out', function() {
      sidebar.toggle();
      sidebar.clickLogoutLink();
      expect(browser.getCurrentUrl()).toContain('login');
    });
  });
});
