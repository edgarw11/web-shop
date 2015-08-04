var CartController = {
	
	init: function () {
		CartController.showList();
		CartController.setOrderButton();
		CartController.setShippingForm();
	},
	
	setShippingForm: function() {
		var shippingForm = document.getElementById('shippingForm');
		    
		shippingForm.addEventListener('submit', function(event) {
			event.preventDefault();
			
			var localCode = document.getElementById('localCode').value,
				typeInputs = document.getElementsByName('shippingType'),
				shippingType,
				i;
				
			if (!localCode) {
				alert('Please enter a valid Local Code.');
				return;
			}
				
			for(i = 0; i < typeInputs.length; i++) {
				if (typeInputs[i].checked) {
					shippingType = typeInputs[i].value;
					break;
				}
			}
			
			if (!shippingType) {
				alert('Please select a Shipping Type.');
				return;
			}
		        
			CorreiosService.getPriceAndDays(shippingType, localCode, function(result) {
				var daysInput = document.getElementById('shippingDays'),
					priceInput = document.getElementById('shippingPrice');
				daysInput.value = result.days;
				priceInput.value = result.price;
			});
			
		
		});
	},
	
	showList: function() {
		CartService.getList(function(list) {
			CartController.addToHTML(list);
		});
	},
	
	addToHTML: function(list) {
		var
			productList = document.getElementById('productList'),
			table = document.createElement('table'),
			totalPrice = 0.0;
			
		table.appendChild(CartController.createHeader());
		
		CartService.getList(function(list){
		    list.forEach(function(id) {
		    	ProductService.get(id, function(product) {
		    	    totalPrice += product.price;
			        table.appendChild(CartController.createTR(product));
		    	});
		    });	
		});
		// TODO : set total price;
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
			
		tdName.innerHTML = product.name;
		tdPrice.innerHTML = product.price;
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
		
		imgRemove.setAttribute('data-productid', product.id);
		
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
	
	
	setOrderButton: function(){
		var orderButton = document.getElementById('orderButton');
		orderButton.addEventListener('click', function() {
			SessionController.verify();
			var totalPrice = 0.0,
		
			order = {
				data_order: new Date(),
				data_mod: new Date(),
				status: 'registered',
				price_products: totalPrice,
				price_shipping: 0.0,
				discounts: 0.0,
				clientes_id: localStorage.getItem("client_id")
			};
		
			OrderService.add(order, function(order) {
		    	
		    
		    CartService.getList(function(list){
		    list.forEach(function(id) {
		    	ProductService.get(id, function(product) {
			   		orderProducts.push({
			   			ordersId: order.id,
			   			productId: product.id
			   		});
		    	});
		    });
		    });
		    	
		    	OrderProductsService.add(orderProducts, function(orderProducts){
		    		// TODO : Show confirmation and order Id.
		    		alert("Order " + order.id + " was submitted successfully.");
		    	});
			});
		});
	 }
};

CartController.init();