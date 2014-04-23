'use strict';

angular.module('authApp')
  .factory('Authentication', function Authentication($q, $http, $timeout) {

    var authenticatedUser = null;

    return  {
        requestUser: function()
        {
            var deferred = $q.defer();

            $http.get('/api/user.json').success(function(user)
            {
                $timeout(function()
                {
                    // Check if user is defined first
                    if(user) {

                        authenticatedUser = user;
                    }

                    deferred.resolve(authenticatedUser);
                }, 1000);
                
            }).error(function(error)
            {
                deferred.reject(error);
            });

            return deferred.promise;
        },

        getUser: function()
        {
            return authenticatedUser;
        },

        exists: function()
        {
            return authenticatedUser != null;
        },

        login: function(credentials)
        {
            var deferred = $q.defer();

            $http.post('/auth/login', credentials).success(function(user)
            {
                if(user)
                {
                    authenticatedUser = user;
                    deferred.resolve(user);
                }
                else
                {
                    deferred.reject('Given credentials are incorrect');
                }

            }).error(function(error)
            {
                deferred.reject(error);
            });

            return deferred.promise;
        },


        logout: function()
        {
            authenticatedUser = null;
        },

        isDeveloper: function()
        {
            return this.exists() && authenticatedUser.type == 'developer';
        }
    }
  });
