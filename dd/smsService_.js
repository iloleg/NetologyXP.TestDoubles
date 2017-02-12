'use strict';
class SmsService {
    constructor() {
        this._lastMessage = false;
    }
    get lastMessage() {
        return this._lastMessage;
    }
    send (message) {
        this._lastMessage = message;
    }
}

module.exports = SmsService;