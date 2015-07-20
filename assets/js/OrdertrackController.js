var OrdertrackController = {
	
	init: function () {
		OrdertrackController.showList();
	},
	
	showList: function () {
		var 
			ordersList = document.getElementById('ordersList'),
			trHeader = OrdertrackController.createHeader();
			
		ordersList.appendChild(trHeader);
		OrdertrackService.getList(function(list) {
			list.forEach(function(order) {
				ordersList.appendChild(OrdertrackController.createTR(order));
			});	
		});
	},
	//`id`, `data_order`, `data_mod`, `status`
	createTR: function (order) {
		var
			tr = document.createElement('tr'),
			ddId = OrdertrackController.createTD(order.id, 'text'),
			ddDateOrder = OrdertrackController.createTD(order.data_order, 'text'),
            ddDateMod = OrdertrackController.createTD(order.data_mod, 'text'),
            ddStatus = OrdertrackController.createTD(order.status, 'text');
				
		
        tr.appendChild(ddId);
        tr.appendChild(ddDateOrder);
        tr.appendChild(ddDateMod);
        tr.appendChild(ddStatus);
		
		return tr;
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	createHeader: function() {
		var tr = document.createElement('tr');
	
		tr.appendChild(OrdertrackController.createTH('Order Number'));
		tr.appendChild(OrdertrackController.createTH('Order Date'));
		tr.appendChild(OrdertrackController.createTH('Status Modified Date'));
        tr.appendChild(OrdertrackController.createTH('Status'));
		
		return tr;
	},
	
	createTH: function(value) {
		var th = document.createElement('th');
		
		th.innerHTML = value;
		th.className = 'title';
		
		return th;
	},
	
	createTD: function(value, className) {
		var td = document.createElement('td');
		
		td.innerHTML = value;
		td.className = className;
		
		return td;
	}

};

//TODO consider to have an HTMLService.js
//initialization
OrdertrackController.init();
