(function() {
  'use strict';

  angular
    .module('oj.trelloWebClipper')
    .service('$card', $card);

  /** @ngInject */
  function $card($log, $addon, properties) {
    var service = this;

    service.position = properties.defaults.position;

    service.fromTab = fromTab;
    service.toApi = toApi;

    function fromTab(tab) {
      if (! tab) { return service; }

      service.name = tab.title;
      service.attachmentUrl = tab.url;

      service.desc = $addon.prefs['desc.template']
        .replace(/{{\s*title\s*}}/g, tab.title)
        .replace(/{{\s*url\s*}}/g, tab.url);

      return service;
    }

    function toApi() {
      return {
        idList: service.list.id,
        name: service.name,
        desc: service.desc,
        pos: service.position
      };
    }
  }
})();
