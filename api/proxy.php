<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$apiKey = 'sk-FHe9ax-CZT6IFrOJMO3uMoUvVLDJdFuc-hx_QLhFX5T3BlbkFJwh7VTshudrS1LSSn-fLa_DuJa9TkwqwqKV9-4QuxMA'; // Ensure this is correct

$inputData = json_decode(file_get_contents('php://input'), true);
if ($inputData === null) {
    echo 'Error decoding JSON input';
    exit;
}

$ch = curl_init('https://api.openai.com/v1/chat/completions');

// Temporarily disable SSL verification
//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($inputData));

$response = curl_exec($ch);

curl_close($ch);

header('Content-Type: application/json');
echo $response;
?>
