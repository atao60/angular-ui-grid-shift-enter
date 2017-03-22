angular.module('popDemo')
.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true); 

    $stateProvider
    .state('accueil', {
        url: '/accueil',
        templateUrl: 'client/components/accueil/accueil.html',
        controller: 'AccueilCtrl'
    })
    .state('schmilblicks', {
        url: '/schmilblicks',
        templateUrl: 'client/components/schmilblicks/schmilblicks.html',
        controller: 'SchmilblicksCtrl'
    });

    $urlRouterProvider.otherwise('accueil');

});
