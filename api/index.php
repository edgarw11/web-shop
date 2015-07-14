<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();

$app->get('/', function () {
	echo 'APIs are up and running!';
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
            'telephone' => $client['telephone'],
            'password' => $client['password']
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

function getConnection() {
	$dbhost = "127.0.0.1";
	$dbuser = "root";
	$dbpass = "root";
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