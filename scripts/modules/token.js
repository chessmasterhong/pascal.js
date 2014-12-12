/**
 * @module modules/token
 */
define('modules/token', [
    'modules/character'
], function() {
    'use strict';

    var KEYWORDS = [
        'and', 'array', 'begin', 'case', 'const', 'div', 'do', 'downto', 'else',
        'end', 'file', 'for', 'function', 'goto', 'if', 'in', 'label', 'mod',
        'nil', 'not', 'of', 'packed', 'procedure', 'program', 'record',
        'repeat', 'set', 'then', 'to', 'type', 'until', 'var', 'while', 'with'
    ];

    var SYMBOLS = [
        '+', '-', '*', '/',              // Arithmetic Operators
        '=', '<>', '<', '>', '<=', '>=', // Relational Operators
        '{', '}', '(*', '*)',            // Comments
        '[', ']',                        // Arrays
        '(', ')',                        // Groups
        '\'', '"',                       // String Literals
        ':=',                            // Assignments
        '^',                             // Pointers
        ',', ':',  ';',                  // Separators
        '.'
    ];

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

        if(this.cargo === window.TOKENS.EOF) {
            this.tokenType = 'End of file';
        } else if(this.isWhitespace()) {
            this.tokenType = 'Whitespace';
        } else if(this.isAlphanumeric()) {
            this.tokenType = 'Alphanumeric';
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
            //this.cargo === ' ' ||  // Space
            //this.cargo === '\t' || // Tab
            //this.cargo === '\n' || // Line Feed
            //this.cargo === '\r'    // Carriage Return
            this.cargo === window.TOKENS.SPACE ||
            this.cargo === window.TOKENS.TAB ||
            this.cargo === window.TOKENS.LF ||
            this.cargo === window.TOKENS.CR
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

    return Token;
});
