'use strict';

angular.module('passInsuranceShell-controllers', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate',
        'passInsuranceShell-services'
    ]).
    // config(['menuServiceProvider', function(menuServiceProvider) {
    //     menuServiceProvider.setMenuObjFromFile("menu.json");
    // }]).
controller('testCtrl', ['$log', '$mdSidenav', function($log, $mdSidenav) {
    this.togleMenu = function() {
        $mdSidenav('menu').toggle();
    };
}]).
controller('bodyCtrl', ['$log', '$rootScope', 'menuService', '$location', '$http', function($log, $rootScope, menuService, $location, $http) {
    var that = this;

    $http.get("/app/menu.json").
    success(function(data, status, headers, config) {
        menuService.setMenuObj(data);
        that.menu = menuService.getMenuObj();
        that.menu.breadcrumb = [];
        if ($location.path() && $location.path() != '') {
            var menuItem = menuService.getMenuByPath($location.path(), that.menu.menuItems);
            if (menuItem) {
                menuService.selectMenu(that.menu, menuItem);
                menuService.fillBreadcrumb(that.menu, menuItem);
            }
        }
    }).
    error(function(data, status, headers, config) {
        throw new Error("error occurred while getting the menu information!!!");
    });

    // var processMenu = function(menuItems, level, parentCode) {
    //     if (!level) {
    //         level = 0;
    //     }

    //     for (var index in menuItems) {
    //         menuItems[index].level = level;
    //         menuItems[index].isSelected = false;
    //         menuItems[index].parentCode = parentCode;
    //         if (menuItems[index].children) {
    //             processMenu(menuItems[index].children, level + 1, menuItems[index].code);
    //         }
    //     }

    // };

    $rootScope.$on('menuSelected', function(event, data) {
        // alert(data.label);
    });

    // $rootScope.$on('$locationChangeSuccess', function(event, current, previous, rejection) {
    //     $log.info("event", angular.toJson(event, true));
    //     $log.info("current", angular.toJson(current, true));
    //     $log.info("previous", angular.toJson(previous, true));
    //     $log.info("rejection", angular.toJson(rejection, true));
    //     $log.info("$location.path", angular.toJson($location.path(), true));
    //     var menuItem = menuService.getMenuByPath($location.path(), that.menu.menuItems);
    //     if (menuItem) {
    //         menuService.selectMenu(that.menu, menuItem);
    //     }
    // });

    this.toggleMenu = function() {
        this.menu.isVisible = !this.menu.isVisible;
    };

}]);
