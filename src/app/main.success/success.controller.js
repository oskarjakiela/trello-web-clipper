(function() {
  'use strict';

  angular
    .module('twc')
    .controller('SuccessController', SuccessController);

  /** @ngInject */
  function SuccessController($log, $addon, $card) {
    $log.info('SuccessController');

    var vm = this;

    vm.closePopup = closePopup;
    vm.openCard = openCard;

    function closePopup() {
      $addon.popup.hide();
    }

    function openCard() {
      $addon.tabs.open({
        url: $card.url
      }).then(function() {
        return $addon.popup.hide();
      });
    }
  }
})();
