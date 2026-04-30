<?php
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit;
}

$host = getenv('DB_HOST') ?: "mysql.railway.internal";
$port = getenv('DB_PORT') ?: 3306;
$user = getenv('DB_USER') ?: "root";
$pass = getenv('DB_PASS') ?: "vCOWKZXXPuKeTFEcFtTHEkSsXrxtLHVs"; // Live servers will provide this via ENV
$dbname = getenv('DB_NAME') ?: "railway";
// $conn = new mysqli($host, $user, $pass, $dbname, $port);

// Connect with a timeout to prevent 502 hangs
mysqli_report(MYSQLI_REPORT_STRICT);
try {
  $conn = new mysqli($host, $user, $pass, $dbname, $port);
} catch (Exception $e) {
  echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
  exit;
}

// Set charset to handle special characters correctly
$conn->set_charset("utf8mb4");

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);
$response = ["status" => "error", "message" => "No action performed"];

// POST Section
if ($method == 'POST' && !empty($data)) {
  $sql = "INSERT INTO matches (home_team, away_team, match_date, league_category, prediction, risk_level, is_bet_of_the_day, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $betVal = (isset($data['isBetOfTheDay']) && $data['isBetOfTheDay'] == true) ? 1 : 0;
  $status = $data['status'] ?? 'pending';

  $stmt->bind_param(
    "ssssssis",
    $data['home'],
    $data['away'],
    $data['date'],
    $data['leagueCategory'],
    $data['prediction'],
    $data['risk'],
    $betVal,
    $status
  );

  if ($stmt->execute()) {
    $response = ["status" => "success"];
  } else {
    $response = ["status" => "error", "message" => $stmt->error];
  }
  // PUT Section
} elseif ($method == 'PUT' && !empty($data)) {
  $sql = "UPDATE matches SET home_team=?, away_team=?, match_date=?, league_category=?, prediction=?, risk_level=?, is_bet_of_the_day=?, status=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $betVal = (isset($data['isBetOfTheDay']) && $data['isBetOfTheDay'] == true) ? 1 : 0;
  $status = $data['status'] ?? 'pending';

  $stmt->bind_param(
    "ssssssisi", // 9 parameters total
    $data['home'],
    $data['away'],
    $data['date'],
    $data['leagueCategory'],
    $data['prediction'],
    $data['risk'],
    $betVal,
    $status,
    $data['id']
  );

  if ($stmt->execute()) {
    $response = ["status" => "success"];
  } else {
    $response = ["status" => "error", "message" => $stmt->error];
  }
} elseif ($method == 'DELETE') {
  // Get the ID from the URL parameter (e.g., api.php?id=123)
  $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

  if ($id > 0) {
    $sql = "DELETE FROM matches WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
      $response = ["status" => "success"];
    } else {
      $response = ["status" => "error", "message" => $stmt->error];
    }
  } else {
    $response = ["status" => "error", "message" => "Invalid ID"];
  }
}

echo json_encode($response);
$conn->close();
