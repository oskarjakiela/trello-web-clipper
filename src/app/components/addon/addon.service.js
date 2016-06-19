(function() {
  'use strict';

  angular
    .module('twc')
    .factory('$addon', $addonFactory);

  /** @ngInject */
  function $addonFactory(apiKey, chrome, $chrome, firefox, $firefox, $mock, $q, $template) {
    var $addon = $mock;

    if (chrome) {
      $addon = $chrome;
    }

    if (firefox) {
      $addon = $firefox;
    }

    $addon.init = function init() {
      return $addon.storage().then(function(storage) {
        if (storage['options.apiKey']) {
          return $q.resolve();
        }

        return $addon.reset();
      });
    };

    $addon.reset = function reset() {
      return $addon.storage({
        'options.apiKey': apiKey,
        'options.template': $template.getDefault(),
        'token': null
      });
    };

    $addon.logOut = function logOut() {
      return $addon.storage({
        'options.apiKey': apiKey,
        'token': null
      });
    };

    return $addon;
  }
})();
