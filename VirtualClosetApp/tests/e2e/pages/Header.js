var Header = function() {
  this.backButton = element.all(by.css('ion-header-bar > button.back-button')).first(),
  this.addNewItemButton = element(by.css('a.icon[href="#/app/newItem"]'))
};

module.exports = new Header();
