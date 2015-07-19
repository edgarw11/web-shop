var AddressService = {

	list: [],
	
	add: function(address, callback) {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: 'api/newaddress',
			data: JSON.stringify(address),
			success: function(addedAddress) {
				console.log('address created!');
				callback(addedAddress);
			},
			error: function() {
				console.log('Error to add address ' + address.des);
			}
		});
	}
}