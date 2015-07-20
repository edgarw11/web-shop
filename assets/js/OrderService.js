var OrderService = {

	list: [],
	
	getList: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/orders',
			dataType: 'json',
			success: function(list) {
				callback(list);
			}
		});
	}
}