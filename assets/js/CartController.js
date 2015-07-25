var CartController = {
	
	init: function () {
		CartController.showList();
		var orderButton = document.getElementById("orderButton");
		orderButton.onclick(CartController.proceedOrder());
	},
	
	
	showList: function() {
		CartService.getList(function(list) {
			CartController.addToHTML(list);
		});
	},
	
	addToHTML: function(list) {
		var
			productList = document.getElementById('productList'),
			table = document.createElement('table');
			
		table.appendChild(CartController.createHeader());
		
		CartService.getList(function(list){
		    list.forEach(function(product) {
			    table.appendChild(CartController.createTR(product));
		    });	
		});	
		productList.appendChild(table);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	createHeader: function() {
		var 
			tr = document.createElement('tr'),
			thName = document.createElement('th'),
			thPrice = document.createElement('th'),
			thDelete = document.createElement('th');
			
		thName.innerHTML = 'Product';
		thPrice.innerHTML = 'Price';
		tr.appendChild(thName);
		tr.appendChild(thPrice);
		tr.appendChild(thDelete)
		tr.className = "cartHeader";
		
		return tr;
	},
	
	createTR: function(product) {
		var 
			tr = document.createElement('tr'),
			tdName = document.createElement('td'),
			tdPrice = document.createElement('td'),
			tdDelete = document.createElement('td');
			
		tdName.innerHTML = product[1].name;
		tdPrice.innerHTML = product[1].price;
		tdDelete.appendChild(CartController.createDeleteImage(product));
		tr.appendChild(tdName);
		tr.appendChild(tdPrice);
		tr.appendChild(tdDelete)
		tr.className = "cartProduct";
		
		return tr;
	},
	
	createDeleteImage: function(product) {
		var a = document.createElement('a');
		a.href = "#";
		var imgRemove = CartController.createImage('assets/images/delete.gif');
		
		imgRemove.setAttribute('data-productid', product[1].id);
		
		imgRemove.addEventListener('click', function() {
			CartController.removefromCart(this);
		});
		
		a.appendChild(imgRemove);
		
		return a;
	},
	
	removefromCart: function(imgDelete){
		var 
			productId = imgDelete.dataset.productid;
		
		CartService.remove(productId, function(isRemoved) {
			if(isRemoved) {
				var productList = document.getElementById('productList');
				while (productList.firstChild) {
    		        productList.removeChild(productList.firstChild);
				}
				CartController.showList();
			}
		})
	},
	
	proceedOrder: function(){
		var
		totalPrice = 0.0,
		chartProducts = CartService.getList();
		
		chartProducts.forEach(function(product){
		    totalPrice += product[1].price;
		});
		
		var order = {
			data_order: new Date(),
			data_mod: new Date(),
			status: 'registered',
			price_products: totalPrice,
			price_shipping: 0.0,
			discounts: 0.0,
			clientes_id: localStorage.getItem("client_id")
		}
		
		OrderService.add(order, function(order){
		    var orderProducts = [];
		    
		    chartProducts.forEach(function(product){
			    orderProducts.push({
			    	ordersId: order.id,
			    	productId:product[1].id
			    });
		    });
		    OrderProductsService.add(orderProducts, function(orderProducts){
		    	// TODO : Show confirmation and order Id.
		    	alert("Order " + order.id + " was submitted successfully." )
		    });
		});
		
		
	}

};

CartController.init();