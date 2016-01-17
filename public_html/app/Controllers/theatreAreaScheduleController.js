MovieApp.controller('TheatreAreaScheduleController', function ($scope, $rootScope, $routeParams, $sce, $http, $q, $interval, TimeService) {

    $scope.isArray = angular.isArray;
    $scope.trust = $sce.trustAsResourceUrl;
    $scope.isDef = angular.isDefined;
    $scope.formatDate = TimeService.formatDate;
    $scope.formatTime = TimeService.formatTime;
    $scope.strToDate = TimeService.strToDate;
    $scope.humanReadableTimeDifference = TimeService.humanReadableTimeDifference;
    $scope.currTime = new Date();

    $interval(function () {
        $scope.currTime = new Date();
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


    if (!$rootScope.theatreAreaList) {
        console.log('theatreAreaList puuttuu');
        var theatreAreaRequest = $http.get("http://www.finnkino.fi/xml/TheatreAreas/");
        theatreAreaRequest.success(function (result) {
            $rootScope.theatreAreaList = $.xml2json(result);
        });
        pending.push(theatreAreaRequest);

    }

    $q.all(pending).then(function () {
        console.log('haut valmiina');
        console.log($rootScope.schedule);
        execute();
    });

    function execute() {

        $('#data').removeClass("hidden");
        $('#progress').addClass("hidden");
        $scope.currentArea = getCurrentArea($rootScope.theatreAreaList, $routeParams.theatreAreaId);
        $scope.areaSelect = $scope.currentArea;
        $scope.localSchedule = $rootScope.schedule[$routeParams.theatreAreaId];
        $scope.filteredSchedule = filterPastShows($scope.localSchedule);

        console.log($scope.currentArea);
        console.log($scope.localSchedule);
        console.log($scope.filteredSchedule);


    }


    function getCurrentArea(list, id) {
        for (i = 0; i < list.TheatreArea.length; i++) {
            if (list.TheatreArea[i].ID == id) {
                return list.TheatreArea[i];

            }
        }
        console.log('Ei löytynyt')
    }

    function filterPastShows(localSchedule) {

        var resultSchedule = [];
        var now = new Date();
        console.log(localSchedule);
        if (localSchedule.Shows == '')
            return [];
        for (var i = 0; i < localSchedule.Shows.Show.length; i++) {
            var showDate = new Date(localSchedule.Shows.Show[i].dttmShowStartUTC);
            if (showDate > now)
                resultSchedule.push(localSchedule.Shows.Show[i]);
        }
        return resultSchedule;
    }






});