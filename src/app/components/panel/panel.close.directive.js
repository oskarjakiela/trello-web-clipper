(function() {
  'use strict';

  angular
    .module('twc')
    .directive('twcPanelClose', twcPanelClose);

  /** @ngInject */
  function twcPanelClose($log, $addon) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        element
          .html('&times')
          .on('click', function() {
            $addon.close();
          });
      }
    };
  }
})();
