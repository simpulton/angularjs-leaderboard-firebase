var app = angular.module('leaderboard', []);

app.controller('MainCtrl', function (ContestantsService) {
    var main = this;
    main.newContestant = {lane: '', name: '', score: ''};
    main.currentContestant = null;
    main.contestants = ContestantsService.getContestants();

    main.addContestant = function () {
        ContestantsService.addContestant(angular.copy(main.newContestant));
        main.newContestant = {lane: '', name: '', score: ''};
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
});

app.factory('ContestantsService', function () {
    var contestants = {
        1: {id: 1, lane: 1, name: 'Contestant 01', score: '10'},
        2: {id: 2, lane: 2, name: 'Contestant 02', score: '15'},
        3: {id: 3, lane: 3, name: 'Contestant 03', score: '20'}
    };

    var getContestants = function () {
        return contestants;
    };

    var addContestant = function (contestant) {
        var id = new Date().getTime();
        contestant.id = id;
        contestants[id] = contestant;
    };

    var updateContestant = function (contestant) {
        // Already in memory
    };

    var removeContestant = function (contestant) {
        delete contestants[contestant.id];
    };

    return {
        getContestants: getContestants,
        addContestant: addContestant,
        updateContestant: updateContestant,
        removeContestant: removeContestant
    }
});