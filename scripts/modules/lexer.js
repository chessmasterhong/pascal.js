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
        var character, token, c1, c2, s1, s2, i1;

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
            // Build registered symbol (c1) from current character, if possible
            c1 = this.buildSymbol(character);

            // If c1 exists (a registered symbol exists)
            if(c1) {
                // For each type of comment symbol
                for(var i = 0; i < window.COMMENTS.length; i++) {
                    // If c1 is a "begin comment" symbol
                    if(c1.cargo === window.COMMENTS[i][0]) {
                        // Store c1 in current token and set to comment token
                        token.cargo = c1.cargo;
                        token.tokenType = 'Comment';

                        // Get next character after c1
                        character = this.scanner.get();

                        // Build registered symbol (c2) from current character, if possible
                        c2 = this.buildSymbol(character);

                        // While c2 is not a "end comment" symbol corresponding c1
                        while(!c2 || c2.cargo !== window.COMMENTS[i][1]) {
                            // If current character reaches end of file before c2 was found (invalid syntax in srcText, comment not ended properly)
                            if(character.cargo === 'EOF') {
                                console.log('Found end of file before end of comment.');
                                c2 = '';

                                // Break c2 search loop (since there are no more characters after end of file)
                                break;
                            }
                            // If current character did not reach end of file yet
                            else {
                                // Append current character to comment token
                                token.cargo += character.cargo;

                                // Get next character and build registered symbol (c2) from next current character, if possible
                                character = this.scanner.get();
                                c2 = this.buildSymbol(character);
                            }
                        }

                        // "End comment" symbol found (c2 search loop exited)
                        // Append "end comment" symbol to comment token
                        token.cargo += c2.cargo;
                    }
                }
            }

            // ==============
            // STRING BUILDER
            // ==============
            s1 = window.STRINGS[window.STRINGS.indexOf(token.cargo)];
            if(s1) {
                s2 = this.scanner.get();

                while(s2.cargo !== s1) {
                    if(s2.cargo === 'EOF') {
                        console.log('Found end of file before end of string literal.');
                        break;
                    } else {
                        token.cargo += s2.cargo;
                        s2 = this.scanner.get();
                    }
                }

                token.cargo += s2.cargo;
                token.tokenType = 'String';
            }

            // ==================
            // IDENTIFIER BUILDER
            // ==================
            if(token.isAlpha()) {
                token.tokenType = 'Identifier';

                character = this.scanner.get();
                i1 = new Token(character);

                while(i1.isAlpha()) {
                    if(i1.cargo === 'EOF') {
                        break;
                    } else {
                        token.cargo += i1.cargo;
                        character = this.scanner.get();
                        i1 = new Token(character);
                    }
                }

                if(window.KEYWORDS.indexOf(token.cargo) !== -1) {
                    token.tokenType = 'TK_' + token.cargo.toUpperCase();
                }
            }
        } while(
            token.isWhitespace(character) ||
            (c1 && (c1.cargo === window.COMMENTS[0][0] || c1.cargo === window.COMMENTS[1][0]))
        );

        return token;
    };

    /**
     * Builds a registered symbol from the current character, if possible.
     * @param  {String}      character The current character to attempt to build a registered symbol from
     * @return {TokenObject} _         The token of the registered symbol.
     */
    Lexer.prototype.buildSymbol = function(character) {
        var symbol, sym;

        var token = new Token(character);

        // If first character of symbol is not alphanumeric (symbols cannot be alphanumeric to begin with)
        if(!token.isAlphanumeric()) {
            // Temporary lookahead character
            var characterTemp = character.cargo + this.scanner.lookahead().cargo;

            // Search through all registered symbols
            for(var i = 0; i < window.SYMBOLS.length; i++) {
                symbol = window.SYMBOLS[i];

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
