MovieApp.controller('HomeController', function ($scope, $rootScope, $http, $q) {



    var pending = [];
    $('#data').addClass("hidden");

    if (!$rootScope.movieList) {

        console.log('movieList puuttuu');
        var movieListRequest = $http.get("http://www.finnkino.fi/xml/Events/?includeLinks=true&includeGallery=true&includePictures=true");
        movieListRequest.success(function (result) {
            $rootScope.movieList = $.xml2json(result).Event;
        });
        pending.push(movieListRequest);
    }
    if (!$rootScope.theatreAreaList) {
        console.log('theatreAreaList puuttuu');
        var theatreAreaRequest = $http.get("http://www.finnkino.fi/xml/TheatreAreas/");
        theatreAreaRequest.success(function (result) {
            $rootScope.theatreAreaList = $.xml2json(result);
        });
        pending.push(theatreAreaRequest);

    }

    $q.all(pending).then(function () {
        console.log($rootScope.movieList);
        console.log($rootScope.theatreAreaList);
        execute();
    });

    function execute() {
        $scope.areaSelect = $scope.theatreAreaList.TheatreArea[0];
        $('#data').removeClass("hidden");
        $('#progress').addClass("hidden");

    };
    
    angular.element(document).ready(function () {
        $('.carousel').carousel({
             interval: 4000
         });
    });



});