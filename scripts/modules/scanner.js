/**
 * @module modules/scanner
 */
define('modules/scanner', [
    'modules/character'
], function(Character) {
    'use strict';

    /**
     * WRITEME
     * @class Scanner
     * @param {String} srcText The entire source text to be scanned.
     */
    function Scanner(srcText) {
        this.srcText    = srcText;
        this.finalIndex = this.srcText.length - 1;
        this.srcIndex   = -1;
        this.lineIndex  = 0;
        this.colIndex   = -1;
    }

    Scanner.prototype = {};

    /**
     * Gets information of the next character in srcText.
     * @function
     * @returns {CharacterObject} The information about this character converted to a displayable string representation.
     */
    Scanner.prototype.get = function() {
        this.srcIndex++;

        if(this.srcIndex > 0) {
            if(this.srcText[this.srcIndex - 1] === '\n') {
                this.lineIndex++;
                this.colIndex = -1;
            }
        }

        this.colIndex++;

        var char;
        if(this.srcIndex > this.finalIndex) {
            char = new Character('    EOF' , this.lineIndex, this.colIndex, this.srcIndex, this.srcText);
        } else {
            var c = this.srcText[this.srcIndex];
            char = new Character(c, this.lineIndex, this.colIndex, this.srcIndex, this.srcText);
        }

        return char.convertToString();
    };

    return Scanner;
});
