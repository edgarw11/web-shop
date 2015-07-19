var ClientController = {
	
	init: function () {
		ClientController.setForm();
		ClientController.showList();
	},
	
	setForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			console.log("Execute submit.");
			ClientController.addClient(form);
			//it is to avoid form submition
			event.preventDefault();
		});
		ClientController.setFocus();
	},
	
	setFocus: function() {
		console.log("Set focus.");
		var inputName = document.getElementById('name');
		inputName.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();        
		ClientController.setFocus();
		window.location.assign("index.php");
	},
	
	addClient: function(form) {
		console.log("Add client.");
		var client = {
			name: form.name.value,
			email: form.email.value,
            cpf: form.cpf.value,
            telephone: form.telephone.value,
            password: form.password.value,
		};
		ClientService.add(client, function(addedClient) {
			//ClientController.addToHTML(addedClient);
			ClientController.clearForm();
		});
	}

};

//TODO consider to have an HTMLService.js
//initialization
ClientController.init();