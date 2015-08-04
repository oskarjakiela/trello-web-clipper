(function() {
  'use strict';

  angular
    .module('oj.trelloWebClipper')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('main.authorization', {
        url: 'authorization',
        templateUrl: 'app/main.authorization/authorization.html',
        controller: 'AuthorizationController',
        controllerAs: 'authorization'
      })
      .state('main.clipping', {
        url: 'clipping',
        templateUrl: 'app/main.clipping/clipping.html',
        controller: 'ClippingController',
        controllerAs: 'clipping',
        resolve: {
          boards: function($q, Trello) {
            var deferred = $q.defer();

            Trello.get('/members/me/boards?fields=name&filter=open&lists=open', function(boards) {
              deferred.resolve(boards);
            });

            return deferred.promise;
          }
        }
      })
      .state('main.error', {
        url: 'error',
        templateUrl: 'app/main.error/error.html',
        controller: 'ErrorController',
        controllerAs: 'error'
      })
      .state('main.success', {
        url: 'success',
        templateUrl: 'app/main.success/success.html',
        controller: 'SuccessController',
        controllerAs: 'success'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
