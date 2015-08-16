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

    describe('options function', function() {
      it('should emit $addon:options and listend to it once', function() {
        $firefox.options();

        expect(firefox.port.emit).toHaveBeenCalled();
        expect(firefox.port.emit.calls.allArgs()[0][0]).toEqual('$addon:options');
        expect(firefox.port.once).toHaveBeenCalled();
        expect(firefox.port.once.calls.allArgs()[0][0]).toEqual('$addon:options');
      });

      it('should pass empty message', function() {
        $firefox.options();
        expect(firefox.port.emit.calls.allArgs()[0][1]).toBeUndefined();
      });

      it('should pass message', function() {
        $firefox.options({ foo: 'bar' });
        expect(firefox.port.emit.calls.allArgs()[0][1]).toEqual({ foo: 'bar' });
      });

      it('should resolve promise on $addon:options', function() {
        var success = jasmine.createSpy('success');
        var error = jasmine.createSpy('error');
        $firefox.options({ foo: 'bar' }).then(success, error);
        firefox.port.once.calls.allArgs()[0][1]();
        $rootScope.$digest();
        expect(success).toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
      });

      it('should reject promise on timeout', function() {
        var success = jasmine.createSpy('success');
        var error = jasmine.createSpy('error');
        $firefox.options({ foo: 'bar' }).then(success, error);
        $timeout.flush();
        expect(success).not.toHaveBeenCalled();
        expect(error).toHaveBeenCalled();
      });
    });
  });
})();
