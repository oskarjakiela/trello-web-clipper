(function() {
  'use strict';

  angular
    .module('twc')
    .controller('ClippingController', ClippingController);

  /** @ngInject */
  function ClippingController($addon, boards, $card, properties, $scope, $state, storage, Trello) {
    var vm = this;

    $addon.tabs().then(function (tabs) {
      $card.fromTab(tabs.activeTab);
    });

    vm.add = add;
    vm.boards = boards;
    vm.card = $card;
    vm.getPositionLabel = getPositionLabel;
    vm.positions = properties.positions;

    if (storage.idBoard) {
      vm.card.board = vm.boards.find(function(board) {
        return board.id === storage.idBoard;
      });
    }

    function add(card) {
      Trello.post('/cards', card.toApi(), function (res) {
        $card.url = res.url;

        Trello.post('/cards/' + res.id + '/attachments', {
          name: card.name,
          url: card.attachmentUrl
        });

        $addon.storage({
          idBoard: card.board.id,
          idList: card.list.id
        });

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

        if (storage.idList) {
          vm.card.list = vm.lists.find(function(list) {
            return list.id === storage.idList;
          });
        }
      }
    });
  }
})();
