(function() {
  'use strict';

  angular
    .module('oj.trelloWebClipper')
    .controller('SuccessController', SuccessController);

  /** @ngInject */
  function SuccessController($log, $card, self) {
    var vm = this;

    vm.openCard = openCard;

    function openCard() {
      self.port.emit('openCard', $card.url);
    }
  }
})();
