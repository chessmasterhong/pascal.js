(function() {
    'use strict';

    function readFile(evt) {
        // Retrieve first file from FileList object
        var file = evt.target.files[0];

        if(file) {
            var reader = new window.FileReader();
            reader.onload = function(e) {
                console.log('File was successfully loaded.');
                console.log('File Name: ' + file.name);
                console.log('File Type: ' + file.type);
                console.log('File Size: ' + file.size + ' bytes');
                console.log('File Contents (first 100 chars): \n' + e.target.result.substr(0, 100));
            };

            reader.readAsText(file);
        } else {
            console.log('Failed to load file.');
        }
    }

    if(window.File && window.FileReader && window.FileList && window.Blob) {
        document.getElementById('fileInput').addEventListener('change', readFile, false);
    } else {
        console.log('The File APIs are not fully supported in your browser.');
    }
}());
