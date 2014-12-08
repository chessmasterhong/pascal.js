/**
 * @module modules/character
 */
define('modules/character', [], function() {
    'use strict';

    /**
     * @typedef CharacterObject
     * @type {Object}
     * @property {Number} return.lineIndex The index of the line where the character is located in the srcText.
     * @property {Number} return.colIndex  The index of the column in the line where the character is located in the srcText.
     * @property {String} return.cargo     The displayable string representation of the character.
     */

    /**
     * The Character class wraps a single character that the scanner retrieves
     *     from the source text. In addition to holding the character itself, it
     *     holds information about the location of the character in the source
     *     text. This information will be available to a token that uses this
     *     character character. If an error occurs, the token can use this
     *     information to report the line and column where the error occurred,
     *     and to show an image of the line in srcText where the error occurred.
     * @class Character
     * @param {String} c         The current character being focused on.
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
     * Converts the current character to a displayable string representation.
     * @function
     * @returns {CharacterObject} The information about this character.
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
        /* NOTE: I am unable find an end-of-file equivalent character/symbol in the loaded file
        else if(cargo === 'EOF') {
            cargo = '    EOF';
        }*/

        return {
            lineIndex: this.lineIndex,
            colIndex: this.colIndex,
            cargo: cargo
        };
    };

    return Character;
});
