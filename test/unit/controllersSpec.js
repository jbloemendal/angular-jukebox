'use strict';

/* jasmine specs for controllers go here */

describe('Angular Jukebox controllers', function () {

    var scope, ctrl;

    // Load the module that the controller you are testing is in
    beforeEach(module('musicAlbumApp.controllers'));

    describe('Controller: SearchCtrl', function () {
        var mockSearchService = {}, $q, respData;

        // inject is used for resolving references that you need to use in your tests, don't use this as a normal beforeEach, this beforeEach is used to resolve references
        beforeEach(inject(function ($controller, $rootScope, _$q_) {
            $q = _$q_;
            scope = $rootScope.$new();
            scope.translation = {
                'SEARCH_PAGE_RESULT': 'results per page'
            };

            //instead of instantiating the controller using $controller, we are saving a reference for it & calling it in the createController function and later will use in each unit test
            ctrl = $controller('SearchCtrl', {$scope: scope, searchService: mockSearchService});
        }));

        //The actual before each for setting up common variables, dependencies or functions
        beforeEach(function () {
            mockSearchService.fullTextSearch = jasmine.createSpy('fullTextSearch');
            
            var respDefer = $q.defer();
            //resolve on a defer and passing it data, will always run the first argument of the then() if you want to test the second one, write reject() instead, but here by default we want to resolve it and pass it an empty object that we can change it's value in any unit test
            respDefer.resolve({
                albums: {
                    total: 1,
                    items: [
                        {  
                            name: 'Gecekondu',
                            artists: [{
                                    id: '39zIRxvWFOGGH4hxGqRkLy',
                                    name: 'Baba Zula',
                                    external_urls: {
                                        spotify: 'https://open.spotify.com/artist/39zIRxvWFOGGH4hxGqRkLy'
                                    }
                            }],
                            external_urls: {
                                spotify: 'https://open.spotify.com/album/1CULcHSBdeTyAfBXTJsEx3'
                            },
                            images: [
                                {
                                    height: 300,
                                    width: 300,
                                    url: 'https://i.scdn.co/image/73a7119d002dcf8b0c9ec28fe9aeab98b03eba4a'
                                }
                            ]
                        }
                    ]
                }
            });
            mockSearchService.fullTextSearch.andReturn(respDefer.promise);
            //defer.promise is actually the object that has the then() method
            
            
            mockSearchService.autocomplete = jasmine.createSpy('autocomplete');
            var autocompleteRespDefer = $q.defer();
            
            //resolve on a defer and passing it data, will always run the first argument of the then() if you want to test the second one, write reject() instead, but here by default we want to resolve it and pass it an empty object that we can change it's value in any unit test
            autocompleteRespDefer.resolve({
                artists: {
                    total: 1,
                    items: [
                        {  
                            name: 'Baba Zula'
                        }
                    ]
                }
            });
            mockSearchService.autocomplete.andReturn(autocompleteRespDefer.promise);
        });

        it('fullTextSearch should put the searchResp variable into the scope', function () {
            expect(scope.searchResp).toBeUndefined();
            expect(scope.isAvailableResults()).toBeFalsy();
            expect(scope.isAtLeastOneResult()).toBeFalsy();

            scope.fullTextSearch('Gecekondu', 1);
            scope.$digest();
            
            expect(scope.searchResp).toBeDefined();
            expect(scope.totalItems).toBeDefined();
            expect(scope.isAvailableResults()).toBeTruthy();
            expect(scope.isAtLeastOneResult()).toBeTruthy();
        });

        it('controller when load should set default properties values', function () {
            expect(scope.maxSize).toBeDefined();
            expect(scope.currentPage).toBeDefined();
            expect(scope.pageSizes).toBeDefined();
            expect(scope.pageSize).toBeDefined();
        });

        it('rangeGreaterThanZero', function () {
            expect(scope.rangeGreaterThanZero({ count: 5})).toBeTruthy();
            expect(scope.rangeGreaterThanZero({ count: 0})).toBeFalsy();
        });

        it('autocomplete should return a single artist', function () {
            var artists = scope.autocomplete('Baba Zula');
            // Propagate promise resolution to 'then' functions using $apply().
            scope.$apply();

            expect(artists).toBeDefined();
            expect(scope.autocompleteResp).not.toBeNull();
            expect(scope.autocompleteResp.length).toEqual(1);
            expect(scope.autocompleteResp[0]).toEqual('Baba Zula');
        });

        it('selectPage should set currentPage scope variable to 20', function () {
            expect(scope.currentPage).not.toEqual(20);
            scope.selectPage(20);
            expect(scope.currentPage).toEqual(20);
        });

    });

});