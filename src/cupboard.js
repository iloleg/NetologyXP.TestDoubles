'use strict';

class Cupboard {
    isOpen() {
        return true;
    };

    hasDrink(drinkName, volume) {
        /* Предположим что здесь мы ходим в базу данных*/
        return true;
    };

    getDrink(drinkName, volume) {
        /* Предположим что здесь мы ходим в базу данных*/
        return volume;
    }
}

module.exports = Cupboard;