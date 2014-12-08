require.config({
    baseUrl: './scripts/'
});

define([
    'require',
    'modules/scanner'
], function(require, Scanner) {
    'use strict';

    // Check if File API is supported in browser
    if(File && FileReader) {
        var readFile = function(evt) {
            // Retrieve first file from FileList object (if multiple files selected)
            var file = evt.target.files[0];

            if(file) {
                // Instantiate FileReader object to read file data to memory
                var reader = new FileReader();

                // Fire onprogress event while reading file
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

                    var scanner = new Scanner(e.target.result);
                    var character = scanner.get();

                    while(true) {
                        console.log(character)
                        if(character === '    EOF') {
                            break;
                        }
                        character = scanner.get();
                    }
                };

                // Fire onerror event if error occurred while reading file
                reader.onerror = function(e) {
                    if(e.target.error.name === 'NotReadableError') {
                        alert('ERROR: There was an error reading the file.');
                    }
                };

                // Read file as a text string decoded as UTF-8
                reader.readAsText(file, 'utf-8');
            } else {
                alert('ERROR: The file cannot be loaded.');
            }
        };

        // Detect changes (loaded file) in fileInput and run readFile() on change
        document.getElementById('fileInput').addEventListener('change', readFile, false);
    } else {
        alert('ERROR: The File APIs are not fully supported in your browser.');
    }
});
