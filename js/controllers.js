var db = null;
angular.module('dent.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $location, $ionicPopover, $timeout) {
  $scope.navigateTo = function(path){
      $scope.closeMainPopover();
      $location.path(path);
      // $state.go(path);
  };


  $ionicPopover.fromTemplateUrl('mainPopover.html', {
      scope: $scope
  }).then(function(popover) {
      $scope.mainPopover = popover;
  });

  $scope.$on('$destroy', function() {
      $scope.mainPopover.remove();
  });

  $scope.closeMainPopover = function() {
      $scope.mainPopover.hide();
  };
})

.controller("SubjectsCtrl", function($scope, $ionicModal, Subjects) {
  vm = this;
  $scope.subject = {};

  vm.getSubjects = function(){
    Subjects.all().then(
      function(cards) {
        $scope.subjects = cards;
      },
      function(error) {
        console.error('Cards retrieval failed.')
    });
  };

  vm.getSubjects();

  $ionicModal.fromTemplateUrl('templates/subject.html', {
    scope: $scope,
    animation: 'fade-in'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.previewSubject = function(subject){
    $scope.subject = subject;
    $scope.modal.show();
  }
  $scope.closeSubject = function(){
    $scope.modal.hide();
  };
})

.controller("SubjectCtrl", function($scope, $stateParams, subject) {
  $scope.subject = subject;
})

.controller("ScheduleCtrl", function($scope, $timeout, $stateParams, $ionicSlideBoxDelegate, $ionicModal, schedule, Subjects) {
  $scope.schedule = schedule;
  $scope.session = {};
  $scope.which = 1;
  $scope.activeTab = 0;
  // $stateParams.daily
  var vm = this;

  vm.setActiveTabPosition = function(index){
      var width = $('.tab-item').eq(index).css('width');
      var position = $('.tab-item').eq(index).position();
      $scope.activeTabPosition = position.left;
      $scope.activeTabWidth = width;
      $scope.activeTab = index;
  }
  vm.setActiveTabPosition(0);

  window.onresize = function onresize() {
    $('.indicator').removeClass('sliding');
    vm.setActiveTabPosition($scope.activeTab);

    $timeout(function(){
      $('.indicator').addClass('sliding');
    }, 200);
  }

  $ionicModal.fromTemplateUrl('templates/session.html', {
    scope: $scope,
    animation: 'fade-in'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.previewSession = function(session){
    $scope.session = session;
    $scope.modal.show();
  }
  $scope.closeSession = function() {
    $scope.modal.hide();
  };

  $scope.goToSlide = function(index){
      $ionicSlideBoxDelegate.slide(index, 500);
  }

  $scope.slideChanged = function(index){
      $scope.curPos = index;
      vm.setActiveTabPosition(index);
  }
});