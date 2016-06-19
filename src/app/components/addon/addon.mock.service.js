(function() {
  'use strict';

  angular
    .module('twc')
    .service('$mock', $mock);

  /** @ngInject */
  function $mock() {
    var service = this;

    service.on = angular.noop;

    service.storage = promiseBuilder({
      // idBoard: 'aaaabbbbccccddddeeeeffff',
      // idList: 'aaaabbbbccccddddeeeeffff',
      'options.apiKey': 'aaaabbbbccccddddeeeeffffgggghhhh',
      'options.template': [
        '[{{ page.title }}]({{ page.url }})\n',
        'via [{{ addon.title }}]({{ addon.url }})'
      ].join('\n'),
      token: 'aaaabbbbccccddddeeeeffffgggghhhhiiiijjjjkkkkllllmmmmnnnnoooopppp'
    });

    service.tabs = {};
    service.tabs.active = promiseBuilder({
      title: 'Google',
      url: 'https://google.com'
    });

    service.tabs.open = promiseBuilder({
      url: 'https://google.com'
    });

    service.token = promiseBuilder('aaaabbbbccccddddeeeeffffgggghhhhiiiijjjjkkkkllllmmmmnnnnoooopppp');

    service.manifest = promiseBuilder({
      name: 'trello-web-clipper',
      title: 'Web Clipper for Trello',
      version: '0.0.0'
    });

    service.popup = {};
    service.popup.on = angular.noop;
    service.popup.hide = promiseBuilder();
    service.popup.show = promiseBuilder();

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
