<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit;
}

$host = "127.0.0.1";
$port = 3307;
$user = "root";
$pass = "";
$dbname = "predictions";

$conn = new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
  echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
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
