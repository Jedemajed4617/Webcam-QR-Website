<?php
if (isset($_GET["imageName"])) {
    $imageName = $_GET["imageName"];

    // Output folder for QR codes
    $outputDir = "qrcodes/";

    // Ensure the output directory exists
    if (!file_exists($outputDir)) {
        mkdir($outputDir);
    }

    include "./phpqrcode/qrlib.php";
    
    // Generate QR code
    $qrCodePath = $outputDir . $imageName . ".png";
    QRcode::png($imageName, $qrCodePath);

    // Return the path to the generated QR code
    echo json_encode(array("qrCodePath" => $qrCodePath));
} else {
    echo json_encode(array("error" => "Invalid request"));
}