(function() {
  'use strict';

  describe('service $firefox', function() {
    var $firefox, firefox, $rootScope, $timeout;

    beforeEach(module('twc'));

    beforeEach(module(function($provide) {
      firefox = {};
      firefox.port = jasmine.createSpyObj('port', ['emit', 'on', 'once', 'removeListener']);
      $provide.constant('firefox', firefox);
    }));

    beforeEach(inject(function(_$firefox_, _$rootScope_, _$timeout_) {
      $firefox = _$firefox_;
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
    }));

    describe('storage function', function() {
      it('should emit $addon:storage and listend to it once', function() {
        $firefox.storage();

        expect(firefox.port.emit).toHaveBeenCalled();
        expect(firefox.port.emit.calls.allArgs()[0][0]).toEqual('$addon:storage');
        expect(firefox.port.once).toHaveBeenCalled();
        expect(firefox.port.once.calls.allArgs()[0][0]).toEqual('$addon:storage');
      });

      it('should pass empty message', function() {
        $firefox.storage();
        expect(firefox.port.emit.calls.allArgs()[0][1]).toBeUndefined();
      });

      it('should pass message', function() {
        $firefox.storage({ foo: 'bar' });
        expect(firefox.port.emit).toHaveBeenCalledWith('$addon:storage', { foo: 'bar' });
      });

      it('should resolve promise on $addon:storage', function() {
        var success = jasmine.createSpy('success');
        var error = jasmine.createSpy('error');
        $firefox.storage({ foo: 'bar' }).then(success, error);
        firefox.port.once.calls.allArgs()[1][1]();
        $rootScope.$digest();
        expect(success).toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
      });

      it('should reject promise on timeout', function() {
        var success = jasmine.createSpy('success');
        var error = jasmine.createSpy('error');
        $firefox.storage({ foo: 'bar' }).then(success, error);
        $timeout.flush();
        expect(success).not.toHaveBeenCalled();
        expect(error).toHaveBeenCalled();
      });
    });
  });
})();
