define([
    'shared/services/EventBase'
], function(EventBase) {
	'use strict';

	function LiteralsEventBus() {
        EventBase.call(this);
	}

    var proto = LiteralsEventBus.prototype = Object.create(EventBase.prototype);


    // ----------------------------------------------
    //
    //  Columns Request
    //
    // ----------------------------------------------

    proto.onColumnsRequest = function (callback) {};
    proto.fireColumnsRequest = function () {};
    proto.unsubscribeColumnsRequest = function () {};

	proto.onColumnsRequestSuccess = function (callback) {};
    proto.fireColumnsRequestSuccess = function () {};
    proto.unsubscribeColumnsRequestSuccess = function () {};

    proto.onColumnsRequestError = function (callback) {};
    proto.fireColumnsRequestError = function () {};
    proto.unsubscribeColumnsRequestError = function () {};

    // ----------------------------------------------
    //
    //  Literals Request
    //
    // ----------------------------------------------

    proto.onLiteralsRequest = function (callback) {};
    proto.fireLiteralsRequest = function () {};
    proto.unsubscribeLiteralsRequest = function () {};

    proto.onLiteralsRequestSuccess = function (callback) {};
    proto.fireLiteralsRequestSuccess = function () {};
    proto.unsubscribeLiteralsRequestSuccess = function () {};

    proto.onLiteralsRequestError = function (callback) {};
    proto.fireLiteralsRequestError = function () {};
    proto.unsubscribeLiteralsRequestError = function () {};



    LiteralsEventBus.getInstance = function () {
		if (LiteralsEventBus.__instance) {
			return LiteralsEventBus.__instance;
		}

		return (LiteralsEventBus.__instance = new LiteralsEventBus());
	};

	return LiteralsEventBus;
});