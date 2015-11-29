var dent = angular.module('dent', ['ionic', 'jett.ionic.filter.bar', 'dent.controllers', 'dent.services']);

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

dent.config(function($stateProvider, $urlRouterProvider) {
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
  .state('app.subject', {
    url: '/subjects/:code',
    // url: '/subject',
    views: {
      'menuContent': {
        templateUrl: 'templates/subject.html',
        controller: 'SubjectCtrl'
      }
    },
    resolve: {
      subject: function(Subjects, $stateParams) {
        var code = $stateParams.code;
        return Subjects.get(code);
      }
    }
  })
  // .state('app.schedule', {
  //   url: '/schedule',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/schedule.html',
  //       controller: 'ScheduleCtrl'
  //     }
  //   },
  //   resolve: {
  //     schedule: function(Schedule, $stateParams) {
  //       // var code = $stateParams.code;
  //       return Schedule.full();
  //     }
  //   }
  // })

  .state('app.schedule', {
    url: '/schedule',
    views: {
      'menuContent': {
        templateUrl: 'templates/schedule.html',
        controller: 'ScheduleCtrl'
      }
    },
    resolve: {
      schedule: function(Schedule, $stateParams) {
        // var code = $stateParams.code;
        return Schedule.full();
      }
    }
  });

  $urlRouterProvider.otherwise('/app/schedule');
});