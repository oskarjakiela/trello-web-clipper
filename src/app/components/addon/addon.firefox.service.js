(function() {
  'use strict';

  angular
    .module('twc')
    .service('$firefox', $firefox);

  /** @ngInject */
  function $firefox(firefox, $q, $timeout) {
    var service = this;

    if (! firefox) { return; }

    var port = firefox.port;

    service.manifest = promiseBuilder('manifest');
    service.options = promiseBuilder('options');
    service.storage = promiseBuilder('storage');

    service.tabs = {};
    service.tabs.active = promiseBuilder('tabs:active');
    service.tabs.open = promiseBuilder('tabs:open');

    service.popup = {};
    service.popup.on = function onPopup(eventName, callback) {
      port.on('$addon:popup:' + eventName, callback);
    };
    service.popup.hide = promiseBuilder('popup:hide');


    function promiseBuilder(name) {
      var eventName = '$addon:' + name;

      return function(message) {
        var deferred = $q.defer();

        var listener = function listener(message) {
          deferred.resolve(message);
        };

        message = message ? message : undefined;

        port.emit(eventName, message);
        port.once(eventName, listener);

        $timeout(function() {
          port.removeListener(eventName, listener);
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
