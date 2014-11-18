'use strict';

angular.module('passInsuranceShell-services', [
    'ngRoute',
    'ngMaterial',
    'ngAnimate'
]).
provider("menuService", [function() {
    var menu = null;
    var init = false;
    return {
        setMenuObj: function(menuObj) {
            menu = menuObj;
        },
        $get: function() {
            return {
                setMenuObj: function(menuObj) {
                    menu = menuObj;
                },
                getMenuObj: function() {
                    if (menu && !init) {
                        for (var index in menu.menuItems) {
                            this.initMenuItem(menu.menuItems[index], null, 0);
                        }
                        this.initBreadcrumb();
                        init = true;
                    }

                    return menu || {};
                },
                selectMenu: function(menuObj, menu) {
                    // retrieve the codes hierarchy
                    var codes = this.getMenuCodeHierarchy(menuObj.menuItems, menu.code);
                    // reset 
                    this.setMenuSelected(menuObj.menuItems, false);
                    // set selected only the menus by codes
                    for (var index in codes) {
                        var menuItem = this.getMenuByCode(codes[index], menuObj.menuItems);
                        if (menuItem) {
                            menuItem.isSelected = true;
                        }
                    }
                    menuObj.currentSelectedCode = menu.code;
                },
                setMenuSelected: function(menuItems, selected) {
                    for (var index in menuItems) {
                        menuItems[index].isSelected = selected;
                        this.setMenuSelected(menuItems[index].children, selected);
                    }
                },
                getMenuByCode: function(code, menuItems) {
                    var menuItem = null;
                    for (var index in menuItems) {
                        if (menuItems[index].code == code) {
                            menuItem = menuItems[index];
                            break;
                        }
                        if (menuItems[index].children) {
                            menuItem = this.getMenuByCode(code, menuItems[index].children);
                        }
                        if (menuItem) {
                            break;
                        }
                    }
                    return menuItem;
                },
                getMenuByPath: function(path, menuItems) {
                    var menuItem = null;
                    for (var index in menuItems) {
                        if (menuItems[index].path == path.substring(1)) {
                            menuItem = menuItems[index];
                            break;
                        }
                        if (menuItems[index].children) {
                            menuItem = this.getMenuByPath(path, menuItems[index].children);
                        }
                        if (menuItem) {
                            break;
                        }
                    }
                    return menuItem;
                },
                getMenuCodeHierarchy: function(menuItems, code, codes) {
                    if (!codes) {
                        codes = [];
                    }
                    var menuItem = this.getMenuByCode(code, menuItems);
                    if (menuItem) {
                        codes.push(menuItem.code);
                        if (menuItem.parentCode) {
                            this.getMenuCodeHierarchy(menuItems, menuItem.parentCode, codes);
                        }
                    }
                    return codes;
                },
                initMenuItem: function(menu, parentCode, level) {

                    if (!menu.code) {
                        throw new Error("MenuItem must have a code associated!!! " + angular.toJson(menu, true));
                    }

                    menu.level = level;
                    menu.isSelected = false;
                    menu.parentCode = parentCode;

                    for (var index in menu.children) {
                        this.initMenuItem(menu.children[index], menu.code, level + 1);
                    }
                },
                initBreadcrumb: function() {
                    var menuItems = menu.menuItems;
                    var theRoot = this.getTheRoot(menuItems);
                    menu.breadcrumb = {};
                    menu.breadcrumb[theRoot.code] = theRoot;
                },
                getTheRoot: function(menuItems) {
                    var menuItem = null;
                    for (var index in menuItems) {
                        if (menuItems[index].isRoot && menuItems[index].isRoot == true) {
                            menuItem = menuItems[index];
                            break;
                        }
                        if (menuItems[index].children) {
                            menuItem = this.getMenuByCode(code, menuItems[index].children);
                        }
                        if (menuItem) {
                            break;
                        }
                    }
                    return menuItem;
                }
            }
        }
    };
}]);
