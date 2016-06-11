var app = angular.module('dent.directives', [])

.directive('autoBg', [function(){
  var directive = {
    restrict: 'A',
    scope:{},
    link: function link(scope, element, attrs) {
      var type = attrs.type || null;
      var bg = "";

      if(type === "self")
      	bg = "#673AB7";
      else if(type === "tutorial")
      	bg = "#FFEB3B";
      else if(type === "lecture")
      	bg = "#11c1f3";

      console.log(type);
      element.css({background: bg});
    }
  }

  return directive;
}])

.directive('autoIcon', [function(){
  var directive = {
    restrict: 'A',
    scope:{},
    link: function link(scope, element, attrs) {
      var type = attrs.type;
      var icon = "";

      if(type === "self")
      	icon = "ion-android-person";
      else if(type === "tutorial")
       icon = "ion-android-people";
      else if(type === "lecture")
       icon = "ion-ios-people";

      element.addClass(icon);
    }
  }

  return directive;
}])