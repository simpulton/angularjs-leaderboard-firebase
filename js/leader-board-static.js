var app = angular.module('leaderboard', []);

app.controller('MainCtrl', function () {
    var main = this;
    main.newContestant = { lane: '', name: '', score: '' };

    main.currentContestant = null;

    main.contestants = [
        {id: 1, lane: 1, name: 'Contestant 00', score: '0'},
        {id: 2, lane: 2, name: 'Contestant 00', score: '0'},
        {id: 3, lane: 3, name: 'Contestant 00', score: '0'}
    ];

    main.addContestant = function () {
        main.contestants.add(angular.copy(main.newContestant));
        main.newContestant = { lane: '', name: '', score: '' };
    };

    main.updateContestant = function (contestant) {
        // Do nothing... it is already updated locally
    };

    main.removeContestant = function(contestant) {
        main.contestants.remove(function(n) {
            return n['id'] == contestant;
        });
    };

    main.incrementScore = function () {
        main.currentContestant.score
            = parseInt(main.currentContestant.score, 10) + 1;
    };

    main.decrementScore = function () {
        main.currentContestant.score
            = parseInt(main.currentContestant.score, 10) - 1;
    };
});