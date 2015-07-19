var SessionService = {

	list: [],
	
	logout: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/logout',
			dataType: 'json',
			success: function() {
				callback();
			}
		});
	},
	
	verify: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/verify',
			dataType: 'json',
			success: function(verified) {
				callback(verified);
			}
		});
	}
}