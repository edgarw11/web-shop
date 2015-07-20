var ProductService = {

	list: [],
	
	getList: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/products',
			dataType: 'json',
			success: function(list) {
				callback(list);
			}
		});
	}
}