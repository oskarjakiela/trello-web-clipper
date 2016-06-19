(function() {
  'use strict';

  angular
    .module('twc')
    .controller('ClippingController', ClippingController);

  /** @ngInject */
  function ClippingController(activeTab, $addon, boards, $card, properties, $scope, $state, storage, $timeout, Trello) {
    var vm = this;

    vm.add = add;
    vm.boards = boards;
    vm.card = $card.fromTab(activeTab);
    vm.getPositionLabel = getPositionLabel;
    vm.positions = properties.positions;

    if (! Trello.authorized()) {
      $state.go('main');
    }

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

    $addon.on('$addon:popup:show', function() {
      $addon.tabs.active().then(function(activeTab) {
        $timeout(function() {
          vm.card = $card.fromTab(activeTab);
        });
      });
    });

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
