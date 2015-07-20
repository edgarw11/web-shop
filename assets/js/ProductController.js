var ProductController = {
	
	init: function () {
		ProductController.showList();
		ProductController.updateCartStatus();
	},
	
	addToCart: function(imgCart) {
		var 
			productId = imgCart.dataset.productid;
		
		CartService.add(productId, function(isAdded) {
			if(isAdded) {
				imgCart.parentNode.removeChild(imgCart);
				ProductController.updateCartStatus();
			}
		})
	},
	
	showList: function() {
		ProductService.getList(function(list) {
			list.forEach(function(product) {
				ProductController.addToHTML(product);
			});	
		});
	},
	
	addToHTML: function(product) {
		var
			productList = document.getElementById('productList'),
			dl = document.createElement('dl'),
			dt = ProductController.createDT(product),
			ddName = ProductController.createDD(product.name, 'name'),
			ddDesc = ProductController.createDD(product.desc, 'des'),
			ddPrice = ProductController.createDD(product.price, 'price'),
			addToChart = ProductController.createAddtoCart(product);
			
		dl.appendChild(dt);
		dl.appendChild(addToChart);
		dl.appendChild(ddName);
		dl.appendChild(ddDesc);
		dl.appendChild(ddPrice);
	
		
		productList.appendChild(dl);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	createDT: function(Product) {
		var 
			dt = document.createElement('dt');
			//img = ProductController.createImage();
		
		//dt.appendChild(img);
		dt.className = "product";
		
		return dt;
	},
	
	createDD: function(value, className) {
		var dd = document.createElement('dd');
		
		dd.innerHTML = value;
		dd.className = className;
		
		return dd;
	},
	
	createAddtoCart: function(product) {
		// CartService.getList(function(list){
		//     list.forEach(function(cart) {
		//     	if(cart[1].id != product.id) {
		
				var a = document.createElement('a');
				a.href = "#";
				var imgCart = ProductController.createImage('assets/images/cart.png');
				
				imgCart.setAttribute('data-productid', product.id);
				imgCart.setAttribute('data-productname', product.name);
				
				imgCart.addEventListener('click', function() {
					ProductController.addToCart(this);
				});
				
				a.appendChild(imgCart);
		//     }
		// });
		
		return a;
	},
	
	updateCartStatus: function(){
		CartService.getList(function(list){
			var itensOnChart = document.getElementById("itensOnChart");
			itensOnChart.value = list.length;
		});
	}

};

ProductController.init();