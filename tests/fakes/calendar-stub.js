"use strict";

class CalendarStub {
    constructor() {
        this._today = "";
    }

    today() {
        return this._today;
    }

    setToday(value) {
        this._today = value;
    }
}

module.exports = CalendarStub;