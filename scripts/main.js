/**
 * The entry point for this compiler. Detects changes in file loaded through the
 *     web browser and initializes the compiler process. It also handles the
 *     application's configuration and module dependencies.
 * @module main
 */

require.config({
    baseUrl: './scripts/'
});

define('main', [
    'modules/init'
], function(Init) {
    'use strict';

    // Check if File API is supported in browser
    if(File && FileReader) {
        var init = new Init();

        var opts = document.input.options;
        for(var i = 0; i < opts.length; i++) {
            opts[i].checked = window.OPTIONS[opts[i].value];
        }

        // Detect changes (loaded file) in fileInput and runs the compiler on change
        document.getElementById('fileInput').addEventListener('change', init.readSrc, false);
    } else {
        alert('ERROR: The File APIs are not fully supported in your browser.');
    }
});
