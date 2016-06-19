(function() {
  'use strict';

  angular
    .module('twc')
    .service('$firefox', $firefox);

  /** @ngInject */
  function $firefox($log, firefox, $q, $state, $timeout) {
    var service = this;

    if (! firefox) { return; }

    var port = firefox.port;

    service.on = function(eventName, callback) {
      port.on('$addon' , function (request) {
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
    service.popup.hide = promiseBuilder('popup:hide');
    service.popup.show = promiseBuilder('popup:show');

    function promiseBuilder(name) {
      var eventName = '$addon:' + name;

      return function(message) {
        var deferred = $q.defer();

        var listener = function listener(message) {
          if (message.id === eventName) {
            deferred.resolve(message.data);
            port.removeListener(message.id, listener);
          }
        };

        message = message ? message : undefined;

        port.on('$addon', listener);

        port.emit('$addon', {
          id: eventName,
          data: message
        });

        $timeout(function() {
          port.removeListener('$addon', listener);
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
