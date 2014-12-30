/**
 * @module modules/scanner
 */
define('modules/scanner', [
    'modules/character'
], function(Character) {
    'use strict';

    /**
     * The Scanner class reads the source file one character at time. For each
     *     character, it keeps track of the line, column, and position where the
     *     character was found. Each time the scanner is called, it reads the
     *     next character from the file and returns it.
     * @class Scanner
     * @param {String}  srcText              The entire source text to be scanned.
     * @param {Boolean} [whitespaceToString] Option flag to convert whitespace characters to displayable string representation.
     */
    function Scanner(srcText, whitespaceToString) {
        this.srcText    = srcText;
        this.finalIndex = this.srcText.length - 1;
        this.srcIndex   = -1;
        this.lineIndex  = 0;
        this.colIndex   = -1;

        this.whitespaceToString = whitespaceToString;
    }

    Scanner.prototype = {};

    /**
     * Gets the next character in srcText.
     * @function
     * @returns {CharacterObject} _ The information about this character.
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
            char = new Character('EOF' , this.lineIndex, this.colIndex, this.srcIndex, this.srcText);
        } else {
            char = new Character(this.srcText[this.srcIndex], this.lineIndex, this.colIndex, this.srcIndex, this.srcText);
        }

        return this.whitespaceToString === true ? char.convertToString() : char;
    };

    /**
     * Looks ahead to the next character in srcText. This will not advance the
     *     Scanner position index in srcText.
     * @return {String} _ The next character in srcText.
     */
    Scanner.prototype.lookahead = function() {
        var nextSrcIndex  = this.srcIndex + 1,
            nextLineIndex = this.lineIndex + 1,
            nextColIndex  = this.colIndex + 1;

        var char;
        if(nextSrcIndex > this.finalIndex) {
            char = new Character('EOF' , nextLineIndex, nextColIndex, nextSrcIndex, this.srcText);
        } else {
            char = new Character(this.srcText[nextSrcIndex], nextLineIndex, nextColIndex, nextSrcIndex, this.srcText);
        }

        return char;
    };

    return Scanner;
});
