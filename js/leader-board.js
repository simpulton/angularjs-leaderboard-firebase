var app = angular.module('leaderboard', ['firebase']);

app.controller('MainCtrl', ['$scope', 'ContestantsService', '$firebase', function ($scope, ContestantsService, $firebase) {
    var main = this;
    main.newContestant = { lane: '', name: '', score: '' };
    main.currentContestant = null;

    // Explicit
    main.contestants = ContestantsService.getContestants();

    main.addContestant = function () {
        ContestantsService.addContestant(angular.copy(main.newContestant));
        main.newContestant = { lane: '', name: '', score: '' };
    };

    main.updateContestant = function (contestant) {
        ContestantsService.updateContestant(contestant);
    };

    main.removeContestant = function (contestant) {
        ContestantsService.removeContestant(contestant);
    };

    main.incrementScore = function () {
        main.currentContestant.score = parseInt(main.currentContestant.score, 10) + 1;
        main.updateContestant(main.currentContestant);
    };

    main.decrementScore = function () {
        main.currentContestant.score = parseInt(main.currentContestant.score, 10) - 1;
        main.updateContestant(main.currentContestant);
    };
}]);

app.factory('ContestantsService', ['$firebase', function ($firebase) {
    var ref = new Firebase('https://ng-leaderboard.firebaseio.com/contestants/');
    var contestants = $firebase(ref).$asArray();

    ref.on('value', function(){
        console.log('contestants', contestants);
    });
    var getContestants = function() {
        return contestants;
    };

    var addContestant = function (contestant) {
        contestants.$add(contestant);
    };

    var updateContestant = function (id) {
        contestants.$save(id);
    };

    var removeContestant = function (id) {
        contestants.$remove(id);
    };

    return {
        getContestants: getContestants,
        addContestant: addContestant,
        updateContestant: updateContestant,
        removeContestant: removeContestant
    }
}]);