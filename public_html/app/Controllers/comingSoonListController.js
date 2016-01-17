MovieApp.controller('ComingSoonListController', function ($scope, $rootScope, $http, $q) {



    var pending = [];
    $('#data').addClass("hidden");

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
        $scope.areaSelect = $scope.theatreAreaList.TheatreArea[0];
        $('#data').removeClass("hidden");
        $('#progress').addClass("hidden");

    };



});






//MovieApp.controller('ComingSoonListController', function ($scope, $rootScope) {
//
//
//
//    if (!$rootScope.comingSoonList) {
//        $.get('http://www.finnkino.fi/xml/Events/?listType=ComingSoon&includeLinks=true&includeGallery=true&includePictures=true', function (xml) {
//            $rootScope.comingSoonList = $.xml2json(xml).Event;
//
//            $rootScope.$apply();
//            console.log($scope.comingSoonList);
//
//
//        });
//    }
//    if (!$rootScope.theaterAreaList) {
//        $.get('http://www.finnkino.fi/xml/TheatreAreas/', function (xml) {
//            $rootScope.theaterAreaList = $.xml2json(xml).TheaterAreas;
//
//
//            $rootScope.$apply();
//            console.log($scope.theaterAreaList);
//
//
//        });
//    }
//
//});