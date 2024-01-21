<?php
if (isset($_POST["imageName"]) && isset($_POST["imageDate"]) && isset($_POST["imageData"])) {
    $imageName = $_POST["imageName"];
    $imageDate = $_POST["imageDate"];
    $imageData = $_POST["imageData"];

    // Decode base64 data
    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    $imageData = str_replace(' ', '+', $imageData);
    $imageData = base64_decode($imageData);

    // Use provided filename
    $filename = 'uploads/' . $imageName . '.png';

    // Save the image file
    file_put_contents($filename, $imageData);

    // Database connection
    $servername = "mariadb";
    $database = "QRWeb";
    $username = "root";
    $password = "4dy5qwtrsag#!sad";

    // Insert the file path, name, and date into the database
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare("INSERT INTO saved_photo (name, date, file_path) VALUES (:name, :date, :file_path)");
        $stmt->bindParam(':name', $imageName);
        $stmt->bindParam(':date', $imageDate);
        $stmt->bindParam(':file_path', $filename);
        $stmt->execute();

        echo "success";
    } catch (PDOException $e) {
        $response = array("success" => false, "message" => "Error: " . $e->getMessage());
        echo "failed";
    }

    $conn = null;
} else {
    $response = array("success" => false, "message" => "Incomplete image data received");
    echo "bad img :(";
}