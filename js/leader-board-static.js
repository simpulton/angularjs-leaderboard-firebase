var app = angular.module('leaderboard', []);

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.eventName = 'Crossfit Games 2014';
    $scope.roundName = 'Fight Gone Bad';
    $scope.newContestant = { lane: '', name: '', score: '' };

    $scope.currentContestant = null;

    $scope.contestants = [
        {id: 1, lane: 1, name: 'Contestant 00', score: '0'},
        {id: 2, lane: 2, name: 'Contestant 00', score: '0'},
        {id: 3, lane: 3, name: 'Contestant 00', score: '0'}
    ];

    $scope.addContestant = function () {
        $scope.contestants.add(angular.copy($scope.newContestant));
        $scope.newContestant = { lane: '', name: '', score: '' };
    };

    $scope.updateContestant = function (contestant) {
        // Do nothing... it is already updated locally
    };

    $scope.removeContestant = function(contestant) {
        $scope.contestants.remove(function(n) {
            return n['id'] == contestant.id;
        });
    };

    $scope.incrementScore = function () {
        $scope.currentContestant.score = parseInt($scope.currentContestant.score, 10) + 1;
    };

    $scope.decrementScore = function () {
        $scope.currentContestant.score = parseInt($scope.currentContestant.score, 10) - 1;
    };
}]);