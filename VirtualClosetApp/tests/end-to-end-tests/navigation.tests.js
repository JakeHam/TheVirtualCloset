describe('Navigation: ', function () {
  beforeEach(function (){
    browser.sleep(3000);
    browser.get('/#/app/mycloset');
  });

  describe('Clicking the tops button ', function (){
    var topsButton = element(by.css('i.flaticon-t-shirt'));

    topsButton.click();

    it('should link to tops page', function (){
      browser.refresh();
      expect(browser.getCurrentUrl()).toMatch('/app/tops');
    });
  });

  describe('Clicking the pants button ', function (){
    var pantsButton = element(by.css('i.flaticon-fashion'));

    pantsButton.click();

    it('should link to tops page', function (){
      browser.refresh();
      expect(browser.getCurrentUrl()).toMatch('/app/pants');
    });
  });

  describe('Clicking the shoes button ', function (){
    var shoesButton = element(by.css('i.flaticon-sport'));

    shoesButton.click();

    it('should link to shoes page', function (){
      browser.refresh();
      expect(browser.getCurrentUrl()).toMatch('/app/shoes');
    });
  });

  describe('Clicking the formal button ', function (){
    var formalButton = element(by.css('i.flaticon-party'));

    formalButton.click();

    it('should link to shoes page', function (){
      browser.refresh();
      expect(browser.getCurrentUrl()).toMatch('/app/formal');
    });
  });

  describe('Clicking the jackets button ', function (){
    var jacketsButton = element(by.css('i.flaticon-man'));

    jacketsButton.click();

    it('should link to jackets page', function (){
      browser.refresh();
      expect(browser.getCurrentUrl()).toMatch('/app/jackets');
    });
  });

  describe('Clicking the accessories button ', function (){
    var accessoriesButton = element(by.css('i.flaticon-fashion-1'));

    accessoriesButton.click();

    it('should link to accessories page', function (){
      browser.refresh();
      expect(browser.getCurrentUrl()).toMatch('/app/accessories');
    });
  });

});
