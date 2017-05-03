var NewItemPage = function() {
  this.topsOption = element(by.cssContainingText('option', 'Tops')),
  this.pantsOption = element(by.cssContainingText('option', 'Pants')),
  this.shoesOption = element(by.cssContainingText('option', 'Shoes')),
  this.formalOption = element(by.cssContainingText('option', 'Formal')),
  this.jacketsOption = element(by.cssContainingText('option', 'Jackets')),
  this.accessoriesOption = element(by.cssContainingText('option', 'Accessories')),
  this.saveButton = element(by.css('button[ng-click="backtocloset(item)"]')),

  var EC = protractor.ExpectedConditions;

  this.nameInput = element(by.css('input[id="item Name"]')),
  this.brandInput = element(by.css('input[id="item Brand"]')),
  this.colorInput = element(by.css('input[id="item Color"]')),

  this.fillName = function(name) {
    this.nameInput.clear();
    this.nameInput.sendKeys(name);
  },
  this.fillBrand = function(brand) {
    this.brandInput.clear();
    this.brandInput.sendKeys(brand);
  },
  this.fillColor = function(color) {
    this.colorInput.clear();
    this.colorInput.sendKeys(color);
  },
  this.saveItem = function() {
    this.saveButton.click();
    browser.wait(EC.urlContains('mycloset'), 1000);
  }
};

module.exports = new NewItemPage();
