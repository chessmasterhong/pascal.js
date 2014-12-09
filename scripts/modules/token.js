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

    Token.prototype.isDigit = function() {
        return this.cargo >= '0' && this.cargo <= '9';
    };

    Token.prototype.isAlpha = function() {
        return (
            (this.cargo >= 'a' && this.cargo <= 'z') ||
            (this.cargo >= 'A' && this.cargo <= 'Z')
        );
    };

    Token.prototype.isAlphanumeric = function() {
        return this.isAlpha(this.cargo) || this.isDigit(this.cargo);
    };

    return Token;
});
