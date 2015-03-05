/**
 * Created by Justin on 3/2/2015.
 */

var _ = require('underscore');
var QueryBuilder = require('datatable');
var loki = require('lokijs');

function sortByMultiple(sequence, keys) {
    var copy = copySequence(sequence);
    copy.sort(function (x, y) {
        var comparison = 0;
        for (var i = 0; i < keys.length; ++i) {
            comparison = compareBy(x, y, keys[i]);
            if (comparison !== 0) {
                return comparison;
            }
        }
        return comparison;
    });
    return copy;
}

function compareBy(x, y, key) {
    if (getValueFromKey(x, key.name) === getValueFromKey(y, key.name)) {
        return 0;
    }
    if (key.dir === 'desc') {
        return getValueFromKey(x, key.name) < getValueFromKey(y, key.name) ? 1 : -1;
    }
    return getValueFromKey(x, key.name) > getValueFromKey(y, key.name) ? 1 : -1;
}

function copySequence(sequence) {
    var copy = [];
    for (var i = 0; i < sequence.length; ++i) {
        copy.push(sequence[i]);
    }
    return copy;
}

function getValueFromKey(obj, keyString) {
    var keys = keyString.split('.');
    if (keys.length === 1)
        return obj[keys[0]];

    var result = obj;
    keys.forEach(function (key) {
        result = result[key];
    });

    return result;
}

var AccountService = function () {
    this.getDb();
};

AccountService.prototype.getFilterData = function (request) {
    var db = this.getDb();
    var accounts = db.getCollection('Accounts');
    var results = accounts.chain();

    var filter = request.body.customFilter;

    if (filter) {
        if (filter.owners) {
            results = results.where(function (record) {
                return filter.owners.indexOf(record.responsible.name) > -1;
            });
        }
        if (filter.searchQuery) {
            results = results.where(function (record) {
                return record.name.toLowerCase().indexOf(filter.searchQuery.toLowerCase()) > -1;
            });
        }
    }
    var resultData = results.data();

    if (request.body.order.length) {
        var sortCondition = [];

        request.body.order.forEach(function (order) {
            var $index = 0;
            request.body.columns.forEach(function (column) {
                if ($index.toString() === order.column && column.orderable) {
                    sortCondition.push({name: column.data, dir: order.dir});
                }
                $index++;
            });
        });

        resultData = sortByMultiple(resultData, sortCondition);
    }

    return resultData;
};

AccountService.prototype.getDb = function () {
    var self = this;

    if (!this.db) {
        var db = new loki(__dirname + '/fakeDb.json', {
            autoload: true,
            autoloadCallback: loadHandler
        });

        function loadHandler() {
            [
                'Accounts',
                'AccountTypes',
                'Environments',
                'Views'
            ].forEach(function (table) {
                    var dataTable = db.getCollection(table);
                    if (dataTable) {
                        console.log("collections '" + table + "' available, data count: ", dataTable.data.length);
                    } else {
                        console.log("creating table '" + table + "'");
                        self['prepare' + table + 'DataSet'](db);
                    }
                });
        }

        this.db = db;
    }

    this.db.loadDatabase();
    return this.db;
};

AccountService.prototype.getAccount = function (id) {
    var db = this.getDb();
    var accounts = db.getCollection('Accounts');
    return accounts.get(id);
};

AccountService.prototype.toggleFollow = function (id) {
    var db = this.getDb();
    var accounts = db.getCollection('Accounts');
    var account = accounts.get(id);
    if (account == null) throw new Error("Requested User cannot be found");

    account.following = !account.following;
    account.modified = new Date();
    accounts.update(account);
    db.save();
    return account;
};

AccountService.prototype.getEnvironments = function (filter) {
    var db = this.getDb();
    var environments = db.getCollection('Environments').chain();

    if (filter && filter.query) {
        environments = environments.where(function (record) {
            return record.name.toLowerCase().indexOf(filter.query.toLowerCase()) > -1;
        });
    }

    return environments.data();
};

AccountService.prototype.getViews = function (filter) {
    var db = this.getDb();
    var views = db.getCollection('Views').chain();

    if (filter && filter.query) {
        views = views.where(function (record) {
            return record.name.toLowerCase().indexOf(filter.query.toLowerCase()) > -1;
        });
    }

    return views.data();
};

