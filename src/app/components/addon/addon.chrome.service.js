(function() {
  'use strict';

  angular
    .module('twc')
    .service('$chrome', $chrome);

  /** @ngInject */
  function $chrome(chrome, properties, $q, $timeout, $window) {
    var service  = this;

    if (! chrome) { return; }

    var port = chrome.extension.connect({
      name: 'trello-web-clipper'
    });

    service.manifest = promiseBuilder('manifest');
    service.options = promiseBuilder('options');
    service.storage = promiseBuilder('storage');

    service.tabs = {};
    service.tabs.active = promiseBuilder('tabs:active');
    service.tabs.open = promiseBuilder('tabs:open');

    service.popup = {};
    service.popup.on = promiseBuilder('popup');

    service.popup.hide = function hide() {
      var deferred = $q.defer();

      $timeout(function() {
        $window.close();
        deferred.resolve();
      });

      return deferred.promise;
    };

    service.popup.show = promiseBuilder('popup:show');


    function promiseBuilder(name) {
      var eventName = '$addon:' + name;

      return function(message) {
        var deferred = $q.defer();

        var listener = function listener(message) {
          if (message.id === eventName) {
            deferred.resolve(message.data);
            port.onMessage.removeListener(listener);
          }
        };

        message = message ? message : undefined;

        port.onMessage.addListener(listener);

        port.postMessage({
          id: eventName,
          data: message
        });

        $timeout(function() {
          port.onMessage.removeListener(listener);
          deferred.reject('Timeout');
        }, 5000);

        return deferred.promise;
      };
    }
  }
})();
