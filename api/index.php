<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();

session_start();

$app->get('/', function () {
	echo 'APIs are up and running!';
});

// ########## LOGIN SERVICES  #######################
$app->get('/logout', function () use ($app) {
 
 	error_log("logout function");
 	session_start(); 
    session_destroy();
	
    // Client not logged in
    $response = json_encode(array(
		'status' => true
	));
	
	$app->response()->header('Content-Type', 'application/json');
	echo $response;
});

$app->get('/verify', function () use ($app) {
 
 	error_log("verify login function");
 	session_start(); 
	// Check if the session is already set.
	if(!isset($_SESSION["client_id"]) || !isset($_SESSION["client_name"])) 
	{ 
		error_log("no session");
    	// Client not logged in
    	$verified = json_encode(array(
				'status' => false
		));
	} else {
		error_log("session validated");
		$verified = json_encode(array(
				'status' => true,
				'client_id' => $_SESSION['client_id'],
				'client_name' => $_SESSION['client_name']
		));
		error_log($verified);
	}
	$app->response()->header('Content-Type', 'application/json');
	echo $verified;
});

$app->post("/loguser", function () use ($app) {
	$db = getDB();
	
	$clientreq = json_decode($app->request->getBody(), true);
	$sql = $db->clients()->where("password", $clientreq['password'])->and("email", $clientreq['email']);
	
	if ($client = $sql->fetch()) {
		
		$response = json_encode(array(
				'status' => true,
				'message' => "client logged successfully",
				'id' => $client['id'],
				'name' => $client['name'],
				'email' => $client['email'],
				'cpf' => $client['cpf'],
				'telephone' => $client['telephone']
		));
		session_start();
		$_SESSION['client_id']= $client['id'];
		$_SESSION['client_name']= $client['name'];
	}
	else {
		error_log('Login failed');
		$response = json_encode(array(
				'status' => false,
				'message' => "The email or password are incorrect. Please try again."
		));
	}
	
	$app->response()->header("Content-Type", "application/json");
	echo $response;
});

// ########## CLIENTS SERVICES  #######################
$app->get('/clients', function () use ($app) {
  $db = getDB();
	
	$clients = array();
	foreach($db->clients() as $client) {
		$clients[] = array(
			'id' => $client['id'],
			'name' => $client['name'],
			'email' => $client['email'],
            'cpf' => $client['cpf'],
            'telephone' => $client['telephone']
		);
	}
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($clients);
});

$app->post("/client", function () use ($app) {
	$db = getDB();
	
	$client = json_decode($app->request->getBody(), true);
	$result = $db->clients->insert($client);
	
	$app->response()->header("Content-Type", "application/json");
	echo json_encode($result);
});

// ########## ADDRESSES SERVICES  #######################
$app->post("/newaddress", function () use ($app) {
	$db = getDB();
	
	$addressobj = json_decode($app->request->getBody(), true);
	
	$result = $db->addresses->insert($addressobj);
	
	$app->response()->header("Content-Type", "application/json");
	$resultjson = json_encode($result);
	echo $resultjson;
});

// ########## ORDER SERVICES  #######################
$app->get('/orders', function () use ($app) {
  $db = getDB();
	error_log('orders function');
	
	$orders = array();
	session_start();
	error_log($_SESSION['client_id']);
	foreach($db->orders()->where("clientes_id",$_SESSION['client_id']) as $order) {
		$orders[] = array(
			'id' => $order['id'],
			'data_order' => $order['data_order'],
			'data_mod' => $order['data_mod'],
            'status' => $order['status']
		);
	}
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($orders);
});

$app->post("/orders", function () use ($app) {
	$db = getDB();
	
	$order = json_decode($app->request->getBody(), true);
	$result = $db->orders->insert($order);
	
	$app->response()->header("Content-Type", "application/json");
	echo json_encode($result);
});

// ########## ORDER_HAS_PRODUCTS SERVICES  #######################
$app->post("/orderProducts", function () use ($app) {
	$db = getDB();
	
	$orderProducts = json_decode($app->request->getBody(), true);
	$resultList = array();
	foreach($orderProducts as $orderProduct) {
	    $result = $db->orders_has_products->insert($orderProduct);
	    $resultList[] = array($result);
	}
	
	$app->response()->header("Content-Type", "application/json");
	echo json_encode($resultList);
});


// ########## PRODUCT SERVICES  #######################
$app->get('/products', function () use ($app) {
  $db = getDB();
	
	$products = array();
	foreach($db->products() as $product) {
		$products[] = array(
			'id' => $product['id'],
			'name' => $product['name'],
			'desc' => $product['des'],
            'price' => $product['price']
		);
	}
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($products);
});

$app->get("/products/:id", function ($id) use ($app) {
	$db = getDB();
	$response = "";
	
	$result = $db->products()->where("id", $id);
	$product = $result[1];
	
	$app->response()->header("Content-Type", "application/json");
	echo json_encode($product);
});

// ########## SHIPPING SERVICES  #######################
$app->get("/shipping/:serviceCode/:postalCode", function ($serviceCode, $postalcode) use ($app) {
	
	$soapClient = new SoapClient("http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?WSDL");
	$parameters = array('CalcPrecoPrazo' => array(
		'nCdServico' => $serviceCode,
		'sCepOrigem' => '3754000',
		'sCepDestino' => $postalcode,
		'nCdEmpresa' => '', 	
        'sDsSenha' => '', 	
        'nVlPeso' => '0', 	
        'nCdFormato' => '1', 	
        'nVlComprimento' => '16', 	
        'nVlAltura' => '2', 	
        'nVlLargura' => '11', 	
        'nVlDiametro' => '0', 	
        'sCdMaoPropria' => '', 	
        'nVlValorDeclarado' => '0', 	
        'sCdAvisoRecebimento' => ''
	));
		
	$result = $soapClient->__soapCall("CalcPrecoPrazo", $parameters);
	$app->response()->header("Content-Type", "application/json");
	echo json_encode($result);
});

// ########## DATABASE SERVICES  #######################
function getConnection() {
	$dbhost = getenv('IP');
	$dbuser = getenv('C9_USER');
	$dbpass = "";
	$dbname = "webshop";
	$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $pdo;
}

function getDB() {
	$pdo = getConnection();
	$db  = new NotORM($pdo);
	return $db;
}

$app->run();
?>