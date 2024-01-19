// Fullscreen nav:
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("js--menu");
    const navigation = document.getElementById("js--nav");
    const body = document.getElementById("js--body");
    const close = document.getElementById("js--nav-close");

    if (button && navigation && body && close) {
        button.onclick = function () {
            navigation.style.visibility = "visible";
            navigation.style.opacity = 1;
            body.style.overflow = "hidden";
        };

        close.onclick = function () {
            navigation.style.visibility = "hidden";
            navigation.style.opacity = 0;
            body.style.overflow = "visible";
        };
    } else {
        console.error("One or more elements not found. Check your HTML.");
    }
});

// Picture taking code and upload code:
function displayErrorScreen() {
    document.querySelector(".error-container").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
    // Declare imageInfo in the outer scope
    let imageInfo;

    const video = document.getElementById("camera-feed");
    const captureBtn = document.getElementById("capture-btn");
    const canvas = document.getElementById("captured-photo");
    const context = canvas.getContext("2d");

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error accessing camera:", error);
            setTimeout(displayErrorScreen, 2500);
        });

    captureBtn.addEventListener("click", function () {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.style.display = "flex";

        // Convert the canvas content to a data URL (base64 encoded image)
        const imageDataUrl = canvas.toDataURL("image/png");

        // Generate a random image name starting with "QRIMG-" and exactly 36 characters long
        const imageName = generateRandomName();

        // Capture the current date and time
        const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

        // Update the outer-scope imageInfo
        imageInfo = { name: imageName, date: currentDate, data: imageDataUrl };

        // Send the image data to the server
        sendImageData(imageInfo);
    });

    function generateRandomName() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const randomPart = Array.from({ length: 31 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
        const nameRandom = "QRIMG-" + randomPart;
        return nameRandom;
    }

    function showDownloadButton() {
        document.querySelector(".download-container").style.display = "flex";
    }

    function sendImageData(imageInfo) {
        // Create a FormData object to send the image data
        const formData = new FormData();
        formData.append("imageName", imageInfo.name);
        formData.append("imageDate", imageInfo.date);
        formData.append("imageData", imageInfo.data);

        // Send the data to the PHP script using jQuery's AJAX
        $.ajax({
            url: "upload.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                if (data == "succes") {
                    setTimeout(showDownloadButton, 500);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error uploading image:", status, error);
            }
        });
    }

    function showQRCode() {
        document.querySelector(".qrcode-container").style.display = "flex";
    }

    function generateQRCode(imageInfo) {
        const qrCodeApi = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" + encodeURIComponent(imageInfo.data);

        // Display the QR code using an image element
        const qrCodeImg = document.getElementById("qrcode-img");
        qrCodeImg.src = qrCodeApi;
        showQRCode();
    }

    const generateBtn = document.querySelector(".downbutton");

    generateBtn.addEventListener("click", (event) => {
        event.preventDefault();
        setTimeout(() => generateQRCode(imageInfo), 100);
        document.getElementById("js--body").style.overflow = "hidden";
    });
});



// const generateBtn = document.querySelector(".downbutton");
// const qrImg = document.querySelector(".qrimg");
