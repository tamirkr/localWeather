/**
 * Created by Tamir on 29/05/2016.
 */
var app = angular.module('app', []);
app.controller('mainCtrl', function ($scope, WeatherApi) {

    function fetchData() {
        WeatherApi.getWeather().then(function (data) {
            $scope.country = data.sys.country;
            $scope.temp = data.main.temp;
            $scope.description = data.weather[0].description;
            console.log(data);
        });
    }
    
    fetchData();
    
    $scope.tempMode = function () {
        var celsius = ($scope.temp - 32) / (1.8000);
        $scope.temp = celsius;
        $(".wi").removeClass();
        $("span").addClass().html("<span class='wi wi-celsius'></span>");

    }
});

app.factory('WeatherApi', function ($q, $http, $log) {
    

    var _getWeather = function () {
        var  deferred = $q.defer();
        var latitude,longitude = "";
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    getw();
            });
        }
        function getw() {
            $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=9f3905a082cb0baa491f2211aff63ef0')
                .success(function (data) {
                    deferred.resolve(data)
                }).error(function (msg, code) {
                deferred.reject(msg);
                $log.error(msg, code)
            });
        }


        return deferred.promise;
    }

    return {
        getWeather:_getWeather
    }
})