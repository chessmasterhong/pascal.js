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
        var character, token, c1, c2;

        // Ignore whitespaces
        do {
            // If character is end of file, return a null cargo Token
            if(character === 'EOF') {
                return new Token(null);
            }

            // Get next character and construct token
            character = this.scanner.get();
            token = new Token(character);

            // ===============
            // COMMENT BUILDER
            // ===============
            c1 = this.nextSymbol(character);

            if(c1 && c1.cargo === '(*') {
                token.cargo = c1.cargo;
                token.tokenType = 'TK_COMMENT';

                character = this.scanner.get();

                c2 = this.nextSymbol(character);

                while(!c2 || c2.cargo !== '*)') {
                    if(c1.cargo === 'EOF') {
                        console.log('Found end of file before end of comment.');
                        break;
                    } else {
                        token.cargo += character.cargo;
                        character = this.scanner.get();
                        c2 = this.nextSymbol(character);
                    }
                }

                token.cargo += c2.cargo;
                character = this.scanner.get();
            }
        } while(token.isWhitespace(character) || (c1 && c1.cargo === '(*'));

        return token;
    };

    Lexer.prototype.nextSymbol = function(character) {
        var symbol, sym;

        var token = new Token(character);

        // If first character of symbol is not alphanumeric (symbols cannot be alphanumeric to begin with)
        if(!token.isAlphanumeric()) {
            // Temporary lookahead character
            var characterTemp = character.cargo + this.scanner.lookahead().cargo;

            // Search through all registered symbols
            for(var i = 0; i < Object.keys(window.SYMBOLS).length; i++) {
                symbol = Object.keys(window.SYMBOLS)[i];

                // If chrrent 2-character matches a 2-character registered symbol
                if((symbol.length === 2 && symbol === characterTemp)) {
                    // Construct new 2-character token
                    sym = new Token({
                        cargo    : characterTemp,
                        srcText  : character.srcText,
                        lineIndex: character.lineIndex,
                        colIndex : character.colIndex,
                    });

                    // Advance Scanner index by one character (but do not track it)
                    this.scanner.get();

                    // Matching symbol found, break loop (otherwise it will search through 1-character symbols)
                    break;
                }
                // If current 1-character matches a 1-character registered symbol
                else if(symbol.length === 1 && symbol === character.cargo) {
                    // Construct new 1-character token
                    sym = new Token({
                        cargo    : character.cargo,
                        srcText  : character.srcText,
                        lineIndex: character.lineIndex,
                        colIndex : character.colIndex,
                    });
                }
            }
        }

        return sym;
    };

    return Lexer;
});
