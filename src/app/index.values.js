(function() {
  'use strict';

  angular
    .module('oj.trelloWebClipper')
    .value('properties', {
      defaults: {
        expiration: '30days',
        position: 'bottom'
      },

      expirations: {
        '1hour': 'for 1 hour',
        '1day': 'for 1 day',
        '30days': 'for 30 days',
        'never': 'forever'
      },

      positions: {
        'top': 'Top',
        'bottom': 'Bottom'
      }
    });

})();
