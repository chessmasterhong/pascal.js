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
            if(character === 'EOF') {
                return new Token(null);
            }

            character = this.scanner.get();
            token = new Token(character);
        } while(token.isWhitespace(character));

        // Temporary lookahead character
        var characterTemp = character.cargo + this.scanner.lookahead().cargo;

        // Search through all registered symbols
        for(var i = 0; i < window.SYMBOLS.length; i++) {
            var symbol = window.SYMBOLS[i];

            // If chrrent 2-character matches a 2-character registered symbol
            if((symbol.length === 2 && symbol === characterTemp)) {
                //console.log('2-char: ' + symbol);
                token = new Token({
                    cargo    : characterTemp,
                    //srcText  : null,
                    lineIndex: character.lineIndex,
                    colIndex : character.colIndex,
                });

                // Advance Scanner index by one character (but do not track it)
                this.scanner.get();

                // Matching symbol found, break loop (otherwise it will search through 1-character symbols)
                break;
            // If current 1-character matches a 1-character registered symbol
            } else if(symbol.length === 1 && symbol === character.cargo) {
                //console.log('1-char: ' + symbol);
                token = new Token({
                    cargo    : character.cargo,
                    //srcText  : null,
                    lineIndex: character.lineIndex,
                    colIndex : character.colIndex,
                });
            }
        }

        return token;
    };

    return Lexer;
});
