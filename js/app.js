var dent = angular.module('dent', ['ionic', 'tabSlideBox','ionicRipple', 'jett.ionic.filter.bar', 'dent.controllers', 'dent.services']);

dent.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

dent.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  // Turn off caching to allow refreshing of pages esp after coming from settings page
  $ionicConfigProvider.views.maxCache(0);

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.subjects', {
    url: '/subjects',
    views: {
      'menuContent': {
        templateUrl: 'templates/subjects.html',
        controller: 'SubjectsCtrl'
      }
    }
  })
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings2.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.schedule', {
    url: '/schedule',
    views: {
      'menuContent': {
        templateUrl: 'templates/new.html',
        controller: 'ScheduleCtrl'
      }
    },
    resolve: {
      schedule: function(Schedule) {
        var schedule, settings, filterGroups, group;
        var localSettings = window.localStorage.getItem('mySettings');

        if(localSettings){
          settings = JSON.parse(localStorage.mySettings);;
          filterGroups = !settings.allGroups;
          group = settings.group;
        }else{
          filterGroups = false;
          group = null;
        }

        return Schedule.full(filterGroups, group);
      }
    }
  });

  $urlRouterProvider.otherwise('/app/schedule');
});