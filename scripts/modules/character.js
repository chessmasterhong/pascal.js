define(function() {
    'use strict';

    function Character(c, lineIndex, colIndex, srcIndex, srcText) {
        // Initialize the scanner with default values
        this.cargo     = c;
        this.srcIndex  = srcIndex;
        this.lineIndex = lineIndex;
        this.colIndex  = colIndex;
        this.srcText   = srcText;
    }

    Character.prototype = {};

    Character.prototype.convertToString = function() {
        var cargo = this.cargo;

        if(cargo === ' ') {
            cargo = '    SPACE';
        } else if(cargo === '\n') {
            cargo = '    NEWLINE';
        } else if(cargo === '\t') {
            cargo = '    TAB';
        }
        /* NOTE: I cannot find an end-of-file equivalent character in the loaded file
        else if(cargo === 'EOF') {
            cargo = '    EOF';
        }*/

        return cargo;
    };

    return Character;
});
