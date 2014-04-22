'use strict';

angular.module('authApp')
  .controller('MainCtrl', function ($scope, Authentication, RouteFilter) {

    $scope.canAccess = function(route)
    {
        return RouteFilter.canAccess(route);
    }
  });
