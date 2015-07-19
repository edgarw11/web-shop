var LoginController = {
	
	init: function () {
		LoginController.setForm();
	},
	
	setForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			LoginController.logClient(form);
			//it is to avoid form submition
			event.preventDefault();
		});
        //TODO: (After submit) This must probably redirect to a success page or the login page
		LoginController.setFocus();
	},
	
	setFocus: function() {
		var inputName = document.getElementById('email');
		inputName.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();        
		LoginController.setFocus();
	},
	
	logClient: function(form) {
		console.log("logClient");
		var client = {
			email: form.email.value,
            password: form.password.value,
		};
		console.log("email" + client.email +"pass: " + client.password);
		LoginService.login(client, function(loggedClient) {
			if(loggedClient.status){
				console.log(loggedClient.message);
				console.log(loggedClient);
				LoginController.clearForm();
				window.location.assign("index.php");
			} else {
				console.log(loggedClient.message);
				LoginController.clearForm();
			}
			
		});
	},
	
	verify: function() {
		LoginService.verify(function(verified){
			
			if(!verified.status){
				console.log("Redirecting user for loging.");
				window.location.assign("login.html");
			} else {
				console.log("User is already logged. " + verified.client_name);
			}
		});
	}

};

//TODO consider to have an HTMLService.js
//initialization
LoginController.init();