/**
 * @module modules/token
 */
define('modules/token', [
    'modules/character'
], function() {
    'use strict';

    /**
     * The Token class wraps its cargo (a string of characters) and holds
     *     information about the token. For each token, it holds the text of the
     *     token, the token's type, and the initial position (line number and
     *     column number) where the token starts.
     * @class Token
     * @param {String} startChar The starting character
     */
    function Token(startChar) {
        this.cargo     = startChar.cargo;
        this.srcText   = startChar.srcText;
        this.lineIndex = startChar.lineIndex;
        this.colIndex  = startChar.colIndex;
        this.tokenType = null;

        if(this.cargo === 'EOF') {
            this.tokenType = 'End of file';
        } else if(this.isWhitespace()) {
            this.tokenType = 'Whitespace';
        } else if(this.isAlphanumeric()) {
            this.tokenType = 'Alphanumeric';
        } else if(this.isSymbol()) {
            this.tokenType = this.isSymbol();
        } else {
            this.tokenType = '';
        }
    }

    Token.prototype = {};

    Token.prototype.show = function() {
        var s;

        if(this.tokenType === this.cargo) {
            s = s + 'Symbol: ' + this.tokenType;
        } else if(this.tokenType === 'Whitespace') {
            s = s + 'Whitespace: "' + this.tokenType + '"';
        } else {
            s = s + this.tokenType + ': ' + this.cargo;
        }

        return s;
    };

    /**
     * Determines if the cargo is a whitespace character.
     * @function
     * @returns {Boolean} _ True if whitespace, false otherwise.
     */
    Token.prototype.isWhitespace = function() {
        return (
            this.cargo === '  SPACE  ' ||
            this.cargo === '  TAB  ' ||
            this.cargo === '  LF  ' ||
            this.cargo === '  CR  '
        );
    };

    /**
     * Determines if the cargo is a numerical digit.
     * @returns {Boolean} _ True if digit, false otherwise.
     */
    Token.prototype.isDigit = function() {
        return this.cargo >= '0' && this.cargo <= '9';
    };

    /**
     * Determines if the cargo is a letter in the English alphabet.
     * @returns {Boolean} _ True if letter, false otherwise.
     */
    Token.prototype.isAlpha = function() {
        return (
            (this.cargo >= 'a' && this.cargo <= 'z') ||
            (this.cargo >= 'A' && this.cargo <= 'Z')
        );
    };

    /**
     * Determines if the cargo is an alphanumeric character (either a letter in
     * the English alphabet or a numerical digit)
     * @returns {Boolean} _ True if alphanumeric, false otherwise.
     */
    Token.prototype.isAlphanumeric = function() {
        return this.isAlpha(this.cargo) || this.isDigit(this.cargo);
    };

    /**
     * Determines if the cargo is a registered symbol
     * @return {String|Boolean} _ String representation of symbol if true, false if not a registered symbol
     */
    Token.prototype.isSymbol = function() {
        //return window.SYMBOLS.indexOf(this.cargo) !== -1 ? true : false;

        // 1. Get list of registered symbols in raw format object
        // 2. Convert list of raw symbols and convert to array of registered symbols
        // 3. Get index of cargo in registered symbols array (returns number if found or false if not)
        // 4. Get key of registered symbol in raw format object (returns string)
        // 5. Get value of registered symbol in raw format object (returns string)
        var symbols = Object.keys(window.SYMBOLS);
        return window.SYMBOLS[symbols[symbols.indexOf(this.cargo)]] || false;
    };

    return Token;
});
