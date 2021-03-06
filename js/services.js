angular.module('dent.services', [])

.factory('Subjects', ['$http', '$q', function($http, $q) {
  var subjects = { 
            CSU07205 : 'Operating Systems', 
            CSU07203 : 'Database Management',
            CSU07202 : 'Programming in C II',
            CSU07204 : 'Data Communication',
            ITU07203 : 'Web Technologies',
            ITU07204 : 'Systems Analysis & Design II'
          };

    return {
        all: function() {
            return subjects;
        },
        get:function(code){
          console.log(code);
          return subjects[code];
        }
    }
}])
.factory('Schedule', ['$http', '$q', function($http, $q, Subjects) {
    return {
        full: function(filterGroups, group) {
            var def = $q.defer();
            var days = [];
            $http.get("js/schedule.json")
              .success(function(data) {
                var validSessions = 0;
                for (var i = 0; i < data.length; i++) {
                  // console.log(data[i]);
                  if(i>=data.length - 1){
                    def.resolve(data);
                  }else{
                    var sessions = data[i].sessions;
                    for (var j = 0; j < sessions.length; j++) {
                      data[i].sessions[j].subject = getDetails(sessions[j].sub_code, false);
                      data[i].sessions[j].timeline = getDetails(false, sessions[j].session);
                      data[i].sessions[j].invalid = false;

                      if(filterGroups){
                        if (sessions[j].type === 'tutorial') {
                          if(sessions[j].group !== parseInt(group)){
                            data[i].sessions[j].invalid = true;
                          }
                        }
                      }
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

    function getDetails(code, session){
      var def = $q.defer();
      var details = {};
      var times = ['0700 - 0800', '0800 - 0900', '0900 - 1000', '1000 - 1100', '1100 - 1200', '1200 - 1300', '1300 - 1400', '1400 - 1500', '1500 - 1600', '1600 - 1700', '1700 - 1800', '1800 - 1900', '1900 - 2000'];
      
      if(session.length > 2){
        session = session.split('&');
        var start = times[parseInt(session[0]) - 1];
        start = start.split('-');
        var end = times[parseInt(session[1]) - 1];
        end = end.split('-');

        details.timeline = start[0] + ' - ' + end[1];
      }else{
        details.timeline = times[parseInt(session) - 1];
      }

      var subjects = { 
          CSU07205 : 'Operating Systems', 
          CSU07203 : 'Database Management',
          CSU07202 : 'Programming in C II',
          CSU07204 : 'Data Communication',
          ITU07203 : 'Web Technologies',
          ITU07204 : 'Systems Analysis & Design II'
      };

      details.subject = subjects[code];

      return details;
    }
}]);