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
		if (inputName != null)
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
				window.location.assign("index.html");
			} else {
				console.log(loggedClient.message);
				LoginController.clearForm();
			}
			
		});
	}

};

//TODO consider to have an HTMLService.js
//initialization
LoginController.init();