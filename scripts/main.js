(function() {
    'use strict';

    function readFile(evt) {
        // Retrieve first file from FileList object
        var file = evt.target.files[0]; // Obtain first file if multiple files selected

        if(file) {
            // Instantiate FileReader object to read file data to memory
            var reader = new window.FileReader();

            // Fire onload event when when data can be accessed
            reader.onload = function(e) {
                console.log('File was successfully loaded.');
                console.log('File Name: ' + file.name);
                console.log('File Type: ' + file.type);
                console.log('File Size: ' + file.size + ' bytes');
                console.log('File Contents (first 100 chars): \n' + e.target.result.substr(0, 100));
            };

            // Read file as a text string decoded as UTF-8
            reader.readAsText(file);
        } else {
            console.log('Failed to load file.');
        }
    }

    // Check if File API is supported in browser
    if(window.File && window.FileReader && window.FileList && window.Blob) {
        // Detect changes (loaded file) in fileInput and run readFile() on change
        document.getElementById('fileInput').addEventListener('change', readFile, false);
    } else {
        console.log('The File APIs are not fully supported in your browser.');
    }
}());
