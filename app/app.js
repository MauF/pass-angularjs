'use strict';

// Declare app level module which depends on views, and components
angular.module('passInsuranceShell', [
  'ngRoute',
  'ngMaterial',
  'ngAnimate',
  'passInsuranceShell-controllers',
  'passInsuranceShell-services',
  'passInsuranceShell-directives',
  'passInsuranceShell.view1',
  'passInsuranceShell.view2',
  'passInsuranceShell.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
  $routeProvider.when('/home', {
    templateUrl: 'home.html'
  });
}]);
