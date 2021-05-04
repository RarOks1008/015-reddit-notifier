/*global angular*/
/*jslint unparam:true*/
var app = angular.module('redditnotifier', ['ngMaterial', 'ngMessages']);

app.config(function ($mdThemingProvider) {
    "use strict";
    $mdThemingProvider.theme('default')
        .dark()
        .primaryPalette('grey');
});
