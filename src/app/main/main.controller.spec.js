(function() {
  'use strict';

  describe('controller MainController', function() {
    var init, $rootScope, $state, Trello;

    beforeEach(module('twc'));

    beforeEach(inject(function(_$rootScope_, _$state_, _Trello_) {
      $rootScope = _$rootScope_;
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

    afterEach(function() {
      $state.go.calls.reset();
    });

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
        expect($state.go).toHaveBeenCalledWith('main.clipping');
      });
    });

    describe('when user is not authorized', function() {
      beforeEach(function() {
        spyOn(Trello, 'authorized').and.returnValue(false);
        init();
      });

      it('should go to authorization view', function() {
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('main.authorization');
      });
    });

    describe('when state error', function() {
      describe('is 401', function() {
        beforeEach(function() {
          spyOn(Trello, 'deauthorize');
          init();
          $rootScope.$broadcast('$stateChangeError', {}, {}, {}, {}, { status: 401 });
        });

        it('should deauthorize Trello', function() {
          expect(Trello.deauthorize.calls.count()).toEqual(1);
        });

        it('should go to authorization view', function() {
          expect($state.go).toHaveBeenCalled();
          expect($state.go).toHaveBeenCalledWith('main.authorization');
        });

        it('should loop in error view', function() {
          expect($state.go).not.toHaveBeenCalledWith('main.error');
        });
      });

      describe('is unrecognized', function() {
        beforeEach(function() {
          init();
          $rootScope.$broadcast('$stateChangeError', {}, {}, {}, {}, {});
        });

        it('should go to error view', function() {
          expect($state.go).toHaveBeenCalled();
          expect($state.go).toHaveBeenCalledWith('main.error');
        });
      });
    });

  });
})();
