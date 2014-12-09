define('modules/token', [
    'modules/character'
], function(Character) {
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

    function Token(startChar) {
        this.cargo     = startChar.cargo;
        this.srcText   = startChar.srcText;
        this.lineIndex = startChar.lineIndex;
        this.colIndex  = startChar.colIndex;
        this.tokenType = null;
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

    Token.prototype.isWhitespace = function(char) {
        return (
            char === ' ' ||  // Space
            char === '\t' || // Tab
            char === '\n' || // Line Feed
            char === '\r'    // Carriage Return
        );
    };

    Token.prototype.isDigit = function(char) {
        return char >= '0' && char <= '9';
    };

    Token.prototype.isAlpha = function(char) {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
    };

    Token.prototype.isAlphaNumeric = function(char) {
        return this.isAlpha(char) && this.isDigit(char);
    };

    return Token;
});
