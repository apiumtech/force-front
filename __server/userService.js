/**
 * Created by justin on 2/5/15.
 */

var _ = require("underscore");

var userService = {};

var userList = [
    {
        id: 1,
        name: "Carlos Gomez",
        environment: "es",
        photo: "https://..."
    },
    {
        id: 2,
        name: "Pedro Lorem Ipsum",
        environment: "uk",
        photo: "https://..."
    },
    {
        id: 3,
        name: "Carlos Gomez",
        environment: "uk",
        photo: "https://..."
    },
    {
        id: 4,
        name: "Pedro Lorem Ipsum",
        environment: "uk",
        photo: "https://..."
    },
    {
        id: 5,
        name: "Carlos Gomez",
        environment: "es",
        photo: "https://..."
    }
    ,
    {
        id: 6,
        name: "Pedro Lorem Ipsum",
        environment: "es",
        photo: "https://..."
    },
    {
        id: 7,
        name: "Carlos Gomez",
        environment: "uk",
        photo: "https://..."
    },
    {
        id: 8,
        name: "Carlos Gomez",
        environment: "es",
        photo: "https://..."
    }
    ,
    {
        id: 9,
        name: "Pedro Lorem Ipsum",
        environment: "es",
        photo: "https://..."
    },
    {
        id: 10,
        name: "Carlos Gomez",
        environment: "uk",
        photo: "https://..."
    },
    {
        id: 11,
        name: "Carlos Gomez",
        environment: "es",
        photo: "https://..."
    },
    {
        id: 12,
        name: "Carlos Gomez",
        environment: "uk",
        photo: "https://..."
    },
    {
        id: 13,
        name: "Carlos Gomez",
        environment: "uk",
        photo: "https://..."
    },
    {
        id: 14,
        name: "Carlos Gomez",
        environment: "es",
        photo: "https://..."
    }

];

userService.getUser = function (id) {
    var user = _.first(_.filter(userList, function (user) {
        return user.id === id;
    }));

    return user;
};

userService.getUsers = function () {
    var list = [];
    userList.forEach(function(user){
        list.push({
            id: user.id,
            name: user.name,
            environment: user.environment
        })
    });
    return list;
};

module.exports = _.extend(module.exports, userService);
