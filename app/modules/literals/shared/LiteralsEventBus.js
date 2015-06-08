define([
    'shared/services/EventBase'
], function(EventBase) {
	'use strict';

	function LiteralsEventBus() {
        EventBase.call(this);
	}

    LiteralsEventBus.inherits(EventBase);


    // ----------------------------------------------
    //
    //  Columns Request
    //
    // ----------------------------------------------

    LiteralsEventBus.prototype.onColumnsRequest = function (callback) {};
    LiteralsEventBus.prototype.fireColumnsRequest = function () {};
    LiteralsEventBus.prototype.unsubscribeColumnsRequest = function () {};

	LiteralsEventBus.prototype.onColumnsRequestSuccess = function (callback) {};
    LiteralsEventBus.prototype.fireColumnsRequestSuccess = function () {};
    LiteralsEventBus.prototype.unsubscribeColumnsRequestSuccess = function () {};

    LiteralsEventBus.prototype.onColumnsRequestError = function (callback) {};
    LiteralsEventBus.prototype.fireColumnsRequestError = function () {};
    LiteralsEventBus.prototype.unsubscribeColumnsRequestError = function () {};

    // ----------------------------------------------
    //
    //  Literals Request
    //
    // ----------------------------------------------

    LiteralsEventBus.prototype.onLiteralsRequest = function (callback) {};
    LiteralsEventBus.prototype.fireLiteralsRequest = function () {};
    LiteralsEventBus.prototype.unsubscribeLiteralsRequest = function () {};

    LiteralsEventBus.prototype.onLiteralsRequestSuccess = function (callback) {};
    LiteralsEventBus.prototype.fireLiteralsRequestSuccess = function () {};
    LiteralsEventBus.prototype.unsubscribeLiteralsRequestSuccess = function () {};

    LiteralsEventBus.prototype.onLiteralsRequestError = function (callback) {};
    LiteralsEventBus.prototype.fireLiteralsRequestError = function () {};
    LiteralsEventBus.prototype.unsubscribeLiteralsRequestError = function () {};

    // ----------------------------------------------
    //
    //  Literals Search
    //
    // ----------------------------------------------

    LiteralsEventBus.prototype.onLiteralsSearch = function (callback) {};
    LiteralsEventBus.prototype.fireLiteralsSearch = function (searchTerms) {};
    LiteralsEventBus.prototype.unsubscribeLiteralsSearch = function () {};

    // ----------------------------------------------
    //
    //  Literals Delete
    //
    // ----------------------------------------------

    LiteralsEventBus.prototype.onLiteralsDeleteRequest = function (callback) {};
    LiteralsEventBus.prototype.fireLiteralsDeleteRequest = function (searchTerms) {};
    LiteralsEventBus.prototype.unsubscribeLiteralsDeleteRequest = function () {};


    LiteralsEventBus.getInstance = function () {
        return LiteralsEventBus.__instance || (LiteralsEventBus.__instance = new LiteralsEventBus());
	};

	return LiteralsEventBus;
});