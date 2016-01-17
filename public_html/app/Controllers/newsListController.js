MovieApp.controller('NewsListController', function ($scope, $rootScope, $http, $q, $sce, TimeService) {
    $scope.trust = $sce.trustAsHtml;
    $scope.formatDate=TimeService.formatDate;


    var pending = [];
    $('#data').addClass("hidden");

    if (!$rootScope.newsList) {

        console.log('newsList puuttuu');
        var newsListRequest = $http.get("http://www.finnkino.fi/xml/News/");
        newsListRequest.success(function (result) {
            $rootScope.newsList = $.xml2json(result);
        });
        pending.push(newsListRequest);
    }
    
        if (!$rootScope.newsCategoryList) {

        console.log('newsCategoryList puuttuu');
        var newsCategoryListRequest = $http.get("http://www.finnkino.fi/xml/NewsCategories/");
        newsCategoryListRequest.success(function (result) {
            $rootScope.newsCategoryList = $.xml2json(result);
        });
        pending.push(newsCategoryListRequest);
    }
    



    $q.all(pending).then(function () {
        console.log($rootScope.newsList);
        console.log($rootScope.newsCategoryList);
        execute();
    });

    function execute() {
        $('#data').removeClass("hidden");
        $('#progress').addClass("hidden");
        

    };
    


});