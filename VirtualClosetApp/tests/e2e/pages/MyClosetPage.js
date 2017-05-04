var MyClosetPage = function() {
  this.topsButton = element(by.css('i.flaticon-t-shirt')),
  this.pantsButton = element(by.css('i.flaticon-fashion')),
  this.shoesButton = element(by.css('i.flaticon-sport')),
  this.formalButton = element(by.css('i.flaticon-party')),
  this.jacketsButton = element(by.css('i.flaticon-man')),
  this.accessoriesButton = element(by.css('i.flaticon-fashion-1'))

  this.get = function() {
    browser.get('#/app/mycloset');
  }
};

module.exports = new MyClosetPage();
