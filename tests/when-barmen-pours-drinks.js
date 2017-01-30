"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var CupboardStub = require('../tests/fakes/cupboard-stub');
var CalendarStub = require('../tests/fakes/calendar-stub');

suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};
    let calendar = new CalendarStub();

    setup(function () {
        visitor = new Visitor();
        visitor.sober();
    });

    suite('cupboard is full', function () {
        let alwaysFullCupboard = {};

        setup(function () {
            alwaysFullCupboard = new CupboardStub();
            alwaysFullCupboard.empty = false;
        });

        test('barman pours 200 milliliters of whisky in my glass', function () {
            barmen = new Barmen(alwaysFullCupboard);

            var volumeInGlass = barmen.pour("whisky", 200, visitor, new CalendarStub());

            assert.equal(200, volumeInGlass);
        });

        test('barmen pours x2 volume on a Thursday', function () {
            calendar.today = "Thursday";
            barmen = new Barmen(alwaysFullCupboard);

            var volumeInGlass = barmen.pour("whisky", 100, visitor, calendar);

            assert.equal(100 * 2, volumeInGlass);
        });

    });

    suite('cupboard is empty', function () {
        let emptyCupboard = {};

        setup(function () {
            emptyCupboard = new CupboardStub();
            emptyCupboard.empty = true;
        });

        test('barmen rejects for a drink', function () {
            barmen = new Barmen(emptyCupboard);

            var action = () => {
                barmen.pour("whisky", 200, visitor, new CalendarStub())
            };

            assert.throws(action, /Sorry. Not enough whisky/);
        });
    });
});