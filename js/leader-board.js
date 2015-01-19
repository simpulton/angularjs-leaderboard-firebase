var app = angular.module('leaderboard', ['firebase']);

app.constant('FIREBASE_URI', 'PUT_YOUR_FIREBASE_HERE');

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

app.factory('ContestantsService', function ($firebase, FIREBASE_URI) {
    var ref = new Firebase(FIREBASE_URI);
    var contestants = $firebase(ref).$asArray();

    var getContestants = function () {
        return contestants;
    };

    var addContestant = function (contestant) {
        contestants.$add(contestant);
    };

    var updateContestant = function (contestant) {
        contestants.$save(contestant);
    };

    var removeContestant = function (contestant) {
        contestants.$remove(contestant);
    };

    return {
        getContestants: getContestants,
        addContestant: addContestant,
        updateContestant: updateContestant,
        removeContestant: removeContestant
    }
});