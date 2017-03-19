'use strict';

/* Services */

angular.module('musicAlbumApp.services', ['ngResource', 'spotify'])
    .value('version', '1.0')
    // elasticsearch.angular.js creates an elasticsearch
    // module, which provides an esFactory
    
    .factory('searchService', ['Spotify', function (Spotify) {
        return {
            'fullTextSearch': function (from, size, text) {
                return Spotify.search(text, 'album', {'offset': from, 'limit': size});
            },

            'autocomplete': function (text) {
                // TODO serach for artists and album titles
                return Spotify.search(text, 'artist');
            }
        };
    }])
    .value('userLanguage', {
        getFirstLanguageRange: function (acceptLang) {
            if (acceptLang === undefined) {
                return undefined;
            }
            var languages = acceptLang.split(',');
            var firstLangRangeMaybeQuota = languages[0];
            var firstLangRange = firstLangRangeMaybeQuota.split(';');
            if (firstLangRange) {
                return firstLangRange[0];
            }
            return firstLangRangeMaybeQuota;
        },
        getLanguage: function (languageRange) {
            var extractPartsReg = /^([\w\*]*)(-(\w*))?.*$/i;

            var match = languageRange.trim().match(extractPartsReg);

            if (!match) {
                return undefined;
            }
            // parse language
            var parseLangReg = /^([a-z]{2}|\*)$/i;
            var lang = match[1];
            if (lang) {
                var langMatch = lang.match(parseLangReg);
                if (langMatch) {
                    return langMatch[0].toLowerCase();
                }
            }
            return undefined;
        }
    }).service('translation', ['$resource', function ($resource) {
        this.getTranslation = function ($scope, language) {
            var languageFilePath = 'i18n/app-locale_' + language + '.json';
            $resource(languageFilePath).get(function (data) {
                $scope.translation = data;
            });
        };
    }]);
