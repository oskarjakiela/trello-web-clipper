(function() {
  'use strict';

  describe('controller ErrorController', function() {
    var $scope;

    beforeEach(module('twc'));

    beforeEach(inject(function(_$rootScope_) {
      $scope = _$rootScope_.$new();
    }));

    beforeEach(inject(function($controller) {
      $controller('ErrorController as error', {
        $scope: $scope
      });
    }));

    it('should be namespaced to error', function() {
      expect($scope.error).toBeDefined();
    });
  });
})();
