(function() {
  'use strict';

  describe('service $addon', function() {
    var $addon;

    beforeEach(module('twc'));

    // spyOn(foo, "getBar").and.returnValue(745);

    beforeEach(inject(function(_$addon_) {
      $addon = _$addon_;
    }));

    describe('init function', function() {
      describe('when there is not an api key', function() {
        beforeEach(function() {
          spyOn($addon, 'storage').and.returnValue({
            then: function(callback) { callback({}); }
          });
        });

        it('should add default to storage', function() {
          $addon.init();

          expect($addon.storage).toHaveBeenCalled();
          expect($addon.storage).toHaveBeenCalledWith({
            'options.apiKey': 'e8b6ba838382302e68e9ad90a139bc7a',
            'options.template': jasmine.any(String),
            'token': null
          });
        });
      });
    });
  });
})();
