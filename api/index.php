<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();

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
	
	error_log($app->request->getBody());
	$addressobj = json_decode($app->request->getBody(), true);
	error_log('passou pelo stringify');
	$result = $db->addresses->insert($addressobj);
	error_log('passou pelo banco');
	error_log($result);
	
	$app->response()->header("Content-Type", "application/json");
	$resultjson = json_encode($result);
	echo $resultjson;
});

// ########## PRODUCT SERVICES  #######################
$app->get('/products', function () use ($app) {
  $db = getDB();
	
	$products = array();
	foreach($db->products() as $product) {
		$products[] = array(
			'id' => $product['id'],
			'name' => $product['name'],
			'desc' => $product['desc'],
            'price' => $product['price']
		);
	}
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($products);
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