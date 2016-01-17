(function() {
  'use strict';

  angular
    .module('twc')
    .directive('twcPanel', twcPanel);

  function twcPanel() {
    return {
      restrict: 'A',
      scope: {
        title: '@'
      },
      bindToController: true,
      transclude: true,
      controller: twcPanelController,
      controllerAs: 'panel',
      templateUrl: 'app/components/panel/panel.html'
    };
  }

  /** @ngInject */
  function twcPanelController($addon, $state) {
    var vm = this;

    vm.settings = function() {
      $state.go('main.settings');
    };

    vm.close = function() {
      $addon.popup.hide();
    };
  }
})();
