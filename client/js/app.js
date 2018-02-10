var todoApp = angular.module('todoApp', ['ngRoute']);

todoApp.config(function($routeProvider){
	$routeProvider
	.when('/login',{
		templateUrl: 'components/login.html',
		controller: 'loginCtrl'
	})
	.when('/register',{
		templateUrl: 'components/register.html',
		controller: 'registerCtrl'
	})
	.when('/tasks',{
		templateUrl: 'components/tasks.html',
		controller: 'tasksCtrl'
	})
	.otherwise({
		templateUrl: 'components/home.html',
		controller: 'homeCtrl'
	})

});

var _url = "http://localhost:1337";

todoApp.controller('homeCtrl', function($scope, $location, $http){

	setUserEmail("");

	$scope.goToLogin = function(){
		$location.path('/login');
	};

	$scope.register = function(){
		$location.path('/register');
	};
});



todoApp.controller('loginCtrl', function($scope, $http, $location){
	$scope.goToIndex = function(){
		$location.path('/');
	};

	$scope.login = function(){
		var useremail = $scope.useremail;
		var password = $scope.password;

	    var req = {
            url: _url +'/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: false,
            data: 'useremail='+ useremail +'&password='+password
        };

        // alert(JSON.stringify(req));
        $http(req)
            .success(function(data,status,headers,config){
            	if(status==200){
	               	$scope.response = "Loged In!";
	               	// alert("user email: " + useremail);
	               	setUserEmail(useremail);
	               	$location.path('/tasks');
            	} else {
	               	$scope.response = "No Such User!";
	               	setUserEmail("");
            	}
            }).error(function(data,status){
        }).error(function(data,status,headers,config){
			$scope.response = "failed!";
			setUserEmail("");
        });
	} // $scope.login
});


todoApp.controller('registerCtrl', function($scope, $http, $location){
	$scope.goToIndex = function(){
		$location.path('/');
	};

	$scope.register = function(){

		var username = $scope.username;
		var email = $scope.email;
		var password = $scope.password;

	    var req = {
            url: _url +'/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: false,
            data: 'username='+ username +'&password='+password + '&email='+email
        };

		// alert(JSON.stringify(req));

        $http(req)
            .success(function(data,status,headers,config){
            	if(status==200){
	               	$scope.response = "Registered!";
	               	setUserEmail(useremail);
	               	$location.path('/tasks');
            	} else {
	               	$scope.response = "User Already Exists!";   
	               	setUserEmail("");         		
            	}
            }).error(function(data,status){
        }).error(function(data,status,headers,config){
			$scope.response = "No Response From Server!";
           	setUserEmail("");         		
        });
	} // scope.register
});



todoApp.controller('tasksCtrl', function($scope, $location, $http){

	var useremail = getUserEmail();

	// get user name for web page
    var req = {
        url: _url +'/getUserNameByEmail',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        cache: false,
        data: 'useremail='+ useremail
    };

        // alert(" getUserNameByEmail \n" + JSON.stringify(req));

    $http(req)
        .success(function(data,status,headers,config){
        	if(status==200){
               	// alert(data);
               	$scope.data = data[0];
        	} else {
               	$scope.data = "Error, cant find user!";   
        	}
        }).error(function(data,status){
    }).error(function(data,status,headers,config){
		$scope.response = "No Response From Server!";
    });


	$scope.getTasks = function(_useremail){
	    var req2 = {
	        url: _url +'/getTasksByEmail',
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        cache: false,
	        data: 'useremail='+ _useremail
	    };

	    // alert(" getTasksByEmail \n" + JSON.stringify(req2));

	    $http(req2)
	        .success(function(data,status,headers,config){
	        	if(status==200){
	               	// alert(data);
	               	$scope.tasks = data;
	        	} else {
	               	$scope.tasks = "Error, cant find user!";   
	        	}
	        }).error(function(data,status){
	    }).error(function(data,status,headers,config){
			$scope.response = "No Response From Server!";
	    });
		
	} // $scope.getTasks

	$scope.getTasks(useremail);

   $scope.status = false;

   $scope.addTask = function(){
   		var item = $scope.item;
   		var status = $scope.status;
   		var email = getUserEmail();

		if (status){
			status = 1;
		} else{
			status = 0;
		}

   		// alert("item - "+ item + " status is: " + status + " email: " + email);

		var req3 = {
            url: _url +'/addNewTaskByEmail',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: false,
            data: 'useremail='+ useremail +'&item=' + item + '&status=' + status
   		};

  	    // alert(" addNewTaskByEmail \n" + JSON.stringify(req3));

        $http(req3)
            .success(function(data,status,headers,config){
            	if(status==200){
	               	// alert(data);
	               	$scope.response = data;
	               	$scope.getTasks(useremail);
            	} else {
	               	$scope.response = "Error, cant find user!";   
            	}
            }).error(function(data,status){
        }).error(function(data,status,headers,config){
			$scope.response = "No Response From Server!";
        });
    }  // $scope.addTask


    $scope.removeTask = function(instanceTime,uemail){
    	// alert("time: " + instanceTime + " uEmail: " + uemail);

		var req = {
            url: _url +'/deleteTask',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: false,
            data: 'useremail='+ uemail +'&instanceTime=' + instanceTime
   		};

  	    // alert(" deleteTask \n" + JSON.stringify(req));

        $http(req)
            .success(function(data,status,headers,config){
            	if(status==200){
	               	// alert(data);
	               	$scope.response = data;
	               	$scope.getTasks(useremail);
            	} else {
	               	$scope.response = "Error, cant find user!";   
            	}
            }).error(function(data,status){
        }).error(function(data,status,headers,config){
			$scope.response = "No Response From Server!";
        });

    }


	$scope.goToLogin = function(){
		$location.path('/login');
	};

	$scope.register = function(){
		$location.path('/register');
	};
});
