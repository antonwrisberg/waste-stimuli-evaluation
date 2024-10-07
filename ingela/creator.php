<?php

// Define the title and directory
$title = '"Resten"'; // Change this to your desired title
$directory = "../assets/img/stimuli-1.2-800x800-sorted/zzz vet inte/"; // Change this to the directory with your images

// Supported image formats
$supported_formats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

// Open the directory and read the image files
$images = [];
if (is_dir($directory)) {
    if ($dh = opendir($directory)) {
        while (($file = readdir($dh)) !== false) {
            $file_extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($file_extension, $supported_formats)) {
                $images[] = $file;
            }
        }
        closedir($dh);
    }
}

// Generate HTML content
$html_content = "<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>$title</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
        }
        h1 {
            margin: 20px 0;
            font-size: 2.5em;
        }
        .gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }
        .gallery img {
            width: 25vw;
            height: auto;
            border: 2px solid #ddd;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            cursor: pointer;
        }
        .gallery div {
            text-align: center;
            position: relative;
        }
        .gallery p {
            margin: 5px 0;
            font-size: 1.2em;
        }
        .magnify-icon {
            cursor: pointer;
            font-size: 1.2em;
            margin-left: 10px;
            color: #333;
        }
        /* Style for modal (large image view) */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.8);
            justify-content: center;
            align-items: center;
        }
        .modal-content {
            max-width: 80%;
            max-height: 80%;
        }
        .close {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #fff;
            font-size: 2em;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>$title</h1>
    <div class='gallery'>";

// Add each image to the HTML content with a magnifying glass icon
$counter = 1;
foreach ($images as $image) {
    $image_path = "$directory/$image";
    $html_content .= "<div>
                        <img src='$image_path' alt='Image $counter' onclick='openModal(\"$image_path\")'>
                        <p>Image $counter 
                            <span class='magnify-icon' onclick='openModal(\"$image_path\")'>&#128269;</span>
                        </p>
                      </div>";
    $counter++;
}

$html_content .= "
    </div>

    <!-- Modal for larger image -->
    <div id='imageModal' class='modal'>
        <span class='close' onclick='closeModal()'>&times;</span>
        <img class='modal-content' id='modalImage'>
    </div>

    <script>
        // Open the modal with the larger image
        function openModal(imageSrc) {
            document.getElementById('imageModal').style.display = 'flex';
            document.getElementById('modalImage').src = imageSrc;
        }

        // Close the modal
        function closeModal() {
            document.getElementById('imageModal').style.display = 'none';
        }
    </script>

</body>
</html>";

// Write the HTML content to a file
$file_path = 'gallery.html';
file_put_contents($file_path, $html_content);

echo "HTML gallery created successfully! Open 'gallery.html' to view the images.";

?>