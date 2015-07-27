var CartService = {

	add: function(id, callback) {
		var cart = CartService.retrieveCartFromSession();
		cart.productIds.push(id);
		CartService.saveCartTosession(cart);
		callback(id);
	},
	
	getList: function(callback) {
		var cart = CartService.retrieveCartFromSession();
		callback(cart.productIds);
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
	},
	
	saveCartTosession: function(cart) {
		sessionStorage.setItem("webShopCart", JSON.stringify(cart));	
	},
	
	retrieveCartFromSession: function() {
		var cart = JSON.parse(sessionStorage.getItem('webShopCart'));
		return cart ? cart : {productIds: []};
	}
}