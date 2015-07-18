var LoginController = {
	
	init: function () {
		LoginController.setForm();
		LoginController.showList();
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
		var inputName = document.getElementById('name');
		inputName.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();        
		LoginController.setFocus();
	},
	
	logClient: function(form) {
		var client = {
			email: form.email.value,
            password: form.password.value,
		};
		ClientService.add(client, function(addedClient) {
			//LoginController.addToHTML(addedClient);
			LoginController.clearForm();
		});
	}

};

//TODO consider to have an HTMLService.js
//initialization
LoginController.init();