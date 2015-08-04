(function() {
  'use strict';

  angular
    .module('oj.trelloWebClipper')
    .controller('ClippingController', ClippingController);

  /** @ngInject */
  function ClippingController($log, $addon, boards, $card, properties, $scope, $state, Trello) {
    var vm = this;

    $card.fromTab($addon.tabs.activeTab);

    vm.add = add;
    vm.boards = boards;
    vm.card = $card;
    vm.getPositionLabel = getPositionLabel;
    vm.positions = properties.positions;

    if ($addon.storage.idBoard) {
      vm.card.board = vm.boards.find(function(board) {
        return board.id === $addon.storage.idBoard;
      });
    }


    function add(card) {
      Trello.post('/cards', card.toApi(), function (res) {
        $card.url = res.url;

        Trello.post('/cards/' + res.id + '/attachments', {
          name: card.name,
          url: card.attachmentUrl
        });

        $addon.storage.save('idBoard', card.board.id);
        $addon.storage.save('idList', card.list.id);
        $state.go('main.success');
      }, function () {
        $state.go('main.error');
      });
    }

    function getPositionLabel(position) {
      return properties.positions[position];
    }

    $scope.$watch('clipping.card.board', function () {
      if (vm.card.board) {
        vm.lists = vm.card.board.lists;

        if ($addon.storage.idList) {
          vm.card.list = vm.lists.find(function(list) {
            return list.id === $addon.storage.idList;
          });
        }
      }
    });

    $addon.tabs.onChange(function () {
      $card.fromTab($addon.tabs.activeTab);
      $scope.$digest();
    });

    $log.debug('ClippingController: %o', vm);
  }
})();
