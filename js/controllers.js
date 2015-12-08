angular.module('dent.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $location, $ionicPopover, $timeout) {

  $scope.navigateTo = function(path){
      $scope.closeMainPopover();
      $location.path(path);
  };

  $scope.whatsActive = function(isItMe){
      return (isItMe === $location.path());
  }

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

  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.settingsModal = modal;
  });

  $scope.showSettings = function(){
    $scope.closeMainPopover();
    $scope.settingsModal.show();
  }
  $scope.closeSettings = function(){
    $scope.settingsModal.hide();
    
    $scope.$broadcast('settingsChanged');
  };
})

.controller('SettingsCtrl', function($scope){  
  var localSettings = window.localStorage.getItem('mySettings');

  if(localSettings){
    localSettings = JSON.parse(localStorage.mySettings);

    $scope.settings = localSettings;
    console.log(localSettings);
  }else{
    console.log('no localSettings found');
    
    var initSettings = {
      allGroups : false,
      stream : 'A',
      group : 1
    }

    window.localStorage.setItem('mySettings', JSON.stringify(initSettings));
    $scope.settings = initSettings;
  }

  $scope.updateSettings = function(){
    window.localStorage.setItem('mySettings', JSON.stringify($scope.settings));
  }
})

.controller("SubjectsCtrl", function($scope, $ionicModal, $ionicFilterBar, Subjects) {
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

  $scope.search = function (){
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.subjects,
      done: function () {
        $scope.searching = true;
      },
      update: function (filteredItems) {
          if (filteredItems.length < 1) {
            $scope.emptyContent = true;
          }else{
            $scope.emptyContent = false;
          }
        $scope.subjects = filteredItems;
      },
      cancel: function () {
        $scope.searching = false;
      }
    });
  };
  
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

.controller("ScheduleCtrl", function($scope, $timeout, $stateParams, $ionicSlideBoxDelegate, $ionicModal, schedule, Schedule, Subjects) {
  vm = this;
  var date = new Date();
  $scope.schedule = schedule;
  $scope.session = {};
  $scope.which = 1;
  $scope.activeTab = 0;
  $scope.curPos = date.getDay() - 1;

  vm.setActiveTabPosition = function(index){
      var width = $('.tab-item').eq(index).css('width');
      var position = $('.tab-item').eq(index).position();
      $scope.activeTabPosition = position.left;
      $scope.activeTabWidth = width;
      $scope.activeTab = index;
  }

  window.onresize = function onresize() {
    $('.indicator').removeClass('sliding');
    vm.setActiveTabPosition($scope.curPos);
    $timeout(function(){
      $('.indicator').addClass('sliding');
    }, 100);
  }

  $timeout(function(){
    $ionicSlideBoxDelegate.slide($scope.curPos, 350);
    $timeout(function(){
      vm.setActiveTabPosition($scope.curPos);
      $('.indicator').addClass('sliding');
    }, 100);
  }, 100);

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