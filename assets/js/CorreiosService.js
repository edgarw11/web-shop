var CorreiosService = {
    
    getPriceAndDays: function(type, localCode, callback) {
        $.ajax({
	        type: 'GET',
	    	url: '/api/shipping/'+type+'/'+localCode,
	    	dataType: 'json',
		    success: function(response) {
		       var result = {}; 
			   result.price = response.CalcPrecoPrazoResult.Servicos.cServico.Valor;
			   result.days = response.CalcPrecoPrazoResult.Servicos.cServico.PrazoEntrega;
			   callback(result);
		    },
		    error: function(response) {
		        callback(response);
		    }
        });
    }
}