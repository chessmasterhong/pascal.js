define([
    'modules/character'
], function(Character) {
    'use strict';

    function Scanner(srcText) {
        this.srcText   = srcText;
        this.finalIndex = this.srcText.length - 1;
        this.srcIndex  = -1;
        this.lineIndex = 0;
        this.colIndex  = -1;
    }

    Scanner.prototype = {};

    Scanner.prototype.get = function() {
        this.srcIndex++;

        if(this.srcIndex > 0) {
            if(this.srcText[this.srcIndex - 1] === '\n') {
                this.lineIndex++;
                this.colIndex = -1;
            }
        }

        this.colIndex++;

        var char;
        if(this.srcIndex > this.finalIndex) {
            char = new Character('    EOF' , this.lineIndex, this.colIndex, this.srcIndex, this.srcText).convertToString();
        } else {
            var c = this.srcText[this.srcIndex];
            char = new Character(c, this.lineIndex, this.colIndex, this.srcIndex, this.srcText).convertToString();
        }

        return char;
    };

    return Scanner;
});
