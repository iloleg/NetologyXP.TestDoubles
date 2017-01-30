"use strict";

class CalendarStub {
    constructor() {
        this._today = "";
    }

    get today() {
        return this._today;
    }

    set today(value) {
        this._today = value;
    }
}

module.exports = CalendarStub;