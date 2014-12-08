(function() {
    'use strict';

    function readFile(evt) {
        // Retrieve first file from FileList object (if multiple files selected)
        var file = evt.target.files[0];

        if(file) {
            // Instantiate FileReader object to read file data to memory
            var reader = new window.FileReader();

            // Fire onprogress event while file is being read
            reader.onprogress = function(e) {
                if(e.lengthComputable) {
                    var loaded = Math.floor((e.loaded / e.total) * 100);
                    if(loaded < 1) {
                        console.log('Loading file: ' + loaded + '%');
                    }
                }
            };

            // Fire onload event when file has been successfully read
            reader.onload = function(e) {
                console.log('File was successfully loaded.');
                console.log('File Name: ' + file.name);
                console.log('File Type: ' + file.type);
                console.log('File Size: ' + file.size + ' bytes');
                console.log('File Contents (first 100 chars): \n' + e.target.result.substr(0, 100));
            };

            reader.onerror = function(e) {
                if(e.target.error.name === 'NotReadableError') {
                    console.log('There was an error reading the file.');
                }
            };

            // Read file as a text string decoded as UTF-8
            reader.readAsText(file);
        } else {
            console.log('The file cannot be loaded.');
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
