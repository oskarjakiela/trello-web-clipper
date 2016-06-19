(function() {
  'use strict';

  describe('controller SettingsController', function() {
    var $addon, $q, $scope, $state, storage, Trello, vm;

    beforeEach(module('twc'));

    beforeEach(inject(function(_$addon_, _$q_, _$rootScope_, _$state_, _Trello_) {
      $addon = _$addon_;
      $q = _$q_;
      $state = _$state_;
      Trello = _Trello_;

      $scope = _$rootScope_.$new();
      storage = {};
    }));

    beforeEach(inject(function($controller) {
      vm = $controller('SettingsController as settings', {
        $scope: $scope,
        storage: storage
      });
    }));

    it('should be namespaced to settings', function() {
      expect($scope.settings).toBeDefined();
    });

    describe('when save settings', function() {
      beforeEach(function() {
        spyOn($addon, 'storage').and.returnValue($q.resolve());
        spyOn($state, 'go');
      });

      beforeEach(function() {
        vm.save({
          apiKey: 'foo',
          template: 'bar'
        });
        $scope.$digest();
      });

      it('should save them to storage', function() {
        expect($addon.storage).toHaveBeenCalled();
        expect($addon.storage).toHaveBeenCalledWith({
          'options.apiKey': 'foo',
          'options.template': 'bar'
        });
      });

      it('should redirect to the clipping view', function() {
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('main.clipping');
      });
    });

    describe('when log out', function() {
      beforeEach(function() {
        spyOn($addon, 'storage').and.returnValue($q.resolve());
        spyOn($state, 'go');
        spyOn(Trello, 'deauthorize');
      });

      beforeEach(function() {
        vm.logOut();
        $scope.$digest();
      });

      it('should deauthorize Trello', function() {
        expect(Trello.deauthorize).toHaveBeenCalled();
      });

      it('should reset api key and clear the token', function() {
        expect($addon.storage).toHaveBeenCalled();
        expect($addon.storage).toHaveBeenCalledWith({
          'options.apiKey': jasmine.any(String),
          'token': null
        });
      });

      it('should redirect to the authorization view', function() {
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('main.authorization');
      });
    });
  });
})();
