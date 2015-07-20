var CartService = {

	add: function(id, callback) {
		$.ajax({
			type: 'GET',
			url: 'api/product/'+id,
			dataType: 'json',
			success: function(product) {
				$.ajax({
					type: 'POST',
					url: 'api/cart',
					dataType: 'json',
					data: JSON.stringify(product),
					success: function(product) {
						callback(product);
					}
				});
			}
		});
	},
	
	getList: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/cart',
			dataType: 'json',
			success: function(list) {
				callback(list?list:[]);
			}
		});
	},
	
	remove: function(id, callback) {
		$.ajax({
			type: 'DELETE',
			url: 'api/cart/'+id,
			dataType: 'json',
			success: function(list) {
				callback(list);
			}
		});
	}
}