var AddressController = {
	
	init: function () {
		AddressController.setForm();
		AddressController.showList();
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
		var inputName = document.getElementById('name');
		inputName.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();        
		AddressController.setFocus();
	},
	//`desc`, `street`, `number`, `city`, `zip`, `clients_id`
	addAddress: function(form) {
		var Address = {
			desc: form.desc.value,
			street: form.street.value,
            number: form.number.value,
            city: form.city.value,
            zip: form.zip.value,
            clients_id: form.clients_id.value,
		};
		AddressService.add(Address, function(addedAddress) {
			//AddressController.addToHTML(addedAddress);
			AddressController.clearForm();
		});
	},
	
	deleteAddress: function(imgDelete) {
		var 
			AddressName = imgDelete.dataset.Addressname,
			AddressId = imgDelete.dataset.Addressid;
		
		if(confirm('Are you sure to delete ' + AddressName + '?')) {
			AddressService.remove(AddressId, function(isDeleted) {
				if(isDeleted) {
					$(imgDelete).parents('dl').remove();
				}
			})
		}
	},
	
	showList: function () {
		AddressService.getList(function(list) {
			list.forEach(function(Address) {
				AddressController.addToHTML(Address);
			});	
		});
	},
	
	addToHTML: function (Address) {
		var
			AddressList = document.getElementById('AddressList'),
			dl = document.createElement('dl'),
			dt = AddressController.createDT(Address),
			ddName = AddressController.createDD(Address.name, 'name'),
			imgDelete = AddressController.createDelete(Address),
			ddEmail = AddressController.createDD(Address.email, 'email');
		
		ddName.appendChild(imgDelete);
		
		dl.appendChild(dt);
		dl.appendChild(ddName);
		dl.appendChild(ddEmail);
		
		AddressList.appendChild(dl);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	createDT: function(Address) {
		var 
			dt = document.createElement('dt'),
			img = AddressController.createImage('http://www.gravatar.com/avatar/' + md5(Address.email));
		
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
	
	createDelete: function(Address) {
		var imgDelete = AddressController.createImage('assets/images/delete.gif');
		
		imgDelete.setAttribute('data-Addressid', Address.id);
		imgDelete.setAttribute('data-Addressname', Address.name);
		
		imgDelete.addEventListener('click', function() {
			AddressController.deleteAddress(this);
		});
		
		return imgDelete;
	}

};

//TODO consider to have an HTMLService.js
//initialization
AddressController.init();