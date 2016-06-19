(function() {
  'use strict';

  describe('service $firefox', function() {
    var $firefox, firefox, $rootScope, $timeout;

    beforeEach(module('twc'));

    beforeEach(module(function($provide) {
      firefox = {};
      firefox.port = jasmine.createSpyObj('port', ['emit', 'on', 'removeListener']);
      $provide.constant('firefox', firefox);
    }));

    beforeEach(inject(function(_$firefox_, _$rootScope_, _$timeout_) {
      $firefox = _$firefox_;
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
    }));

    describe('storage function', function() {
      it('should emit $addon:storage and listend to it', function() {
        $firefox.storage();

        expect(firefox.port.emit).toHaveBeenCalled();
        expect(firefox.port.emit.calls.allArgs()[0][0]).toEqual('$addon');
        expect(firefox.port.on).toHaveBeenCalled();
        expect(firefox.port.on.calls.allArgs()[0][0]).toEqual('$addon');
      });

      it('should pass empty message', function() {
        $firefox.storage();
        expect(firefox.port.emit).toHaveBeenCalledWith('$addon', {
          id: '$addon:storage',
          data: undefined
        });
      });

      it('should pass message', function() {
        $firefox.storage({ foo: 'bar' });
        expect(firefox.port.emit).toHaveBeenCalledWith('$addon', {
          id: '$addon:storage',
          data: { foo: 'bar' }
        });
      });

      it('should resolve promise on $addon:storage', function() {
        var success = jasmine.createSpy('success');
        var error = jasmine.createSpy('error');
        $firefox.storage({ foo: 'bar' }).then(success, error);
        firefox.port.on.calls.allArgs()[1][1]({
          id: '$addon:storage'
        });
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
