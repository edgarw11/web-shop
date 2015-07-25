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
	},
	
	add: function(order, callback) {
		$.ajax({
			type: 'POST',
			url: 'api/order',
			dataType: 'json',
			data: JSON.stringify(order),
			success: function(order) {
				callback(order);
			}
		});
	}
}