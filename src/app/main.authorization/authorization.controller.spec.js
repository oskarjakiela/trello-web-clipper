(function() {
  'use strict';

  describe('controller AuthorizationController', function() {
    var $addon, $scope, Trello;

    beforeEach(module('twc'));

    beforeEach(inject(function(_$addon_, _$rootScope_, _Trello_) {
      $addon = _$addon_;
      $scope = _$rootScope_.$new();
      Trello = _Trello_;
    }));

    beforeEach(inject(function($controller) {
      spyOn($addon, 'storage').and.callThrough();
      spyOn(Trello, 'token').and.returnValue('abcdefghijklmnop');
      spyOn(Trello, 'authorize').and.callFake(function() {
        var options = Trello.authorize.calls.argsFor(0)[0];
        options.success();
      });

      $controller('AuthorizationController as authorization', {
        manifest: { title: 'Web Clipper for Trello' },
        $scope: $scope
      });
    }));

    describe('always', function() {
      it('should have default expiration', function() {
        expect($scope.authorization.expiration).toEqual('30days');
      });
    });

    describe('when log in', function() {
      beforeEach(function() {
        $scope.authorization.logIn();
      });

      it('should authorize Trello', function() {
        expect(Trello.authorize).toHaveBeenCalled();
      });

      it('should use title form manifest as name', function() {
        expect(Trello.authorize.calls.argsFor(0)[0].name).toEqual('Web Clipper for Trello');
      });

      it('should save token to storage', function() {
        expect($addon.storage).toHaveBeenCalled();
        expect($addon.storage).toHaveBeenCalledWith({
          token: 'abcdefghijklmnop'
        });
      });
    });
  });
})();
