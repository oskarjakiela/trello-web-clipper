(function() {
  'use strict';

  angular
    .module('oj.trelloWebClipper')
    .service('$addon', $addon);

  /** @ngInject */
  function $addon($log, self, $state) {
    var service = this;

    var callbacks = {
      storage: angular.noop,
      prefs: angular.noop,
      tabs: angular.noop
    };

    service.close = close;

    service.storage = {};
    service.storage.save = function(key, value) {
      service.storage[key] = value;
      self.port.emit(['storage', key].join('.'), value);
    };
    service.storage.onChange = function (callback) {
      callbacks.storage = callback;
    };

    service.pkg = {};

    service.prefs = {};
    service.prefs.onChange = function (callback) {
      callbacks.prefs = callback;
    };

    service.tabs = {};
    service.tabs.onChange = function (callback) {
      callbacks.tabs = callback;
    };

    self.port.on('storage', function(message) {
      service.storage = angular.extend(service.storage, angular.fromJson(message));
      callbacks.storage();
    });

    self.port.on('pkg', function(message) {
      service.pkg = angular.extend(service.pkg, angular.fromJson(message));
    });

    self.port.on('prefs', function(message) {
      service.prefs = angular.extend(service.prefs, angular.fromJson(message));
      callbacks.prefs();
    });

    self.port.on('tabs', function(message) {
      service.tabs = angular.extend(service.tabs, angular.fromJson(message));
      callbacks.tabs();
    });

    self.port.on('go', function(message) {
      $state.go(message, {}, { reload: true });
    });

    function close() {
      self.port.emit('close');
    }
  }
})();
