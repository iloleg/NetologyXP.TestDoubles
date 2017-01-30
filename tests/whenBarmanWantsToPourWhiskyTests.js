var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var Cupboard = require('../src/cupboard');

suite('when client ask 200 grams of whisky', function () {
    var visitor = new Visitor();
    let drinkName = 'whisky';

    setup(function () {
        visitor.sober();
    });

    /*Bad tests with dependency*/
    suite('barmen has enough', function () {
        var barmen = new Barmen(new Cupboard());

        test('barman pour 200 grams of whisky', function () {
            var clientAskVolume = 200;

            var volumeInGlass = barmen.pour(drinkName, clientAskVolume, visitor);

            assert.equal(clientAskVolume, volumeInGlass);
        });
    });
});