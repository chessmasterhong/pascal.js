require.config({
    baseUrl: './scripts/'
});

define([
    'require',
    'modules/scanner'
], function(require) {
    'use strict';

    var scanner = require('modules/scanner');

    // Check if File API is supported in browser
    if(File && FileReader && FileList && Blob) {
        // Detect changes (loaded file) in fileInput and run readFile() on change
        document.getElementById('fileInput').addEventListener('change', scanner.readFile, false);
    } else {
        alert('ERROR: The File APIs are not fully supported in your browser.');
    }
});
