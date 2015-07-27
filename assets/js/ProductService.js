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
	},
	
	get: function(id, callback) {
		$.ajax({
			type: 'GET',
			url: 'api/products/' + id,
			dataType: 'json',
			success: function(product) {
				callback(product);
			}
		});
	}
}