MovieApp.controller('MovieController', function ($scope, $rootScope, $routeParams, $sce, $http, $q, TimeService) {

    $scope.isArray = angular.isArray;
    $scope.trust = $sce.trustAsResourceUrl;
    $scope.formatDate = TimeService.formatDate;
    $('#data').addClass("hidden");

    var pending = [];
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
        $scope.movie = getMovie($rootScope.movieList, $routeParams.movieId);
        $scope.areaSelect = $scope.theatreAreaList.TheatreArea[0];
        $('#data').removeClass("hidden");
        $('#progress').addClass("hidden");
        console.log($scope.movie);
    }

    function getMovie(list, id) {
        for (i = 0; i < list.length; i++) {
            if (list[i].ID == id)
                return list[i];
        }
    }





});







