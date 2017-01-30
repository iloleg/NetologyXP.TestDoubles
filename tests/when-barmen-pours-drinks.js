"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var Cupboard = require('../src/cupboard');

suite('When barmen pours drinks', function () {
    suite('cupboard is full', function () {
        let visitor = {};
        let barmen = {};

        setup(function () {
            visitor = new Visitor();
            visitor.sober();
        });

        test('barman pours 200 milliliters of whisky in my glass', function () {
            barmen = new Barmen(new CupboardStub());

            var volumeInGlass = barmen.pour("whisky", 200, visitor);

            assert.equal(200, volumeInGlass);
        });
    });
});

class CupboardStub {
    isOpen() {
        return true;
    };

    hasDrink(drinkName, volume) {
        return true;
    };

    getDrink(drinkName, volume) {
        return volume;
    }
}