'use strict';

/* Controllers */

angular.module('musicAlbumApp.controllers', ['ui.bootstrap']).
    controller('SearchCtrl', ['$scope', 'searchService', function ($scope, searchService) {
        $scope.maxSize = 5;
        $scope.currentPage = 1;
        $scope.pageSizes = [
            {count: 5, label: '5 ' + $scope.translation.SEARCH_PAGE_RESULT},
            {count: 10, label: '10 ' + $scope.translation.SEARCH_PAGE_RESULT},
            {count: 20, label: '20 ' + $scope.translation.SEARCH_PAGE_RESULT},
            {count: 50, label: '50 ' + $scope.translation.SEARCH_PAGE_RESULT}
        ];
        $scope.pageSize = $scope.pageSizes[1]; // 10

        $scope.selectPage = function (page) {
            $scope.fullTextSearch($scope.searchText, page);
        };

        $scope.fullTextSearch = function (text, page) {
            $scope.currentPage = page;
            var from = ($scope.currentPage - 1) * $scope.pageSize.count;
            var deferred = searchService.fullTextSearch(from, $scope.pageSize.count, text);
            deferred.then(
                function (resp) {
                    console.log('fullTextSearch');
                    $scope.searchResp = resp;
                    $scope.totalItems = resp.albums.total;
                }
            );
            return deferred;
        };

        $scope.isAvailableResults = function () {
            return $scope.searchResp ? true : false;
        };

        $scope.isAtLeastOneResult = function () {
            if (!$scope.isAvailableResults()) {
                return false;
            }
            return $scope.totalItems > 0;
        };

        $scope.autocomplete = function (text) {
            return searchService.autocomplete(text).then(function (res) {
                var artists = [];
                angular.forEach(res.artists.items, function (artist) {
                    artists.push(artist['name']);
                });
                $scope.autocompleteResp = artists;
                return artists;
            });
        };

        $scope.rangeGreaterThanZero = function (range) {
            return range.count > 0;
        };
    }
]);