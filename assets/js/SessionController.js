var SessionController = {
	
	init: function () {
	
	},
	
	logout: function(form) {
		console.log("logout action");
		
		SessionService.logout(function() {
			console.log("logout success");
			window.location.assign("index.html");
		});
	},
	
	verify: function(callback) {
		
		SessionService.verify(function(verified){
			
			if(!verified.status){
				console.log("Redirecting user for loging.");
				window.location.assign("login.html");
			} else {
				console.log("User is already logged. name: " + verified.client_name + " - id: " + verified.client_id);
				// Store
				localStorage.setItem("client_id", verified.client_id);
				localStorage.setItem("client_name", verified.client_name);
				//console.log("client_id_in ::: " + localStorage.getItem("client_id"));
			}
			
		});
	}

};

//TODO consider to have an HTMLService.js
//initialization
SessionController.init();