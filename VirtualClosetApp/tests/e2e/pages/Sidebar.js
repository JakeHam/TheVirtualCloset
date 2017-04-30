var Sidebar = function() {
  this.menuButton = element(by.css('button.button.button-icon.button-clear.ion-navicon'));
  this.MyClosetLink = element(by.css('ion-item[href*="mycloset"]'));
  this.SearchLink = element(by.css('ion-item[href*="search"]'));
  this.OutfitsLink = element(by.css('ion-item[href*="outfits"]'));
  this.CalendarLink = element(by.css('ion-item[href*="calendar"]'));
  this.WishListLink = element(by.css('ion-item[href*="wishlist"]'));
  this.ConnectionsLink = element(by.css('ion-item[href*="connections"]'));
  this.OptionsLink = element(by.css('ion-item[href*="options"]'));
  this.LogoutLink = element(by.css('ion-item[href*="logout"]'));

  // no way to tell if open or not, so we toggle instead
  this.toggle = function() {
    this.menuButton.click();
  }

};

module.exports = new Sidebar();
