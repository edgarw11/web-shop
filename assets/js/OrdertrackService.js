var OrdertrackService = {

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
	
	saveToLocalStorage: function () {
		var listJson = JSON.stringify(OrdertrackService.list);
		window.localStorage.setItem('orderslist', listJson);
	},
	
	retrieveFromLocalStorage: function () {
		var listJson = window.localStorage.getItem('orderslist');
		if(listJson) {
			OrdertrackService.list = JSON.parse(listJson);
		}
	}
}