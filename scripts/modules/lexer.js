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

        //test
        if(this.token.isWhitespace(character)) {
            console.log(character.cargo + ': whitespace');
        } else if(this.token.isAlphanumeric(character)) {
            console.log(character.cargo + ': alphanumeric');
        }

        while(this.token.isWhitespace(character)) {
            if(character === 'TK_EOF') {
                return new Token(null);
            }

            character = this.scanner.get();
            this.token = new Token(character);
        }

        return character;
    };

    return Lexer;
});
