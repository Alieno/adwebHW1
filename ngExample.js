var ngRouteExample = angular.module('ngRouteExample', ['ngRoute', 'myController', 'ngAnimate']);
ngRouteExample.config(function ($routeProvider) {
                $routeProvider.
                when('/login', {
                    templateUrl: 'login.html',
                    controller: 'LoginController'
                }).
                when('/register', {
                    templateUrl: 'register.html',
                    controller: 'RegisterController'
                }).
                otherwise({
                    redirectTo: '/login'
                });
            });


var myController = angular.module('myController', []);
    myController.controller('LoginController', ['$scope', function ($scope) {}]);
    myController.controller('RegisterController', ['$scope', function ($scope) {$scope.user = 'John Doe';$scope.email = 'john.doe@gmail.com';}]);
            
            


            
