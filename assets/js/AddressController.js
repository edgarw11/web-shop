var AddressController = {
	
	init: function () {
		AddressController.setForm();
		//var client_id = LoginController.verify();
		//console.log("client_id ::: " + client_id);
		SessionController.verify();
		console.log("client_id ::: " + localStorage.getItem("client_id"));
		document.getElementById('clients_id').value = localStorage.getItem("client_id");
	},
	
	setForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			AddressController.addAddress(form);
			//it is to avoid form submition
			event.preventDefault();
		});
        //TODO: (After submit) This must probably redirect to a success page or the login page
		AddressController.setFocus();
	},
	
	setFocus: function() {
		var inputName = document.getElementById('desc');
		inputName.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();        
		AddressController.setFocus();
		window.location.assign("index.php");
	},
	//`desc`, `street`, `number`, `city`, `zip`, `clients_id`
	addAddress: function(form) {
		var address = {
			des: form.desc.value,
			street: form.street.value,
            num: form.number.value,
            city: form.city.value,
            zip: form.zip.value,
            clients_id: form.clients_id.value,
		};
		console.log(address);
		AddressService.add(address, function(addedAddress) {
			//AddressController.addToHTML(addedAddress);
			AddressController.clearForm();
		});
	}
	
};

//TODO consider to have an HTMLService.js
//initialization
AddressController.init();