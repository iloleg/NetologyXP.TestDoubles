"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var CupboardStub = require('../tests/fakes/cupboard-stub');
var CalendarStub = require('../tests/fakes/calendar-stub');
var SmsServiceMock = require('../tests/fakes/sms-service-mock');

suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};
    let calendar = {};
    let smsService = {};

    setup(function () {
        visitor = new Visitor();
        visitor.sober();

        calendar = new CalendarStub();
        smsService = new SmsServiceMock();
    });

    suite('cupboard is full', function () {
        let alwaysFullCupboard = {};

        setup(function () {
            alwaysFullCupboard = new CupboardStub();
            alwaysFullCupboard.empty = false;
        });

        test('barman pours 200 milliliters of whisky in my glass', function () {
            barmen = new Barmen(alwaysFullCupboard, smsService);

            var volumeInGlass = barmen.pour("whisky", 200, visitor, new CalendarStub());

            assert.equal(200, volumeInGlass);
        });

        test('barmen pours x2 volume on a Thursday', function () {
            calendar.today = "Thursday";
            barmen = new Barmen(alwaysFullCupboard, smsService);

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
            barmen = new Barmen(emptyCupboard, smsService);

            var action = () => {
                barmen.pour("whisky", 200, visitor, calendar)
            };

            assert.throws(action, /Sorry. Not enough whisky/);
        });

        test('sms to buy drink is sent to boss', function () {
            smsService = new SmsServiceMock();
            barmen = new Barmen(emptyCupboard, smsService);

            runWithTryCatch(() => {
                barmen.pour("vodka", 100, visitor, calendar)
            });

            assert.equal(smsService.lastSentSms, "Hello. We have run out of vodka. Please buy several bottles.");
        });

        function runWithTryCatch(action) {
            try {
                action();
            } catch (exception) {

            }
        }
    });

});
