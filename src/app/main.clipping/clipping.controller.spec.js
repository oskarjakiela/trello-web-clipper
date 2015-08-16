(function() {
  'use strict';

  describe('controller ClippingController', function() {
    var $addon, boards, $card, clipping, $scope, $state, storage, Trello;

    beforeEach(module('twc'));

    beforeEach(function() {
      boards = [];
      storage = {};
    });

    beforeEach(inject(function(_$addon_, _$card_, _$rootScope_, _$state_, _Trello_) {
      $addon = _$addon_;
      $card = _$card_;
      $scope = _$rootScope_.$new();
      $state = _$state_;
      Trello = _Trello_;
    }));

    beforeEach(function() {
      spyOn($addon.tabs, 'active').and.callThrough();
      spyOn($addon, 'storage');
      spyOn($card, 'fromTab');
      spyOn($state, 'go');

    });

    describe('always', function() {
      beforeEach(inject(function($controller) {
        $controller('ClippingController as clipping', {
          boards: boards,
          $scope: $scope,
          storage: storage
        });

        clipping = $scope.clipping;
      }));

      it('should have initalised scope', function() {
        expect(clipping.add).toBeDefined();
        expect(clipping.boards).toBeDefined();
        expect(clipping.card).toBeDefined();
        expect(clipping.getPositionLabel).toBeDefined();
        expect(clipping.positions).toBeDefined();
      });

      it('should get card from active tab', function() {
        expect($addon.tabs.active).toHaveBeenCalled();
        expect($card.fromTab).toHaveBeenCalled();
      });

      it('should get position label', function() {
        expect(clipping.getPositionLabel('bottom')).toEqual('Bottom');
        expect(clipping.getPositionLabel('top')).toEqual('Top');
      });

      it('should watch selected board', function() {
        expect(clipping.lists).toBeUndefined();

        $scope.$digest();
        expect(clipping.lists).toBeUndefined();

        clipping.card.board = {
          lists: [
            { id: 1 },
            { id: 2 },
            { id: 3 }
          ]
        };

        $scope.$digest();

        expect(clipping.lists).toEqual([
          { id: 1 },
          { id: 2 },
          { id: 3 }
        ]);
      });

      describe('when adding card', function() {
        beforeEach(function() {
          $card.attachmentUrl = 'https://google.com';
          $card.board = { id: 1 };
          $card.list = { id: 1 };
          clipping.add($card);
        });

        it('should call api', function() {
          spyOn(Trello, 'post').and.callThrough();
          clipping.add($card);

          expect(Trello.post).toHaveBeenCalled();
          expect(Trello.post.calls.argsFor(0)[0]).toEqual('/cards');
          expect(Trello.post.calls.argsFor(0)[1]).toEqual({
            idList: 1,
            name: undefined,
            desc: undefined,
            pos: 'bottom'
          });
        });

        describe('on success', function() {
          beforeEach(function() {
            spyOn(Trello, 'post').and.callFake(function(url, params, success) {

              if (! success) { return; }

              success({
                id: 1,
                url: 'https://trello.com'
              });
            });
            clipping.add($card);
          });

          it('should define card url', function() {
            expect($card.url).toEqual('https://trello.com');
          });

          it('should save page url as attachment', function() {
            expect(Trello.post).toHaveBeenCalled();
            expect(Trello.post).toHaveBeenCalledWith('/cards/1/attachments', {
              name: undefined,
              url: 'https://google.com'
            });
          });

          it('should save board and list id', function() {
            expect($addon.storage).toHaveBeenCalled();
            expect($addon.storage).toHaveBeenCalledWith({
              idBoard: 1,
              idList: 1
            });
          });

          it('should go to success view', function() {
            expect($state.go).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('main.success');
          });
        });

        describe('on error', function() {
          beforeEach(function() {
            spyOn(Trello, 'post').and.callFake(function(url, params, success, error) {
              error();
            });
            clipping.add($card);
          });

          it('should go to error view', function() {
            expect($state.go).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('main.error');
          });
        });
      });
    });

    describe('when storage is filled', function() {
      beforeEach(function() {
        boards = [{
          id: 1
        }, {
          id: 2,
          lists: [{ id: 3 }, { id: 4 }]
        }, {
          id: 3
        }];

        storage = {
          idBoard: 2,
          idList: 3
        };
      });

      beforeEach(inject(function($controller) {
        $controller('ClippingController as clipping', {
          boards: boards,
          $scope: $scope,
          storage: storage
        });

        clipping = $scope.clipping;
      }));

      it('should find saved board', function() {
        expect(clipping.card.board.id).toEqual(2);
      });

      it('should find saved list', function() {
        $scope.$digest();
        expect(clipping.card.list.id).toEqual(3);
      });
    });
  });
})();
