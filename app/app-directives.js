'use strict';

angular.module('passInsuranceShell-directives', [
    'ngRoute',
    'ngMaterial',
    'ngAnimate',
    'passInsuranceShell-services'
]).
directive('rgiMenuBreadcrumb', function() {
    return {
        restrict: 'E',
        scope: {
            menuObj: '='
        },
        controller: ['$scope', '$rootScope', 'menuService', function($scope, $rootScope, menuService) {
            // $scope.breadcrumb = [];

            // if(!$scope.menuObj.breadcrumb[menu.code]) {
            //          $scope.menuObj.breadcrumb[menu.code] = {'label': menu.label, 'path': menu.path};
            //      }

            $rootScope.$on('menuSelected', function(event, menu) {
                if ($scope.menuObj) {
                    menuService.fillBreadcrumb($scope.menuObj, menu);
                }
            });

            $scope.selectMenu = function(menu) {
                menuService.selectMenu($scope.menuObj, menu);
                $scope.$emit('menuSelected', menu);
            };

        }],
        templateUrl: 'template/rgi-menu-breadcrumb-tpl.html'
    };
}).
directive('rgiMenu', function() {
    return {
        restrict: 'E',
        scope: {
            menuObj: '='
        },
        controller: ['$scope', '$rootScope', 'menuService', function($scope, $rootScope, menuService) {

            $scope.selectMenu = function(menu) {
                menuService.selectMenu($scope.menuObj, menu);
                $scope.$emit('menuSelected', menu);
            };

            // $scope.isCurrentMenuSelected = function(menuItem) {
            //  if(menuItem && $scope.menuObj.selectedMenuItem && !menuItem.isRoot && $scope.menuObj.selectedMenuItem.code === menuItem.code) {
            //      return true;
            //  }
            //  return false;
            // };

            $scope.getNumber = function(num) {
                return new Array(num);
            }

        }],
        templateUrl: 'template/rgi-menu-tpl.html'
    };
});
