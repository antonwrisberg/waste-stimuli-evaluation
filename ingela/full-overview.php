<?php

function generateGallery($dir) {
    // Recursively get all images from the directory and its subdirectories
    $images = getImages($dir);
    
    $imageCounter = 1;  // Initialize a global image counter

    // Start building the HTML output
    $html = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .subfolder {
            border: 2px solid #ddd;
            padding: 10px;
            margin-bottom: 20px;
        }
        .subfolder-title {
            font-size: 1.5em;
            margin-bottom: 10px;
        }
        .image-container {
            width: 18%;
            margin-bottom: 10px;
            text-align: center;
            position: relative;
        }
        .image-container img {
            width: 100%;
            cursor: pointer;
            transition: 0.3s;
        }
        .image-container img:hover {
            opacity: 0.7;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            padding-top: 100px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
        }
        .modal-content {
            margin: auto;
            display: block;
            max-width: 80%;
        }
        .modal-content:hover {
            cursor: pointer;
        }
        .modal-background {
            width: 100%;
            height: 100%;
            background: transparent;
            position: absolute;
            top: 0;
            left: 0;
        }
        .modal .close {
            position: absolute;
            top: 15px;
            right: 35px;
            color: white;
            font-size: 40px;
            font-weight: bold;
        }
        .modal .close:hover,
        .modal .close:focus {
            color: #999;
            cursor: pointer;
        }
    </style>
</head>
<body>
<h1>Image Gallery</h1>';

    // Loop through each subfolder and display images
    foreach ($images as $subfolder => $imgs) {
        $html .= '<div class="subfolder">';
        $html .= '<div class="subfolder-title">' . htmlspecialchars($subfolder) . '</div>';
        $html .= '<div class="gallery">';
        
        foreach ($imgs as $img) {
            $html .= '<div class="image-container">
                        <img src="' . htmlspecialchars($img) . '" alt="Image ' . $imageCounter . '" onclick="openModal(this.src)">
                        <div>Image ' . $imageCounter . '</div>
                      </div>';
            $imageCounter++;  // Increment the global counter
        }
        
        $html .= '</div></div>';
    }

    // Add modal HTML and JavaScript for lightbox functionality
    $html .= '
    <div id="myModal" class="modal">
        <div class="modal-background" onclick="closeModal()"></div>
        <span class="close" onclick="closeModal()">&times;</span>
        <img class="modal-content" id="imgInModal">
    </div>
    <script>
        function openModal(src) {
            document.getElementById("myModal").style.display = "block";
            document.getElementById("imgInModal").src = src;
        }
        function closeModal() {
            document.getElementById("myModal").style.display = "none";
        }
    </script>
</body>
</html>';

    // Save the HTML to a file
    file_put_contents('gallery.html', $html);
}

// Function to recursively get all images from the directory
function getImages($dir) {
    $images = [];
    $folders = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir), RecursiveIteratorIterator::SELF_FIRST);

    foreach ($folders as $file) {
        if ($file->isDir()) {
            continue;
        }
        if (in_array(strtolower($file->getExtension()), ['jpg', 'jpeg', 'png', 'gif'])) {
            $subfolder = str_replace($dir . '/', '', dirname($file->getPathname()));
            $images[$subfolder][] = $file->getPathname();
        }
    }
    return $images;
}

// Call the function and generate the gallery
generateGallery('../assets/img/stimuli-1.2-800x800-sorted');

?>