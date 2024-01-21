<?php
if (isset($_GET["imageName"])) {
    $imageSrc = "https://tygojedema.xyz/qrcode/download.php?imageurl=" . $_GET["imageName"];
    // Sanitize the input to prevent security issues
    $imageName = filter_var($_GET["imageName"]);

    // Output folder for QR codes
    $outputDir = "qrcodes/";

    // Ensure the output directory exists, create it if not
    if (!file_exists($outputDir) && !mkdir($outputDir, 0777, true)) {
        echo json_encode(array("error" => "Failed to create output directory"));
        exit;
    }

    include "./phpqrcode/qrlib.php";

    // Generate QR code
    $qrCodePath = $outputDir . $imageName . ".png";
    QRcode::png($imageSrc, $qrCodePath);
    echo $qrCodePath;
    return $qrCodePath;

} else {
    echo json_encode(array("error" => "Invalid request"));
}
