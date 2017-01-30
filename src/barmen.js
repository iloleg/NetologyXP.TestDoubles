'use strict';

class Barmen {

    constructor(cupboard, smsService) {
        this._cupboard = cupboard;
        this._smsService = smsService;
    }

    pour(drinkName, volume, visitor, calendar) {
        if (volume < 0) {
            throw new Error('Invalid volume of whisky');
        }

        if (!this._cupboard.hasDrink(drinkName, volume)) {
            this._smsService.send("Hello. We have run out of " + drinkName + ". Please buy several bottles.");

            throw new Error('Sorry. Not enough ' + drinkName);
        }

        if (visitor.isTotallyDrunk()) {
            throw new Error('You are drunk. Come back later.');
        }

        if (calendar.today === "Thursday") {
            return 2 * this._cupboard.getDrink(drinkName, volume);
        }

        return this._cupboard.getDrink(drinkName, volume);
    }
}

module.exports = Barmen;