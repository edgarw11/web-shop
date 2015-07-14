var ClientController = {
	
	init: function () {
		ClientController.setForm();
		ClientController.showList();
	},
	
	setForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			ClientController.addClient(form);
			//it is to avoid form submition
			event.preventDefault();
		});
        //TODO: (After submit) This must probably redirect to a success page or the login page
		ClientController.setFocus();
	},
	
	setFocus: function() {
		var inputName = document.getElementById('name');
		inputName.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();        
		ClientController.setFocus();
	},
	
	addClient: function(form) {
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
	},
	
	deleteclient: function(imgDelete) {
		var 
			clientName = imgDelete.dataset.clientname,
			clientId = imgDelete.dataset.clientid;
		
		if(confirm('Are you sure to delete ' + clientName + '?')) {
			ClientService.remove(clientId, function(isDeleted) {
				if(isDeleted) {
					$(imgDelete).parents('dl').remove();
				}
			})
		}
	},
	
	showList: function () {
		ClientService.getList(function(list) {
			list.forEach(function(client) {
				ClientController.addToHTML(client);
			});	
		});
	},
	
	addToHTML: function (client) {
		var
			clientList = document.getElementById('clientList'),
			dl = document.createElement('dl'),
			dt = ClientController.createDT(client),
			ddName = ClientController.createDD(client.name, 'name'),
			imgDelete = ClientController.createDelete(client),
			ddEmail = ClientController.createDD(client.email, 'email');
		
		ddName.appendChild(imgDelete);
		
		dl.appendChild(dt);
		dl.appendChild(ddName);
		dl.appendChild(ddEmail);
		
		clientList.appendChild(dl);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	createDT: function(client) {
		var 
			dt = document.createElement('dt'),
			img = ClientController.createImage('http://www.gravatar.com/avatar/' + md5(client.email));
		
		dt.appendChild(img);
		dt.className = "photo";
		
		return dt;
	},
	
	createDD: function(value, className) {
		var dd = document.createElement('dd');
		
		dd.innerHTML = value;
		dd.className = className;
		
		return dd;
	},
	
	createDelete: function(client) {
		var imgDelete = ClientController.createImage('assets/images/delete.gif');
		
		imgDelete.setAttribute('data-clientid', client.id);
		imgDelete.setAttribute('data-clientname', client.name);
		
		imgDelete.addEventListener('click', function() {
			ClientController.deleteclient(this);
		});
		
		return imgDelete;
	}

};

//TODO consider to have an HTMLService.js
//initialization
ClientController.init();