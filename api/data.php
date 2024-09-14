<?php
header('Content-Type: application/json');

echo 'script running';

// Collect the user inputs and the API response
$inputName = $_POST['name'] ?? '';
$inputTopic = $_POST['topic'] ?? '';
$inputWords = $_POST['words'] ?? '';
$apiResponse = $_POST['response'] ?? '';

echo 'variables defined';

// Specify the file path
$filePath = '..\logs\responses.csv';

echo 'got the path';

// Debugging: Output the current directory
echo 'Current directory: ' . getcwd() . "\n";

// Check if the directory exists and is writable
$dirPath = dirname($filePath);
if (!is_dir($dirPath)) {
    echo json_encode(['error' => "Directory does not exist: $dirPath"]);
    exit;
}

if (!is_writable($dirPath)) {
    echo json_encode(['error' => "Directory is not writable: $dirPath"]);
    exit;
}

// Open the CSV file for appending
$file = fopen($filePath, 'a');

if ($file === false) {
    echo json_encode(['error' => 'Failed to open log file for writing.']);
    exit;
}

// Write the data to the CSV file
fputcsv($file, [$inputName, $inputTopic, $inputWords, $apiResponse]);

// Close the file
fclose($file);

// Output the response to be used by AJAX
echo json_encode(['message' => $apiResponse]);
?>
