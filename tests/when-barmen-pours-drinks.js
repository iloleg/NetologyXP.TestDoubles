"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var CupboardStub = require('../tests/cupboard-stub');

suite('When barmen pours drinks', function () {
    suite('cupboard is full', function () {
        let visitor = {};
        let barmen = {};
        let alwaysFullCupboard = new CupboardStub();

        setup(function () {
            visitor = new Visitor();
            visitor.sober();
        });

        test('barman pours 200 milliliters of whisky in my glass', function () {
            barmen = new Barmen(alwaysFullCupboard);

            var volumeInGlass = barmen.pour("whisky", 200, visitor);

            assert.equal(200, volumeInGlass);
        });
    });
});