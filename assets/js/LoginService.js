var LoginService = {

	list: [],
	
	login: function(client, callback) {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: 'api/login',
			data: JSON.stringify(client),
			success: function(logedClient) {
				console.log('Client loged in!');
				callback(addedClient);
			},
			error: function() {
				console.log('Error validating client ' + client.name);
			}
		});
	},
	
	saveToLocalStorage: function () {
		var listJson = JSON.stringify(ClientService.list);
		window.localStorage.setItem('clientlist', listJson);
	},
	
	retrieveFromLocalStorage: function () {
		var listJson = window.localStorage.getItem('clientlist');
		if(listJson) {
			ClientService.list = JSON.parse(listJson);
		}
	}
}