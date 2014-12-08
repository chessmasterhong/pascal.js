/**
 * @module modules/character
 */
define('modules/character', [], function() {
    'use strict';

    /**
     * WRITEME
     * @class Character
     * @param {String} c         The character currently being focused on. (cargo)
     * @param {Number} lineIndex The index of the line where the character is located in the srcText.
     * @param {Number} colIndex  The index of the column in the line where the character is located in the srcText.
     * @param {Number} srcIndex  The index of the character's position in the srcText.
     * @param {String} srcText   The entire source text.
     */
    function Character(c, lineIndex, colIndex, srcIndex, srcText) {
        // Initialize the scanner with default values
        this.cargo     = c;
        this.srcIndex  = srcIndex;
        this.lineIndex = lineIndex;
        this.colIndex  = colIndex;
        this.srcText   = srcText;
    }

    Character.prototype = {};

    /**
     * WRITEME
     * @function
     */
    Character.prototype.convertToString = function() {
        var cargo = this.cargo;

        if(cargo === ' ') {
            cargo = '    SPACE';
        } else if(cargo === '\n') {
            cargo = '    NEWLINE';
        } else if(cargo === '\t') {
            cargo = '    TAB';
        }
        /* NOTE: I cannot find an end-of-file equivalent character in the loaded file
        else if(cargo === 'EOF') {
            cargo = '    EOF';
        }*/

        return cargo;
    };

    return Character;
});
