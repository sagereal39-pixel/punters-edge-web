<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$date = $_GET['date'] ?? date('Y-m-d');

$url = "https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=$date&s=Soccer";

$response = file_get_contents($url);

if (!$response) {
  echo json_encode([
    "status" => "error",
    "message" => "Failed to fetch from TheSportsDB"
  ]);
  exit;
}

$data = json_decode($response, true);

$events = $data['events'] ?? [];

$matches = array_map(function ($event) {
  return [
    "id" => $event['idEvent'],
    "home" => $event['strHomeTeam'],
    "away" => $event['strAwayTeam'],
    "date" => $event['dateEvent'],
    "leagueCategory" => $event['strLeague']
  ];
}, $events);

echo json_encode([
  "status" => "success",
  "count" => count($matches),
  "matches" => $matches
]);
