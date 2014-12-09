define('modules/lexer', [
    'modules/scanner',
    'modules/token'
], function(Scanner, Token) {
    'use strict';

    function Lexer(srcText) {
        this.scanner = new Scanner(srcText);
    }

    Lexer.prototype = {};

    Lexer.prototype.get = function() {
        var character = this.scanner.get();

        this.token = new Token(character);

        while(this.token.isWhitespace(character)) {
            if(character === window.TOKENS.EOF) {
                return new Token(null);
            }

            character = this.scanner.get();
            this.token = new Token(character);
        }

        return character;
    };

    return Lexer;
});
