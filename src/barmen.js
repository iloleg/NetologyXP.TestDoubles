'use strict';

class Barmen {
    constructor(cupboard , smsService) {
        this._cupboard = cupboard;
        this._smsService = smsService;
    }

    pour(drinkName, volume, visitor) {
        if (!this._cupboard.hasDrink(drinkName, volume)) {
            this._smsService.send('Cupboard is locked and I have no key');
            throw new Error('Sorry. Not enough ' + drinkName);
        }


        visitor.check = drinkName + ' - ' + volume;
        return this._cupboard.getDrink(drinkName, volume);
    }
}

module.exports = Barmen;

