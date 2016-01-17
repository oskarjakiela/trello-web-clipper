(function() {
  'use strict';

  describe('directive twcPanel', function() {
    var $addon, $compile, element, scope, $rootScope, $state;

    beforeEach(module('twc'));

    beforeEach(inject(function(_$addon_, _$compile_, _$rootScope_, _$state_) {
      $addon = _$addon_;
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $state = _$state_;
    }));

    beforeEach(function() {
      spyOn($addon.popup, 'hide');
      spyOn($state, 'go');
    });

    beforeEach(function() {
      element = angular.element('<span twc-panel></span>');
      scope = $rootScope.$new();
      $compile(element)(scope);
      scope.$digest();
    });

    describe('close button', function() {
      var closeBtn;

      beforeEach(function() {
        closeBtn = element.find('.twc-panel__close');
      });

      it('should have ×', function() {
        expect(closeBtn.text()).toEqual('×');
      });

      it('should close addon on click', function() {
        closeBtn.trigger('click');
        expect($addon.popup.hide.calls.count()).toEqual(1);
      });
    });

    describe('settings button', function() {
      var settingsBtn;

      beforeEach(function() {
        settingsBtn = element.find('.twc-panel__settings');
      });

      it('should be svg icon', function() {
        expect(settingsBtn.find('svg').length).toEqual(1);
      });

      it('should go to settings on click', function() {
        settingsBtn.trigger('click');
        expect($state.go).toHaveBeenCalledWith('main.settings');
        expect($state.go.calls.count()).toEqual(1);
      });
    });
  });

})();
