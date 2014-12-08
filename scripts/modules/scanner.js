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

    };

    return Scanner;
});
