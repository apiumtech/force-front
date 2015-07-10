/**
 * Created by Justin on 3/16/2015.
 */

var _ = require('underscore');
var moment = require('moment');
var Enumerable = require('linq');

function getActivityModel(id, from, activity, activityTo, contactTo, isFollow, date, description, images) {
    return {
        id: id,
        from: from,
        activity: activity,
        activityTo: activityTo,
        contactTo: contactTo,
        isFollowed: isFollow,
        date: date,
        description: description,
        images: images
    };
}

function ActivityService() {
    this.fakeData = [
        getActivityModel(1,
            {
                id: 30,
                name: "John Smith",
                imageUrl: "assets/img/user-1.jpg"
            },
            "Call",
            {
                id: 31,
                name: "Ikea Iberica SL"
            },
            {
                id: 32,
                name: "Daisy Carlson",
                position: "CEO"
            }, false, moment().toDate(),
            'Hablo con el DGENERAL SR GALLEGO para intentar cerrar visita para JCARLOS: me dice que está fuera de SP. y que le llame el viernes 22 entre las 9 y 9.30',
            null),
        getActivityModel(2,
            {
                id: 40,
                name: "Pedro Garcia Sanchez",
                imageUrl: "assets/img/user-7.jpg"
            },
            "Email",
            {
                id: 41,
                name: "Leroy Merlin"
            },
            {
                id: 32,
                name: "Daisy Carlson",
                position: "CEO"
            }, false, moment().subtract(1, 'days').toDate(),
            'Objeto: Formació Force Manager Vedesma',
            null),
        getActivityModel(3,
            {
                id: 30,
                name: "John Smith",
                imageUrl: "assets/img/user-1.jpg"
            },
            "Checkin",
            {
                id: 31,
                name: "Ikea Iberica SL",
                address: "795 Folsom Ave, Suite 600 San Francisco, CA 94107"
            },
            null,
            false, moment().subtract(3, 'days').toDate(),
            'In hac habitasse platea dictumst. Pellentesque bibendum id sem nec faucibus. Maecenas molestie, augue vel accumsan rutrum, massa mi rutrum odio, id luctus mauris nibh ut leo.',
            [{
                id: 102,
                url: "/assets/img/gallery/gallery-4.jpg"
            }]),
        getActivityModel(4,
            {
                id: 30,
                name: "John Smith",
                imageUrl: "assets/img/user-1.jpg"
            },
            "Checkin",
            {
                id: 31,
                name: "Ikea Iberica SL",
                address: "795 Folsom Ave, Suite 600 San Francisco, CA 94107"
            },
            null, false, moment().subtract(4, 'days').toDate(),
            'In hac habitasse platea dictumst. Pellentesque bibendum id sem nec faucibus. Maecenas molestie, augue vel accumsan rutrum, massa mi rutrum odio, id luctus mauris nibh ut leo.',
            [{
                id: 104,
                url: "/assets/img/gallery/gallery-2.jpg"
            }]),
        getActivityModel(5,
            {
                id: 30,
                name: "John Smith",
                imageUrl: "assets/img/user-1.jpg"
            },
            "Email",
            {
                id: 41,
                name: "Leroy Merlin"
            },
            {
                id: 32,
                name: "Daisy Carlson",
                position: "CEO"
            }, false, moment().subtract(8, 'days').toDate(),
            'In hac habitasse platea dictumst. Pellentesque bibendum id sem nec faucibus. Maecenas molestie, augue vel accumsan rutrum, massa mi rutrum odio, id luctus mauris nibh ut leo.',
            [{
                id: 103,
                url: "/assets/img/gallery/gallery-3.jpg"
            }]),
        getActivityModel(6,
            {
                id: 30,
                name: "John Smith",
                imageUrl: "assets/img/user-1.jpg"
            },
            "Call",
            {
                id: 31,
                name: "Ikea Iberica SL"
            },
            {
                id: 32,
                name: "Daisy Carlson",
                position: "CEO"
            }, false, moment().subtract(15, 'days').toDate(),
            'In hac habitasse platea dictumst. Pellentesque bibendum id sem nec faucibus. Maecenas molestie, augue vel accumsan rutrum, massa mi rutrum odio, id luctus mauris nibh ut leo.',
            [{
                id: 108,
                url: "/assets/img/gallery/gallery-3.jpg"
            }]),
        getActivityModel(7,
            {
                id: 30,
                name: "John Smith",
                imageUrl: "assets/img/user-1.jpg"
            },
            "Checkin",
            {
                id: 31,
                name: "Ikea Iberica SL",
                address: "795 Folsom Ave, Suite 600 San Francisco, CA 94107"
            },
            null,
            false, moment().subtract(35, 'days').toDate(),
            'In hac habitasse platea dictumst. Pellentesque bibendum id sem nec faucibus. Maecenas molestie, augue vel accumsan rutrum, massa mi rutrum odio, id luctus mauris nibh ut leo.',
            [{
                id: 113,
                url: "/assets/img/gallery/gallery-10.jpg"
            }])
    ];
}

ActivityService.prototype.getAccountActivities = function (accountId, pageIndex, pageSize) {
    var data = Enumerable.from(this.fakeData).skip(pageSize * pageIndex).take(pageSize);
    return data.toArray();
};

ActivityService.prototype.toggleFollow = function (activityId) {
    var activity = _.find(this.fakeData, function (record) {
        return record.id == activityId;
    });

    if (!activity) throw new Error("CannotFindActivity");

    activity.isFollowed = !activity.isFollowed;
    return activity;
};

var instance = new ActivityService();

module.exports = instance;