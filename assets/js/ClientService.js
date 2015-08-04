var ClientService = {

	list: [],
	
	add: function(client, callback) {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: 'api/client',
			data: JSON.stringify(client),
			success: function(addedClient) {
				console.log('Client created!');
				callback(addedClient);
			},
			error: function(error) {
				console.log('Error to add client ' + client.name);
			}
		});
	},
	
	remove: function(id, callback) {
		$.ajax({
			type: 'DELETE',
			url: 'api/client/' + id,
			success: function(response) {
				console.log('client deleted!');
				callback(true);
			},
			error: function(jqXHR) {
				console.log('Error to delete client with id ' + id);
				callback(false);
			}
		});
	},
	
	getList: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/clients',
			dataType: 'json',
			success: function(list) {
				callback(list);
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