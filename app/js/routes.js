'use strict';

angular.module('musicAlbumApp.routes', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: 'SearchCtrl'});
        $routeProvider.otherwise({redirectTo: '/search'});
    }]);

