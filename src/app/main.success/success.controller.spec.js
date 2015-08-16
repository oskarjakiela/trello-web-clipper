(function() {
  'use strict';

  describe('controller SuccessController', function() {
    var $addon, $card, $scope;

    beforeEach(module('twc'));

    beforeEach(inject(function(_$addon_, _$card_, _$rootScope_) {
      $addon = _$addon_;
      $scope = _$rootScope_.$new();

      $card = _$card_;
      $card.url = 'https://google.com';
    }));

    beforeEach(inject(function($controller) {
      spyOn($addon.popup, 'hide');
      spyOn($addon.tabs, 'open').and.callThrough();

      $controller('SuccessController as success', {
        $scope: $scope
      });
    }));

    it('should have openCard method', function() {
      expect($scope.success.openCard).toBeDefined();
    });

    it('should have closePopup method', function() {
      expect($scope.success.closePopup).toBeDefined();
    });

    describe('when open trello card', function() {
      beforeEach(function() {
        $scope.success.openCard();
      });

      it('should open new tab', function() {
        expect($addon.tabs.open).toHaveBeenCalled();
        expect($addon.tabs.open).toHaveBeenCalledWith({
          url: 'https://google.com'
        });
      });

      it('should hide popup on success', function() {
        expect($addon.popup.hide).toHaveBeenCalled();
      });
    });

    describe('when close popup', function() {
      beforeEach(function() {
        $scope.success.closePopup();
      });

      it('should hide popup', function() {
        expect($addon.popup.hide).toHaveBeenCalled();
      });
    });
  });
})();
