'use strict';

describe('my angular musicbrainz app', function () {

    beforeEach(function () {
        browser().navigateTo('app/index.html');
    });

    describe('search', function () {

        beforeEach(function () {
            browser().navigateTo('#/search');
        });

        it('should render search when user navigates to /search', function () {
            expect(element('#search-input-label').text()).
                toContain('music');
        });

        it('Baba Zula album search', function () {
            input('searchText').enter('Baba Zula');
            element(':button').click();
            expect(element('#result-number').text()).
                toContain('8');

        });

    });

    it('should automatically redirect to /search when location hash/fragment is empty', function () {
        expect(browser().location().url()).toBe('/search');
    });

});
