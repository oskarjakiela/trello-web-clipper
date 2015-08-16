(function() {
  'use strict';

  describe('service $chrome', function() {
    var $chrome, chrome, port, $rootScope, $timeout, $window;

    beforeEach(module('twc'));

    beforeEach(module(function($provide) {
      var connect = jasmine.createSpy('connect');

      port = {
        postMessage: jasmine.createSpy('postMessage'),
        onMessage: {
          addListener: jasmine.createSpy('addListener'),
          removeListener: jasmine.createSpy('removeListener')
        }
      };

      connect.and.returnValue(port);

      chrome = {};
      chrome.extension = {};
      chrome.extension.connect = connect;
      $provide.constant('chrome', chrome);
    }));

    beforeEach(inject(function(_$chrome_, _$rootScope_, _$timeout_, _$window_) {
      $chrome = _$chrome_;
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
      $window = _$window_;
    }));

    describe('options function', function() {
      it('should post $addon:options message', function() {
        $chrome.options();

        expect(port.postMessage).toHaveBeenCalled();
        expect(port.postMessage).toHaveBeenCalledWith({
          id: '$addon:options',
          data: undefined
        });
      });

      it('should pass message in data', function() {
        $chrome.options({ foo: 'bar' });
        expect(port.postMessage).toHaveBeenCalledWith({
          id: '$addon:options',
          data: { foo: 'bar' }
        });
      });

      it('should resolve promise on $addon:options', function() {
        var success = jasmine.createSpy('success');
        var error = jasmine.createSpy('error');
        $chrome.options({ foo: 'bar' }).then(success, error);
        port.onMessage.addListener.calls.allArgs()[1][0]({
          id: '$addon:options'
        });
        $rootScope.$digest();
        expect(success).toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
        expect(port.onMessage.removeListener).toHaveBeenCalled();
      });

      it('should reject promise on timeout', function() {
        var success = jasmine.createSpy('success');
        var error = jasmine.createSpy('error');
        $chrome.options({ foo: 'bar' }).then(success, error);
        port.onMessage.addListener.calls.allArgs()[1][0]({
          id: '$addon:popup'
        });
        $timeout.flush();
        expect(success).not.toHaveBeenCalled();
        expect(error).toHaveBeenCalled();
        expect(port.onMessage.removeListener).toHaveBeenCalled();
      });
    });

    describe('popup hide function', function() {
      beforeEach(function() {
        spyOn($window, 'close');
      });

      it('should close popup', function() {
        var success = jasmine.createSpy('success');
        $chrome.popup.hide().then(success);
        $timeout.flush();
        expect($window.close).toHaveBeenCalled();
        expect(success).toHaveBeenCalled();
      });
    });
  });
})();
