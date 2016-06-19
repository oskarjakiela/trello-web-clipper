(function() {
  'use strict';

  angular
    .module('twc')
    .service('$chrome', $chrome);

  /** @ngInject */
  function $chrome($log, chrome, properties, $q, $timeout, $window) {
    var service  = this;

    if (! chrome) { return; }

    var port = chrome.extension.connect({ name: 'trello-web-clipper' });

    service.on = function(eventName, callback) {
      port.onMessage.addListener(function (request) {
        if (request.id === eventName) { callback(); }
      });
    };

    service.manifest = promiseBuilder('manifest');
    service.storage = promiseBuilder('storage');
    service.token = promiseBuilder('token');

    service.tabs = {};
    service.tabs.active = promiseBuilder('tabs:active');
    service.tabs.open = promiseBuilder('tabs:open');

    service.popup = {};

    service.popup.hide = function hide() {
      $window.close();
      return $q.resolve();
    };

    service.popup.show = function show() {
      return $q.resolve();
    };

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

        deferred.promise.catch(function(reason) {
          $log.error(eventName, reason);
        });

        return deferred.promise;
      };
    }
  }
})();
