"use strict";


//var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var Cupboard = require('../src/cupboard');
var CalendarD = require('../dd/calendar_d');
var Visitor_ = require('../dd/visitor_');
var SmsService_ = require('../dd/smsService_');
var Cupboard_ = require('../dd/cupboard_');


suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};
    let cupboard = {};
    let calendar = {};


    setup(function () {
        cupboard = new Cupboard();
        //smsService = new SmsService_();

        calendar = new CalendarD();
        visitor = new Visitor();
        visitor.sober();

    });

    suite('cupboard is full', function () {

        let fullCupboard = {};

        setup(function () {
            fullCupboard = new Cupboard_();
        });

        test('barmen pours 200 milliliters of whisky in my glass', function () {



        });

        test('barmen pours x2 volume on a Thursday', function () {

        });
        test('barmen pours x3 volume on my Birthday', function () {

            visitor.birthday = new Date(1758, 4, 3);
            calendar.today = visitor.birthday;
            let barmen = new Barmen(fullCupboard, smsService);


            let volumeInGlass = barmen.pour('whisky', 100, visitor, calendar);

            assert.equal(3 * 100, volumeInGlass);
        });

        test('I received a check', function () {
            let barmen = new Barmen(cupboard);
            let visitor = new Visitor_();

            barmen.pour('whisky', 100, visitor, calendar);

            assert.equal('whisky - 100', visitor.check);
        });

    });

    suite('cupboard is empty', function () {
        test('barmen rejects for a drink', function () {

        });

        test('sms to buy drink is sent to boss', function () {

        });
    });
    suite('Cupboard is locked', function () {
        let lockedCupboard = {};
        setup(function () {
            lockedCupboard = new CupboardStub();
            lockedCupboard.locked = true;
        });

        test('sms that cupboard is locked is sent to boss', function () {
            let barmen = new Barmen(lockedCupboard, smsService);


            try {
                barmen.pour('whisky', 100, visitor, calendar);
            } catch (e) {
            }

            assert.equal('Cupboard is locked and I have no key', smsService.lastMessage);
        });
    });


});
