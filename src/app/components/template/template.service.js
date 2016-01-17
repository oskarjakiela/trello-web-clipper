(function() {
  'use strict';

  angular
    .module('twc')
    .constant('chromeWebStoreUrl', 'https://chrome.google.com/webstore/detail/bgldhlkimfdidhgmndninednbehpcenk')
    .constant('firefoxAddOnsUrl', 'https://addons.mozilla.org/en-US/firefox/addon/trello-web-clipper/')
    .service('$template', $template);

  /** @ngInject */
  function $template(_, chrome, chromeWebStoreUrl, firefox, firefoxAddOnsUrl) {
    var service  = this;

    var templateSettings = {
      interpolate: /{{([\s\S]+?)}}/g
    };

    service.data ={
      addon: {
        title: 'Web Clipper for Trello',
        url: 'https://github.com/oskarjakiela/trello-web-clipper'
      },
      page: {}
    };

    if (chrome) {
      service.data.addon.url = chromeWebStoreUrl;
    }

    if (firefox) {
      service.data.addon.url = firefoxAddOnsUrl;
    }

    service.getDefault = function getDefaultTemplate() {
      return [
        '[{{ page.title }}]({{ page.url }})\n',
        'via [{{ addon.title }}]({{ addon.url }})'
      ].join('\n');
    };

    service.getError = function getErrorTemplate() {
      return [
        '**Error**',
        '{{ error.message }}\n',
        service.getDefault()
      ].join('\n');
    };

    service.render = function renderTemplate(string, data) {
      var compiled = _.template(string, templateSettings);
      var rendered;

      data = angular.extend({}, service.data, data);

      try {
        rendered = compiled(data);
      } catch (error) {
        compiled = _.template(service.getError(), templateSettings);
        rendered = compiled(angular.extend(data, {
          error: { message: error.toString() }
        }));
      }

      return rendered;
    };

  }
})();
