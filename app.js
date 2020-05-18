var app=angular.module("newsApp",["ngRoute","ngAnimate"]);


app.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when("/",{
        templateUrl:'components/home_page.html',
        controller:"HomePageCtrl"
    })
    .when("/bookmarks",{
        templateUrl:"components/bookmark.html",
        controller:"HomePageCtrl"
    })
    .otherwise({
        redirectTo:'/'
    });
    $locationProvider.hashPrefix('');
});


app.controller("HomePageCtrl", function ($scope, apiService) {

    var apptitle="hello";
    $scope.limit = 50;
    $scope.incrementLimit=function(length,id){
        for (var item in apiService.news){
            if (id==apiService.news[item].id){
                apiService.news[item].leng = length;
                apiService.news[item].more=true;
            }
        }
        console.log($scope.info)
    }

    $scope.decrementLimit=function(id){
        
        for (var item in apiService.news){
            if (id==apiService.news[item].id){
                apiService.news[item].leng=50;
                apiService.news[item].more=false;
            }
        }
    }

    $scope.bookmarkTrue=function(id){
        apiService.bookmarkTrue(id);
        alert("Post bookmarked!...")
        console.log(apiService.bookmarked)
    }


    $scope.info = apiService.news;
    $scope.bookmarked=apiService.bookmarked;
    $scope.$watch(function () { return apiService.news; }, function (info) { $scope.info = info; });
});

app.service("apiService", function ($http) {
    var apiService = {};

    apiService.news=[];
    apiService.bookmarked=[];
    
    $http({
        method: 'GET',
        async: true,
        crossDomain: true,
        url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=dcdc4bbe821f43ada9c2b8573898f682",
    }).then(function (responce) {
        apiService.news = responce.data.articles;

        for (var item in apiService.news){
            apiService.news[item].more=false;
            apiService.news[item].leng=50;
            apiService.news[item].id=item;
        }

        console.log(apiService.news);
        console.log(apiService.news[1])
        return apiService.news;
    }, function (error) {
        alert('Network error!')
    });


    apiService.bookmarkTrue=function(id){
        for(var item in apiService.news){
            if(id==apiService.news[item].id){
                apiService.bookmarked.push(apiService.news[item]);
            }
        }
    }

    return apiService;
});