AccountService.prototype.getAccountTypes = function (filter) {
    var db = this.getDb();
    var accountTypes = db.getCollection('AccountTypes').chain();

    if (filter && filter.query) {
        accountTypes = accountTypes.where(function (record) {
            return record.name.toLowerCase().indexOf(filter.query.toLowerCase()) > -1;
        });
    }

    return accountTypes.data();
};

AccountService.prototype.getAvailableOwners = function (filter) {
    var db = this.getDb();
    var accounts = db.getCollection('Accounts');

    var owners = _.uniq(_.map(accounts.data, function (record) {
        return record.responsible;
    }), function (record) {
        return record.id;
    });

    var sortedList = owners.sort(function (ownerA, ownerB) {
        return ownerA.id - ownerB.id;
    });

    var resultList = sortedList;

    if (filter && filter.query) {
        resultList = resultList.filter(function (record) {
            return record.name.toLowerCase().indexOf(filter.query.toLowerCase()) > -1;
        });
    }

    return resultList;
};

//region preparing data sets
AccountService.prototype.prepareEnvironmentsDataSet = function (db) {
    var environments = db.addCollection('Environments', {});
    [{
        id: 1,
        name: "Force UK"
    }, {
        id: 2,
        name: "Force Asia"
    }, {
        id: 3,
        name: "Force ES"
    }].forEach(function (environment) {
            environments.insert(environment);
        });
    db.save();
};

AccountService.prototype.prepareViewsDataSet = function (db) {
    var views = db.addCollection('Views', {});
    [{
        id: 1,
        name: "View 1"
    }, {
        id: 2,
        name: "View 2"
    }, {
        id: 3,
        name: "View 3"
    }].forEach(function (view) {
            views.insert(view);
        });
    db.save();
};

AccountService.prototype.prepareAccountTypesDataSet = function (db) {
    var accountTypes = db.addCollection('AccountTypes', {});
    [{
        id: 1,
        name: "AccountTypes 1"
    }, {
        id: 2,
        name: "AccountTypes 2"
    }, {
        id: 3,
        name: "AccountTypes 3"
    }].forEach(function (view) {
            accountTypes.insert(view);
        });
    db.save();
};

AccountService.prototype.prepareAccountsDataSet = function (db) {
    var accounts = db.addCollection('Accounts', {
        indices: 'id'
    });

    var owner1 = {
            "id": 1,
            "name": "Antonio Sanchez",
            avatar: "user-11.jpg"
        },
        owner2 = {
            "id": 2,
            "name": "Andrea Perazzi",
            avatar: "user-13.jpg"
        },
        owner3 = {
            "id": 0,
            "name": "Carlos Zamorano",
            avatar: "user-14.jpg"
        };

    var fakeAccountData = [
        {
            "following": false,
            "name": "Microsoft",
            "imgUrl": "/img/microsoft.png",
            "class": "C",
            "contactInfo": {
                "validAddress": true,
                "country": "USA",
                "city": "Unknown",
                "address": "Fake Avenue, 656",
                "phoneNumber": "(000) 000 000"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner3
        },
        {
            "following": false,
            "name": "Apple",
            "imgUrl": "/img/microsoft.png",
            "class": "B",
            "contactInfo": {
                "validAddress": true,
                "country": "USA",
                "city": "Palo Alto",
                "address": "Fake Avenue, 657",
                "phoneNumber": "(000) 000 001"
            },
            "modified": new Date(2014, 04, 25),
            "responsible": owner2
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "Microsoft",
            "imgUrl": "/img/microsoft.png",
            "class": "C",
            "contactInfo": {
                "validAddress": true,
                "country": "USA",
                "city": "Unknown",
                "address": "Fake Avenue, 656",
                "phoneNumber": "(000) 000 000"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner3
        },
        {
            "following": false,
            "name": "Apple",
            "imgUrl": "/img/microsoft.png",
            "class": "B",
            "contactInfo": {
                "validAddress": true,
                "country": "USA",
                "city": "Palo Alto",
                "address": "Fake Avenue, 657",
                "phoneNumber": "(000) 000 001"
            },
            "modified": new Date(2014, 04, 25),
            "responsible": owner2
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "IBM",
            "imgUrl": "/img/microsoft.png",
            "class": "A",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "Fake Avenue, 658",
                "phoneNumber": "(000) 000 002"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner1
        }
    ];

    fakeAccountData.forEach(function (account) {
        accounts.insert(account);
    });

    db.saveDatabase();
};

//endregion preparing data sets

var forceManager = {
    accountService: new AccountService()
};

module.exports = forceManager.accountService;