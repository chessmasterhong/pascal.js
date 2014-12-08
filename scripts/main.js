require.config({
    baseUrl: './scripts/'
});

define([
    'require',
    'modules/init'
], function(require, Init) {
    'use strict';

    // Check if File API is supported in browser
    if(File && FileReader) {
        var init = new Init();

        // Detect changes (loaded file) in fileInput and runs the compiler on change
        document.getElementById('fileInput').addEventListener('change', init.readFile, false);
    } else {
        alert('ERROR: The File APIs are not fully supported in your browser.');
    }
});
