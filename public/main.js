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

        const imageDataUrl = canvas.toDataURL("image/png");
        const imageName = generateRandomName();
        const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        imageInfo = { name: imageName, date: currentDate, data: imageDataUrl };

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
        const formData = new FormData();
        formData.append("imageName", imageInfo.name);
        formData.append("imageDate", imageInfo.date);
        formData.append("imageData", imageInfo.data);

        $.ajax({
            url: "upload.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                if (data == "success") {
                    // After successful upload, generate QR code
                    setTimeout(showDownloadButton, 100);
                    setTimeout(() => generateQRCode(imageInfo.name), 500);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error uploading image:", status, error);
            }
        });
    }

    function showQRCode() {
        document.querySelector(".qrcode-container").style.display = "flex";
        document.getElementById("js--body").style.overflow = "hidden";
    }

    function generateQRCode(imageName) {
        // Request the server to generate QR code for the given image name
        $.ajax({
            url: "genqr.php",
            type: "GET",
            data: { imageName: imageName },
            success: function (data) {
                const qrCodeImg = document.querySelector(".qrcode");
                qrCodeImg.src = data;
            },
            error: function (xhr, status, error) {
                console.error("Error generating QR code:", status, error);
            }
        });
    }

    const generateBtn = document.querySelector(".downbutton");

    generateBtn.addEventListener("click", (event) => {
        event.preventDefault();
        showQRCode();
    });

    document.querySelector(".qrcode-container").addEventListener("click", function (event) {
        if (event.target.classList.contains("qrcode-container")) {
            document.querySelector(".qrcode-container").style.display = "none";
            document.getElementById("js--body").style.overflow = "auto";
        }
    });
});

function downloadImg(imageSrc) {
    // Create an anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = imageSrc;

    // Extract the filename from the imageSrc (assuming it's the last part after '/')
    const fileName = imageSrc.split('/').pop();
    downloadLink.download = fileName;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}