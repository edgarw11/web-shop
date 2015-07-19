var OrdertrackController = {
	
	init: function () {
		OrdertrackController.showList();
	},
	
	showList: function () {
		OrdertrackService.getList(function(list) {
			list.forEach(function(order) {
				OrdertrackController.addToHTML(order);
			});	
		});
	},
	//`id`, `data_order`, `data_mod`, `status`
	addToHTML: function (order) {
		var
			ordersList = document.getElementById('ordersList'),
			dl = document.createElement('dl'),
			dt = OrdertrackController.createDT(order),
			ddId = OrdertrackController.createDD(order.id, 'Order Number'),
			ddDateOrder = OrdertrackController.createDD(order.data_order, 'Order Date');
            ddDateMod = OrdertrackController.createDD(order.data_mod, 'Modified Date');
            ddStatus = OrdertrackController.createDD(order.status, 'Status');
				
		dl.appendChild(dt);
		dl.appendChild(ddId);
		dl.appendChild(ddDateOrder);
        dl.appendChild(ddDateMod);
        dl.appendChild(ddStatus);
		
		ordersList.appendChild(dl);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	createDT: function(order) {
		var 
			dt = document.createElement('dt'),
			img = OrdertrackController.createImage('http://www.gravatar.com/avatar/' + md5(order.email));
		
		dt.appendChild(img);
		dt.className = "photo";
		
		return dt;
	},
	
	createDD: function(value, className) {
		var dd = document.createElement('dd');
		
		dd.innerHTML = value;
		dd.className = className;
		
		return dd;
	}

};

//TODO consider to have an HTMLService.js
//initialization
OrdertrackController.init();
