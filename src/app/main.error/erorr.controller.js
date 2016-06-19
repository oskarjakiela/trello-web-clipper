(function() {
  'use strict';

  angular
    .module('twc')
    .controller('ErrorController', ErrorController);

  /** @ngInject */
  function ErrorController($log) {
    $log.info('ErrorController');
  }
})();
