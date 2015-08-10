(function() {
  'use strict';

  angular
    .module('twc')
    .service('$mock', $mock);

  /** @ngInject */
  function $mock() {
    var service = this;

    service.options = promiseBuilder({
      'key': 'aaaabbbbccccddddeeeeffffgggghhhh',
      'desc.template': '[{{ title }}]({{ url }})\n\nvia [Trello Web Clipper](https://addons.mozilla.org/en-US/firefox/addon/trello-web-clipper/)'
    });

    service.storage = promiseBuilder({
      // idBoard: 'aaaabbbbccccddddeeeeffff',
      // idList: 'aaaabbbbccccddddeeeeffff',
      token: 'aaaabbbbccccddddeeeeffffgggghhhhiiiijjjjkkkkllllmmmmnnnnoooopppp'
    });

    service.tabs = promiseBuilder({
      activeTab: {
        title: 'Google',
        url: 'https://google.com'
      }
    });

    service.manifest = promiseBuilder({
      name: 'trello-web-clipper',
      title: 'Trello Web Clipper',
      version: '0.0.0'
    });

    service.popup = {};
    service.popup.on = angular.noop;
    service.popup.hide = promiseBuilder();
    service.popup.show = promiseBuilder();
    service.popup.message = promiseBuilder();


    function promiseBuilder(returns) {
      return function() {
        return {
          then: function (callback) {
            callback(returns);
          }
        };
      };
    }
  }
})();
