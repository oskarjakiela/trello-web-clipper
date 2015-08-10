(function() {
  'use strict';

  angular
    .module('twc')
    .controller('SuccessController', SuccessController);

  /** @ngInject */
  function SuccessController($addon, $card) {
    var vm = this;

    vm.openCard = openCard;

    function openCard() {
      $addon.tabs({
        method: 'open',
        args: [$card.url, { inNewWindow: true }]
      }).then(function() {
        return $addon.popup.hide();
      });
    }
  }
})();
