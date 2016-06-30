var dent = angular.module('dent', ['ionic', 'tabSlideBox','ionicRipple', 'jett.ionic.filter.bar', 'dent.controllers', 'dent.services', 'dent.directives']);

dent.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // if we have the keyboard plugin, let use it
    if (window.cordova && window.cordova.plugins.Keyboard) {
      //Lets hide the accessory bar fo the keyboard (ios)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // also, lets disable the native overflow scroll
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      if (ionic.Platform.isAndroid()) {
        StatusBar.backgroundColorByHexString("#2196F3");
      } else {
        StatusBar.styleLightContent();
      }
    }
    $timeout(function() {
      navigator.splashscreen.hide();
    }, 500);
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

  .state('app.home', {
    url : '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'HomeCtrl'
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
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.schedule', {
    url: '/schedule',
    views: {
      'menuContent': {
        templateUrl: 'templates/schedule.html',
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

  $urlRouterProvider.otherwise('app/schedule');
});