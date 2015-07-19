<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();

$app->get('/', function () {
	echo 'APIs are up and running!';
});

$app->get('/verify', function () use ($app) {
 
 	error_log("funcao verify");
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
		error_log("sessao valida");
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
	echo 'Funciont client IN.';
	$db = getDB();
	
	$client = json_decode($app->request->getBody(), true);
	$result = $db->clients->insert($client);
	
	$app->response()->header("Content-Type", "application/json");
	echo json_encode($result);
});

$app->delete("/client/:id", function ($id) use ($app) {
	$db = getDB();
	$response = "";
	
	$client = $db->clients()->where("id", $id);
	
	if ($client->fetch()) {
		$result = $client->delete();
		$response = json_encode(array(
				"status" => true,
				"message" => "client deleted successfully"
		));
	}
	else {
		$response = json_encode(array(
				"status" => false,
				"message" => "client id $id does not exist"
		));
		$app->response->setStatus(404);
	}
	
	$app->response()->header("Content-Type", "application/json");
	echo $response;
});

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