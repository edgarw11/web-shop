var OrderService = {

	addList: function(orderProducts, callback) {
		$.ajax({
			type: 'POST',
			url: 'api/orderProducts',
			dataType: 'json',
			data: JSON.stringify(orderProducts),
			success: function(orderProducts) {
				callback(orderProducts);
			}
		});
	}
}