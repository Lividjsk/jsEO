/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jsEOMOIndividual = new Class({
    Extends: jsEOMOIndividual,
    matrixObjectives: [],
    crowding: 0,
    np: 0,
    sp: [],
    rank: -1,
    initialize: function (_chromosome) {
        this.parent(_chromosome); // calls initalize method of jsEOIndividual class
        jsEOUtils.debug("Initializating a jsEOMOIndividual ");
		this.np = 0;
		this.sp = [];
		this.rank = -1;

    },
    randomize: function (_length, _min, _max) {

        if (typeof _length == 'undefined') {
            _length = 10;
        }
        if (typeof _min == 'undefined') {
            _min = 0;
        }
        if (typeof _max == 'undefined') {
            _max = 1;
        }

        //console.log("Matriz", this.matrixObjectives);
        var used = [];
        var chr = [];

        for (var i = 0; i < _length; ++i) {
            used.push(false);
        }

        var index = 0;
        for (var j = 0; j < _length; ++j) {
            if (j != 0) {
                do {
                    index = jsEOUtils.intRandom(1, _length - 1);
                } while (used[index]);
            }
            chr.push(index);
            used[index] = true;
        }

        this.setChromosome(chr);
        return this;
    },
	evaluate: function(_fitFn) {
        var objectives = _fitFn(this.chromosome);

        for (var i = 0; i < objectives.length; ++i) {
            this.matrixObjectives.push(objectives[i]);
        }
        return this;
    }
});
