(function() {
  'use strict';

  angular
    .module('trelloWebClipperJs')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
