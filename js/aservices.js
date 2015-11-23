angular.module('dent.services', [])

.factory('Subjects', ['$http', '$q', function($http, $q) {
    return {
        all: function() {
            var def = $q.defer();
            // var subjects = [];

            $http.get("js/subjects.json")
              .success(function(data) {
                // subjects.push(data[i]);
                console.log(data);
                def.resolve(data);
              })
              .error(function() {
                  def.reject("Failed to get cards");
              });

            return def.promise;
        },
        get:function(code){
          var subject = {};
          var def = $q.defer();

            $http.get("js/subjects.json")
              .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                  if(data[i].code === code){
                    def.resolve(data[i]);
                  }
                };
              })
              .error(function() {
                  def.reject("Failed to get cards");
              });

            return def.promise;
        }
    }
}])
.factory('Schedule', ['$http', '$q', function($http, $q, Subjects) {
    return {
        full: function() {
            var def = $q.defer();
            var days = [];
            $http.get("js/schedule.json")
              .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                  // console.log(data[i]);
                  if(i>=data.length - 1){
                    def.resolve(data);
                  }else{
                    var sessions = data[i].sessions;
                    for (var j = 0; j < sessions.length; j++) {
                      data[i].sessions[j].sub = getSubject(sessions[j].sub_code);
                      data[i].sessions[j].timeline = getTimeLine(sessions[j].session);
                    };
                  }
                };
              })
              .error(function() {
                  def.reject("Failed to get schedule");
              });

            return def.promise;
        },
        get:function(code){}          
    }

    function getTimeLine(session){
      var def = $q.defer();
      var timeline;
      var times = ['0700 - 0800', '0800 - 0900', '0900 - 1000', '1000 - 1100', '1100 - 1200', '1200 - 1300', '1300 - 1400', '1400 - 1500', '1500 - 1600', '1600 - 1700', '1700 - 1800', '1800 - 1900', '1900 - 2000'];
      
      if(session.length > 1){
        session = session.split('&');
        timeline = times[parseInt(session[0])];
      }else{
        timeline = times[parseInt(session)];
      }

      return timeline;
    }

    function getSubject(code){
      var def = $q.defer();
      var times = ['0700 - 0800', '0800 - 0900', '0900 - 1000', '1000 - 1100', '1100 - 1200', '1200 - 1300', '1300 - 1400', '1400 - 1500', '1500 - 1600', '1600 - 1700', '1700 - 1800', '1800 - 1900', '1900 - 2000'];
      var subject;
      $http.get("js/subjects.json")
        .success(function(data) {
          for (var i = 0; i < data.length; i++) {
            if(data[i].code === code){
              subject = data[i].name;
              // def.resolve(details);
            }
          };
        })
        .error(function() {
            def.reject("Failed to get cards");
        });

      return subject;
    }
}]);