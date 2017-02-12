'use strict';

class Cupboard_ {
    constructor() {
        this._locked = false;
    }

    set locked(value) {
        this._locked = value;
    }

    isOpen() {
        return !this._locked;
    };

    hasDrink(drinkName, volume) {
        return true;
    };

    getDrink(drinkName, volume) {
        return volume;
    }
}

module.exports = Cupboard_;
