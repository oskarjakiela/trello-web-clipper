(function() {
  'use strict';

  describe('controller MainController', function() {
    var init, $state, Trello;

    beforeEach(module('twc'));

    beforeEach(inject(function(_$state_, _Trello_) {
      $state = _$state_;
      Trello = _Trello_;
    }));

    beforeEach(inject(function($controller){
      init = function() {
        spyOn($state, 'go');

        spyOn(Trello, 'setKey');
        spyOn(Trello, 'setToken');

        $controller('MainController', {
          options: { key: 'abcdefgh' },
          storage: { token: 'abcdefghijklmnop' }
        });
      };
    }));

    describe('always', function() {
      beforeEach(init);

      it('should set key from options', function() {
        expect(Trello.setKey.calls.count()).toEqual(1);
        expect(Trello.setKey.calls.argsFor(0)).toEqual(['abcdefgh']);
      });

      it('should set token from storage', function() {
        expect(Trello.setToken.calls.count()).toEqual(1);
        expect(Trello.setToken.calls.argsFor(0)).toEqual(['abcdefghijklmnop']);
      });
    });

    describe('when user is authorized', function() {
      beforeEach(function() {
        spyOn(Trello, 'authorized').and.returnValue(true);
        init();
      });

      it('should go to clipping view', function() {
        expect($state.go.calls.count()).toEqual(1);
        expect($state.go.calls.argsFor(0)).toEqual(['main.clipping']);
      });
    });

    describe('when user is not authorized', function() {
      beforeEach(function() {
        spyOn(Trello, 'authorized').and.returnValue(false);
        init();
      });

      it('should go to authorization view', function() {
        expect($state.go.calls.count()).toEqual(1);
        expect($state.go.calls.argsFor(0)).toEqual(['main.authorization']);
      });
    });
  });
})();
