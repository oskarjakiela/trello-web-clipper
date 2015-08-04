(function() {
  'use strict';

  angular
    .module('oj.trelloWebClipper')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($state, Trello) {
    if (Trello.authorized()) {
      $state.go('main.clipping');
    } else {
      $state.go('main.authorization');
    }
  }
})();
