var LoginService = {

	list: [],
	
	verify: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/verify',
			dataType: 'json',
			success: function(verified) {
				callback(verified);
			}
		});
	},
	
	login: function(client, callback) {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: 'api/loguser',
			data: JSON.stringify(client),
			success: function(loggedClient) {
				console.log('success.');
				callback(loggedClient);
			},
			error: function() {
				console.log('Error validating client ' + client.email);
			}
		});
	}
}