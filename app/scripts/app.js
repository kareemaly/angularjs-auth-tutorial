'use strict';

angular
  .module('authApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/loading', {
        templateUrl: 'views/loading.html',
        controller: 'LoadingCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function (Authentication, Application, $rootScope, $location, RouteFilter) {

    Authentication.requestUser().then(function() {

      Application.makeReady();
    });


    $rootScope.$on('$locationChangeStart', function(scope, next, current) {

      if($location.path() === '/loading') return;

      if(! Application.isReady())
      {
        $location.path('loading');
      }

      RouteFilter.run($location.path());
    })
  });
