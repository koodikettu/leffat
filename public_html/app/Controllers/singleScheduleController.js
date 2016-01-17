MovieApp.controller('SingleScheduleController', function ($scope, $rootScope, $routeParams, $sce, $http, $q, $interval, TimeService) {

    $scope.isArray = angular.isArray;
    $scope.trust = $sce.trustAsResourceUrl;
    $scope.isDef = angular.isDefined;
    $scope.formatDate = TimeService.formatDate;
    $scope.formatTime = TimeService.formatTime;
    $scope.strToDate = TimeService.strToDate;
    $scope.humanReadableTimeDifference = TimeService.humanReadableTimeDifference;
    $scope.currTime = new Date();
    
    $interval(function() {
        $scope.currTime=new Date();
    }.bind(this), 1000);

    $('#data').addClass("hidden");


    var pending = [];

    if (!$rootScope.schedule) {
        $rootScope.schedule = [];
    }

    if (!$rootScope.schedule[$routeParams.theatreAreaId]) {
        console.log('schedule puuttuu');
        var queryUrl = 'http://www.finnkino.fi/xml/Schedule/?nrOfDays=31&area=' + $routeParams.theatreAreaId;
        var scheduleRequest = $http.get(queryUrl);
        scheduleRequest.success(function (result) {
            $rootScope.schedule[$routeParams.theatreAreaId] = $.xml2json(result);
        });
        pending.push(scheduleRequest);
    }

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
        console.log($rootScope.schedule[$routeParams.theatreAreaId]);
        console.log($rootScope.movieList);
        console.log($rootScope.theatreAreaList);
        execute();
    });

    function execute() {
        $('#data').removeClass("hidden");
        $('#progress').addClass("hidden");
        $scope.movie = getMovie($rootScope.movieList, $routeParams.movieId);
        $scope.currentArea = getCurrentArea($rootScope.theatreAreaList, $routeParams.theatreAreaId);
        console.log($scope.movie);
        localSchedule = $rootScope.schedule[$routeParams.theatreAreaId];
        $scope.schedule = getLocalScheduleForCurrentMovie(localSchedule, $scope.movie.ID);


    }

    function getMovie(list, id) {
        for (i = 0; i < list.length; i++) {
            if (list[i].ID == id)
                return list[i];
        }
    }

    function getCurrentArea(list, id) {
        for (i = 0; i < list.TheatreArea.length; i++) {
            if (list.TheatreArea[i].ID == id) {
                return list.TheatreArea[i];

            }
        }
        console.log('Ei löytynyt')
    }

    function getLocalScheduleForCurrentMovie(localSchedule, movieId) {
        if (!localSchedule) {
            console.log('failed');
            return null;
        }
        console.log('getScheduleForCurrent');
        console.log(localSchedule);
        console.log(movieId);
        var now= new Date();
        var resultSchedule = [];
        for (var i = 0; i < localSchedule.Shows.Show.length; i++) {
            var showDate = new Date(localSchedule.Shows.Show[i].dttmShowStartUTC);
                if (localSchedule.Shows.Show[i].EventID == movieId && showDate>now)
                    resultSchedule.push(localSchedule.Shows.Show[i]);
        }
        console.log(resultSchedule);
        return resultSchedule;
    }




});



