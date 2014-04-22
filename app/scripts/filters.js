angular.module('authApp')

.run(function (RouteFilter, Authentication)
{
    RouteFilter.register('auth', ['/profile'], function()
    {
        return Authentication.exists();
    }, 'signin');

    RouteFilter.register('guest', ['/signin'], function()
    {
        return ! Authentication.exists();
    }, '/');

    RouteFilter.register('developer', ['/settings'], function()
    {
        return Authentication.isDeveloper();
    }, '/');
});