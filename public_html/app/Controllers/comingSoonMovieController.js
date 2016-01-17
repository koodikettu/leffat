MovieApp.controller('ComingSoonMovieController', function ($scope, $rootScope, $routeParams, $sce, $http, $q, TimeService) {

    $scope.isArray = angular.isArray;
    $scope.trust = $sce.trustAsResourceUrl;
    $scope.formatDate = TimeService.formatDate;
    $('#data').addClass("hidden");

    var pending = [];
    if (!$rootScope.comingSoonList) {
        console.log('comingSoonList puuttuu');
        var comingSoonListRequest = $http.get("http://www.finnkino.fi/xml/Events/?listType=ComingSoon&includeLinks=true&includeGallery=true&includePictures=true");
        comingSoonListRequest.success(function (result) {
            $rootScope.comingSoonList = $.xml2json(result).Event;
        });
        pending.push(comingSoonListRequest);
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
        console.log($rootScope.comingSoonList);
        console.log($rootScope.theatreAreaList);
        execute();
    });




    function execute() {
        $scope.movie = getMovie($rootScope.comingSoonList, $routeParams.movieId);
        var d = new Date($scope.movie.dtLocalRelease);
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





//MovieApp.controller('ComingSoonMovieController', function ($scope, $rootScope, $routeParams, $sce) {
//
//
//    $scope.isArray = angular.isArray;
//    $scope.trust = $sce.trustAsResourceUrl;
//
//    if ($rootScope.comingSoonList) {
//
//        
//
//    }
//    else {
//        if (!$rootScope.comingSoonList) {
//            $.get('http://www.finnkino.fi/xml/Events/?listType=ComingSoon&includeLinks=true&includeGallery=true&includePictures=true', function (xml) {
//                $rootScope.comingSoonList = $.xml2json(xml).Event;
//
//                $rootScope.$apply();
//                execute();
//                $scope.$apply();
//
//
//            });
//        }
//
//    }
//
//    function execute() {
//        $scope.movie = getMovie($rootScope.comingSoonList, $routeParams.movieId);
//        var d = new Date($scope.movie.dtLocalRelease);
//        var pvm = d.toLocaleDateString();
//        $scope.movie.dtLocalRelease = pvm;
//        console.log($scope.movie);
//    }
//
//    function getMovie(list, id) {
//        for (i = 0; i < list.length; i++) {
//            if (list[i].ID == id)
//                return list[i];
//        }
//    }
//    
//    });