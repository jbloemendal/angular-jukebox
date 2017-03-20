describe("route", function () {
    beforeEach(module('musicAlbumApp.routes'));

    it('should map routes to controllers', function () {
        module('musicAlbumApp.routes');

        inject(function ($route) {

            expect($route.routes['/search'].controller).toBe('SearchCtrl');
            expect($route.routes['/search'].templateUrl).
                toEqual('partials/search.html');

            // otherwise redirect to
            expect($route.routes[null].redirectTo).toEqual('/search')
        });
    });
});