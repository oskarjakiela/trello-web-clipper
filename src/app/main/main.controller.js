(function() {
  'use strict';

  angular
    .module('twc')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(options, $state, storage, Trello) {
    Trello.setKey(options.key);
    Trello.setToken(storage.token);

    if (Trello.authorized()) {
      $state.go('main.clipping');
    } else {
      $state.go('main.authorization');
    }
  }
})();
