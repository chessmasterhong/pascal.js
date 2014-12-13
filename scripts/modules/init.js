/**
 * @module modules/init
 */
define('modules/init', [
    'modules/scanner',
    'modules/lexer'
], function(Scanner, Lexer) {
    'use strict';

    /**
     * The Init class interfaces with the File API to enable loading files
     *     through the web browser and extracting the source file's contents for
     *     the compiler to read from. It is also responsible for initializing,
     *     driving, and stopping the compiler process.
     * @class Init
     */
    function Init() {
        window.OUTPUT = document.getElementById('output');

        window.TOKENS = {
            'EOF'  : 'TK_END_OF_FILE',
            'SPACE': 'TK_SPACE',
            'TAB'  : 'TK_TAB',
            'LF'   : 'TK_LINE_FEED',
            'CR'   : 'TK_CARRIAGE_RETURN'
        };
    }

    Init.prototype = {};

    /**
     * Extracts the contents from the source file.
     * @function
     * @param {Object} evt The event change object containing the list of files to be loaded.
     * @returns {Undefined}
     */
    Init.prototype.readFile = function(evt) {
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

                //scannerDriver(e.target.result);
                lexerDriver(e.target.result);
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

    /**
     * Initializes the Scanner with source contents. Drives the Scanner to
     *     repeatedly get characters in contents. Stops the Scanner when end of
     *     contents is reached.
     * @function
     * @param   {String}    contents The source contents the Scanner will read from.
     * @returns {Undefined}
     */
    function scannerDriver(contents) {
        // Initialize the Scanner
        var scanner = new Scanner(contents);

        window.OUTPUT.innerHTML = 'LINE COL  CHARACTER\n';

        var character;

        // Drive the Scanner to traverse through each character in source file until end of file
        do {
            // Get next character in source file.
            character = scanner.get();

            window.OUTPUT.innerHTML += ('    ' + character.lineIndex).slice(-4) + ' ' + ('    ' + character.colIndex).slice(-3) + '  ' + character.cargo + '\n';

            // End of file reached, stop the driver.
            if(character.cargo === window.TOKENS.EOF) {
                break;
            }
        } while(true);
    }

    /**
     * Initializes the Lexer with source contents. Drives the Lexer to
     *     repeatedly get tokens in contents. Stops the Lexer when end of
     *     contents is reached.
     * @function
     * @param   {String}    contents The source contents the Lexer will read from.
     * @returns {Undefined}
     */
    function lexerDriver(contents) {
        // Initialize the Lexer
        var lexer = new Lexer(contents);

        window.OUTPUT.innerHTML = 'LINE COL         CHARACTER  TOKEN\n';

        var token;

        // Drive the Lexer to traverse through each character in source file until end of file
        do {
            // Get next token in source file.
            token = lexer.get();

            window.OUTPUT.innerHTML += ('    ' + token.lineIndex).slice(-4) + ' ' + ('    ' + token.colIndex).slice(-3) + '  ' + ('                ' + token.cargo).slice(-16) + '  ' + token.tokenType + '\n';

            // End of file reached, stop the driver.
            if(token.cargo === window.TOKENS.EOF) {
                break;
            }
        } while(true);
    }

    return Init;
});
