define([
    'shared/services/EventBase'
], function(EventBase) {
	'use strict';

	function SharedLiteralsChannel() {
        EventBase.call(this);
	}

    var proto = SharedLiteralsChannel.prototype = Object.create(EventBase.prototype);


    // SearchQuery
    proto.onSearchQuery = function () {};
    proto.fireSearchQuery = function () {};
    proto.unsubscribeSearchQuery = function () {};


    SharedLiteralsChannel.getInstance = function () {
		if (SharedLiteralsChannel.__instance) {
			return SharedLiteralsChannel.__instance;
		}

		return (SharedLiteralsChannel.__instance = new SharedLiteralsChannel());
	};

	return SharedLiteralsChannel;
});