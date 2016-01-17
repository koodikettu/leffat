/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var MovieApp = angular.module('MovieApp', ['ngRoute']);

MovieApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'app/views/home.html',
                    controller: 'HomeController'
                }).
                when('/movielist', {
                    templateUrl: 'app/views/movielist.html',
                    controller: 'MovieListController'
                }).
                when('/movie/:movieId', {
                    templateUrl: 'app/views/movie.html',
                    controller: 'MovieController'
                }).
                when('/movie/:movieId/schedule/:theatreAreaId', {
                    templateUrl: 'app/views/singleschedule.html',
                    controller: 'SingleScheduleController'
                }).
                when('/theatreArea/:theatreAreaId/schedule', {
                    templateUrl: 'app/views/theatreareaschedule.html',
                    controller: 'TheatreAreaScheduleController'
                }).
                when('/news', {
                    templateUrl: 'app/views/newslist.html',
                    controller: 'NewsListController'
                }).
                when('/news/:newsItemId', {
                    templateUrl: 'app/views/newsitem.html',
                    controller: 'NewsItemController'
                }).
                when('/movie2/:movieId', {
                    templateUrl: 'app/views/movie2.html',
                    controller: 'MovieController'
                }).
                when('/comingSoon', {
                    templateUrl: 'app/views/comingsoonlist.html',
                    controller: 'ComingSoonListController'
                }).
                when('/comingSoon/:movieId', {
                    templateUrl: 'app/views/comingsoonmovie.html',
                    controller: 'ComingSoonMovieController'
                }).
                otherwise({
                    redirectTo: '/'
                });
    }]);

MovieApp.filter('isArray', function () {
    return function (input) {
        return angular.isArray(input);
    };
});

