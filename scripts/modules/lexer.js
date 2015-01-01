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
        var character, token, c1, c2, s1, s2, i1, n1;

        // Ignore whitespaces
        do {
            // If character is end of file, return a null cargo Token
            if(character === 'EOF') {
                return new Token(null);
            }

            // Get next character and construct token
            character = this.scanner.get();
            token = new Token(character);

            // =================
            //  COMMENT BUILDER
            // =================
            // Build registered symbol (c1) from current character, if possible
            c1 = this.buildSymbol(character);

            // If c1 exists (a registered symbol exists)
            if(c1) {
                // Store c1 in current token
                token.cargo = c1.cargo;

                // For each type of comment symbol
                for(var i = 0; i < window.COMMENTS.length; i++) {
                    // If c1 is a "begin comment" symbol
                    if(c1.cargo === window.COMMENTS[i][0]) {
                        // Get next character after c1
                        character = this.scanner.get();

                        // Build registered symbol (c2) from current character, if possible
                        c2 = this.buildSymbol(character);

                        // While c2 is not a "end comment" symbol corresponding c1
                        while(!c2 || c2.cargo !== window.COMMENTS[i][1]) {
                            // If current character reaches end of file before c2 was found (invalid syntax in srcText, comment not ended properly)
                            if(character.cargo === 'EOF') {
                                // Handle error
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

                        // Set token type to comment
                        token.tokenType = 'Comment';
                    }
                }
            }

            // ================
            //  STRING BUILDER
            // ================
            // Check if s1 is in list of registered open string symbol
            s1 = window.STRINGS[window.STRINGS.indexOf(token.cargo)];

            // If s1 exists (s1 matches a registered open string symbol)
            if(s1) {
                // Get next character after s1
                s2 = this.scanner.get();

                // While s2 is not the same symbol as s1 (indicating closing of string)
                while(s2.cargo !== s1) {
                    // If s2 reaches end of file before string opened by s1 was found (invalid syntax in srcText, string not ended properly)
                    if(s2.cargo === 'EOF') {
                        // Handle error
                        console.log('Found end of file before end of string literal.');

                        // Break s2 search loop (since there are no more characters after end of file)
                        break;
                    // If s2 did not reach end of file yet
                    } else {
                        // Append s2 to string token
                        token.cargo += s2.cargo;

                        // Get next character
                        s2 = this.scanner.get();
                    }
                }

                // "End string" symbol found (matching open string search loop exited)
                token.cargo += s2.cargo;

                // Set token type to string
                token.tokenType = 'String';
            }

            // ====================
            //  IDENTIFIER BUILDER
            // ====================
            if(token.isAlpha()) {
                //token.tokenType = 'Identifier';

                // Get next character after i1 and create a token from it
                character = this.scanner.get();
                i1 = new Token(character);

                // While i1 is an English alphabet character and not end-of-file character
                while(i1.isAlpha() && i1.cargo !== 'EOF') {
                    // Append i1 to identifier token
                    token.cargo += i1.cargo;

                    // Temporarily look ahead to the next character and create a token from it
                    character = this.scanner.lookahead();
                    i1 = new Token(character);

                    // If the lookahead character is also an English alphabet character (indicating valid identifier syntax)
                    if(i1.isAlpha()) {
                        // Advance scanner by one character (the lookahead character)
                        character = this.scanner.get();
                    }
                }

                // Cannot find any more valid characters to add to the identifier (identifier build loop exited)
                // If the built identifier matches a registered identifier
                if(window.KEYWORDS.indexOf(token.cargo) >= 0) {
                    // Update token type to be consistent with other token types
                    token.tokenType = 'TK_' + token.cargo.toUpperCase();
                }
            }

            // ================
            //  NUMBER BUILDER
            // ================
            else if(token.isNumeric()) {
                token.tokenType = 'INTEGER';

                character = this.scanner.get();
                n1 = new Token(character);

                while((n1.isNumeric() || n1.cargo === '.') && n1.cargo !== 'EOF') {
                    if(n1.cargo === '.') {
                        if(token.tokenType === 'INTEGER') {
                            token.tokenType = 'REAL';
                        } else {
                            console.log('Too many decimal points in number.');
                            break;
                        }
                    }

                    token.cargo += n1.cargo;

                    character = this.scanner.lookahead();
                    n1 = new Token(character);

                    if(n1.isNumeric() || n1.cargo === '.') {
                        character = this.scanner.get();
                    }
                }

                token.tokenType = 'TK_' + token.tokenType;
            }
        } while(
            token.isWhitespace(character) ||
            (window.OPTIONS.SCAN_COMMENTS === false && (c1 && (c1.cargo === window.COMMENTS[0][0] || c1.cargo === window.COMMENTS[1][0])))
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
