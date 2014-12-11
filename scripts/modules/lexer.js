/**
 * @module modules/lexer
 */
define('modules/lexer', [
    'modules/scanner',
    'modules/token'
], function(Scanner, Token) {
    'use strict';

    /**
     * The Lexer class groups the characters in the source file into tokens.
     *     Each time the lexer is called, it calls the Scanner (perhaps multiple
     *     times) to get as many characters necessary to assemble a token and
     *     returns the token along with the token's type.
     * @class Lexer
     * @param {String} srcText The entire source text to be scanned.
     */
    function Lexer(srcText) {
        this.scanner = new Scanner(srcText);
    }

    Lexer.prototype = {};

    /**
     * Gets the next token in srcText.
     * @function
     * @returns {TokenObject} _ The information about this token.
     */
    Lexer.prototype.get = function() {
        var character, token;

        do {
            if(character === window.TOKENS.EOF) {
                return new Token(null);
            }

            character = this.scanner.get();
            token = new Token(character);
        } while(token.isWhitespace(character));

        return token;
    };

    return Lexer;
});
