(function() {
  'use strict';

  angular
    .module('twc')
    .service('$firefox', $firefox);

  /** @ngInject */
  function $firefox(self, $q, $timeout) {
    var service = this;

    service.options = promiseBuilder('options');
    service.storage = promiseBuilder('storage');
    service.tabs = promiseBuilder('tabs');
    service.manifest = promiseBuilder('manifest');

    service.popup = {};
    service.popup.on = function onPopup(eventName, callback) {
      self.port.on('$addon:popup:' + eventName, callback);
    };

    service.popup.hide = promiseBuilder('popup:hide');
    service.popup.show = promiseBuilder('popup:show');
    service.popup.message = promiseBuilder('popup:message');


    function promiseBuilder(name) {
      var eventName = '$addon:' + name;

      return function(message) {
        var deferred = $q.defer();

        var listener = function listener(message) {
          deferred.resolve(message);
        };

        message = message ? message : undefined;

        self.port.emit(eventName, message);
        self.port.once(eventName, listener);

        $timeout(function() {
          self.port.removeListener(eventName, listener);
          deferred.reject('Timeout');
        }, 5000);

        return deferred.promise;
      };
    }
  }
})();
