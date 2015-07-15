var AddressService = {

	list: [],
	
	add: function(Address, callback) {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: 'api/Address',
			data: JSON.stringify(Address),
			success: function(addedAddress) {
				console.log('Address created!');
				callback(addedAddress);
			},
			error: function() {
				console.log('Error to add Address ' + Address.name);
			}
		});
	},
	
	remove: function(id, callback) {
		$.ajax({
			type: 'DELETE',
			url: 'api/Address/' + id,
			success: function(response) {
				console.log('Address deleted!');
				callback(true);
			},
			error: function(jqXHR) {
				console.log('Error to delete Address with id ' + id);
				callback(false);
			}
		});
	},
	
	getList: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/Addresss',
			dataType: 'json',
			success: function(list) {
				callback(list);
			}
		});
	},
	
	saveToLocalStorage: function () {
		var listJson = JSON.stringify(AddressService.list);
		window.localStorage.setItem('Addresslist', listJson);
	},
	
	retrieveFromLocalStorage: function () {
		var listJson = window.localStorage.getItem('Addresslist');
		if(listJson) {
			AddressService.list = JSON.parse(listJson);
		}
	}
}