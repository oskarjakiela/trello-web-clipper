(function() {
  'use strict';

  describe('directive twcPanelClose', function() {
    var $addon, $compile, element, scope, $rootScope;

    beforeEach(module('twc'));

    beforeEach(inject(function(_$addon_, _$compile_, _$rootScope_) {
      $addon = _$addon_;
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
      spyOn($addon, 'close');
    });

    beforeEach(function() {
      element = angular.element('<span twc-panel-close></span>');
      scope = $rootScope.$new();
      $compile(element)(scope);
      scope.$digest();
    });

    it('should have ×', function() {
      expect(element.text()).toEqual('×');
    });

    it('should close addon on click', function() {
      element.trigger('click');
      expect($addon.close.calls.count()).toEqual(1);
    });
  });

})();
