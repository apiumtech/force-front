/**
 * Created by apium on 5/20/15.
 */

define([], function(){

   function LogInRouteRegister($routeProvider) {
       $routeProvider.when('/', $routeProvider.routeResolve('modules/login/LogInController', 'modules/login/login'));
   }

    return {
        register: LogInRouteRegister
    };
});