<?php
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

$sql = "SELECT * FROM matches ORDER BY match_date ASC";
$result = $conn->query($sql);

$matches = [];

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $row['isBetOfTheDay'] = (bool)($row['is_bet_of_the_day'] ?? 0);
    $row['date'] = $row['match_date'] ?? null;
    $row['leagueCategory'] = $row['league_category'] ?? '';
    $row['league'] = $row['league_category'] ?? '';
    $row['home'] = $row['home_team'] ?? '';
    $row['away'] = $row['away_team'] ?? '';
    $row['risk'] = $row['risk'] ?? ($row['risk_level'] ?? 'Safe');
    $row['status'] = $row['status'] ?? 'pending';

    $matches[] = $row;
  }
}

echo json_encode($matches);
$conn->close();
