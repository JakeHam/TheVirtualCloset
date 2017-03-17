// this suite will most likely fail once further implementation is added
beforeEach(function(){
    browser.get('/#/app/mycloset');
});

describe('Clicking the tops button ', function(){
    var topsButton = element(by.css('i.flaticon-t-shirt'));

    topsButton.click();

    it('should link to tops page', function(){
        expect(browser.getLocationAbsUrl()).toMatch('/#/app/tops');
    });
});

describe('Clicking the pants button ', function(){
    var pantsButton = element(by.css('i.flaticon-fashion'));

    pantsButton.click();

    it('should link to tops page', function(){
        expect(browser.getLocationAbsUrl()).toMatch('/#/app/pants');
    });
});

describe('Clicking the shoes button ', function(){
    var shoesButton = element(by.css('i.flaticon-sport'));

    shoesButton.click();

    it('should link to shoes page', function(){
        expect(browser.getLocationAbsUrl()).toMatch('/#/app/shoes');
    });
});

describe('Clicking the formal button ', function(){
    var formalButton = element(by.css('i.flaticon-party'));

    formalButton.click();

    it('should link to shoes page', function(){
        expect(browser.getLocationAbsUrl()).toMatch('/#/app/formal');
    });
});

describe('Clicking the jackets button ', function(){
    var jacketsButton = element(by.css('i.flaticon-man'));

    jacketsButton.click();

    it('should link to jackets page', function(){
        expect(browser.getLocationAbsUrl()).toMatch('/#/app/jackets');
    });
});

describe('Clicking the accessories button ', function(){
    var accessoriesButton = element(by.css('i.flaticon-fashion-1'));

    accessoriesButton.click();

    it('should link to accessories page', function(){
        expect(browser.getLocationAbsUrl()).toMatch('/#/app/accessories');
    });
});