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

  // $scope.$on('$destroy', function() {
  //     $scope.mainPopover.remove();
  // });

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

.controller('HomeCtrl', function($scope, schedule) {
  var date = new Date();
  var dayidx = date.getDay();
  $scope.salutation;
  var hrs = date.getHours();

  if(hrs >= 5 && hrs <= 11){
    $scope.salutation = "Good Morning!";
  }else if(hrs >= 12 && hrs < 15){
    $scope.salutation = "Good Afternoon!";
  }else if(hrs >= 15 && hrs <= 21){
    $scope.salutation = "Good Evening!";
  }else{
    $scope.salutation = "Hey there!";
  }

  $scope.sessions = schedule[dayidx].sessions;
})

.controller('SettingsCtrl', function($scope, $ionicModal){  
  var localSettings = window.localStorage.getItem('mySettings');
  $scope.groups = [null, 'One', 'Two', 'Three'];
  $scope.currentGroup;
  $ionicModal.fromTemplateUrl('templates/group-choices.html', {
    scope: $scope,
    animation: 'fade-in'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  if(localSettings){
    localSettings = JSON.parse(localStorage.mySettings);

    $scope.settings = localSettings;
    $scope.currentGroup = $scope.groups[$scope.settings.group];
  }else{
    initSettings = {
      allGroups : true,
      stream : 'A',
      group : 1
    }

    window.localStorage.setItem('mySettings', JSON.stringify(initSettings));
    $scope.settings = initSettings;
  }

  $scope.currentGroup = $scope.groups[$scope.settings.group];

  $scope.updateSettings = function(){
    window.localStorage.setItem('mySettings', JSON.stringify($scope.settings));
  }
  
  $scope.chooseGroup = function(){
    $scope.settings = JSON.parse(window.localStorage.getItem('mySettings'));
    $scope.modal.show();
  }

  $scope.closeChoices = function(update){
    // $scope.settings = { };
    $scope.modal.hide();

    if(update){
      $scope.currentGroup = $scope.groups[$scope.settings.group];
      $scope.updateSettings();
    }
  };
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

.controller("ScheduleCtrl", function($scope, $ionicModal, $ionicFilterBar, schedule) {
  vm = this;
  $scope.schedule = schedule;
  $scope.session = {};
  $scope.which = 1;
  $scope.activeTab = 0;
  // $scope.searching = true;

  // var sessionmodal = '';
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
  $scope.search = function (){
    $scope.searchResults = $scope.schedule;
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.searchResults,
      done: function () {
        $scope.searching = true;
      },
      update: function (filteredItems) {
        $scope.searchResults = filteredItems;
      },
      cancel: function () {
        $scope.searching = false;
      }
      //   filterProperties: 'sessions'
    });
  };
});