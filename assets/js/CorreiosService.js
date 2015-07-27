var CorreiosService = {
    
    getPriceAndDays: function(type, localCode, callback) {
        var result = {
            price: 0.0,
            days: 0
        },
        params = 
            'nCdEmpresa= &' + 	
            'sDsSenha= &' + 	
            'nCdServico=' + type + '&' + 	
            'sCepOrigem=37540000&' + 	
            'sCepDestino='+ localCode +'&' + 	
            'nVlPeso= &' + 	
            'nCdFormato=1&' + 	
            'nVlComprimento=0&' + 	
            'nVlAltura=0&' + 	
            'nVlLargura=0&' + 	
            'nVlDiametro=0&' + 	
            'sCdMaoPropria=N&' + 	
            'nVlValorDeclarado=0&' + 	
            'sCdAvisoRecebimento= ';	
            
        //$.get("http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?"+params, function(response) {
            $.ajax({
		        type: 'POST',
		    	url: 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrazo?nCdServico=40010&sCepOrigem=37540000&sCepDestino=37550000',
		    	dataType: 'text/xml',
			    success: function(response) {
				    callback(response);
			    },
			    error: function(response) {
			        callback(response);
			    }
            });
    }
}