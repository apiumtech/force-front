/**
 * Created by Justin on 3/2/2015.
 */

var _ = require('underscore');
var QueryBuilder = require('datatable');
var loki = require('lokijs');
var utils = require('../utils');
var Enumerable = require('linq');

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

function AccountService() {
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
    var filteredData = results.data();

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

        filteredData = sortByMultiple(filteredData, sortCondition);
    }
    var start = request.body.start,
        length = request.body.length;

    var finalResult = Enumerable.from(filteredData).skip(start).take(length).toArray();

    return {
        recordsTotal: accounts.data.length,
        recordsFiltered: filteredData.length,
        data: finalResult
    };
};

AccountService.prototype.getAccount = function (id) {
    var db = this.getDb();
    var accounts = db.getCollection('Accounts');
    var data = accounts.get(id);

    if (data == null)
        throw new Error("AccountNotFound");

    data.accountType = {
        id: 1,
        name: "Lead"
    };

    data.relatedContacts = [{
        id: 1001,
        name: "Related contact 1"
    }, {
        id: 1002,
        name: "Related contact 2"
    }, {
        id: 1003,
        name: "Related contact 3"
    }];

    data.extraFields = [{
        fieldName: "extra field text",
        fieldType: "text",
        fieldValue: "extraFieldValue in text"
    }, {
        fieldName: "extra field true",
        fieldType: "boolean",
        fieldValue: true
    }, {
        fieldName: "extra field false",
        fieldType: "boolean",
        fieldValue: false
    }];

    data.id = data.$loki;

    return data;
};

AccountService.prototype.getSummaryAccount = function (id) {
    return {
        id: id,
        name: "Carlos Lopez (Fake)",
        position: "Sale Manager (Fake)",
        mobile: "+1 234 567 890",
        phoneNumber: "+1 98 765 43 21",
        email: "carlos@support.com",
        skype: "carlos.lopez",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit..."
    };
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

AccountService.prototype.createAccount = function (body) {
    var db = this.getDb();
    var accounts = db.getCollection('Accounts');
    body.modified = new Date();
    var account = accounts.insert(body);
    db.save();
    return account;
};

AccountService.prototype.updateAccount = function (id, body) {
    var db = this.getDb();
    var accounts = db.getCollection('Accounts');
    var account = accounts.get(id);
    if (account == null) throw new Error("Requested User cannot be found");

    Object.keys(account).forEach(function (key) {
        if (key == '$loki' || key == "id") return;

        account[key] = body[key];
    });

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

AccountService.prototype.getDb = function () {
    var self = this;

    if (!this.db) {
        var db = new loki(__dirname + '/../fakeDb.json', {
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
            "name": "Tim Cook",
            avatar: "user-11.jpg"
        },
        owner2 = {
            "id": 2,
            "name": "Bill Gates",
            avatar: "user-13.jpg"
        },
        owner3 = {
            "id": 3,
            "name": "Marissa Mayer",
            avatar: "user-14.jpg"
        },
        owner4 = {
            "id": 4,
            "name": "Ginni Rometty",
            avatar: "user-15.jpg"
        };

    var fakeAccountData = [
        {
            "following": false,
            "name": "Apple",
            "subtitle": "Subtitle - small description",
            "imgUrl": "/assets/img/logos/ikea.jpg",
            "class": "B",
            "emails": [{id: 1, email: "support@apple.com"}, {id: 2, email: "support2@apple.com"}],
            "description": "Some test text Lorem pisum Proporcionamos herramientas de marketing relacional: CRM, Fidelización, Buzoneo, Logística, Contact Center",
            "contactInfo": {
                "validAddress": true,
                "country": "USA",
                "city": "California",
                "address": "1 Infinite Loop Cupertino, CA 95014",
                "phoneNumber": "(000) 000 001",
                "mobile": "090909090",
                "latitude": 37.331793,
                "longitude": -122.029584,
                "website": "www.apple.com"
            },
            "modified": new Date(2014, 04, 25),
            "responsible": owner1
        },
        {
            "following": false,
            "name": "Microsoft",
            "subtitle": "Subtitle - small description",
            "imgUrl": "/assets/img/logos/ikea.jpg",
            "class": "A",
            "emails": [{id: 3, email: "support@microsoft.com"}, {id: 4, email: "support2@microsoft.com"}],
            "description": "Some test text Lorem pisum Proporcionamos herramientas de marketing relacional: CRM, Fidelización, Buzoneo, Logística, Contact Center",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "Redmond, Washington",
                "address": "1 Microsoft Way Redmond, WA 98052",
                "phoneNumber": "+1 425-882-8080",
                "mobile": "090909090",
                "latitude": 47.6397343,
                "longitude": -122.1284005,
                "website": "www.microsoft.com"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner2
        },
        {
            "following": false,
            "name": "Yahoo",
            "subtitle": "Subtitle - small description",
            "imgUrl": "/assets/img/logos/ikea.jpg",
            "class": "A",
            "emails": [{id: 5, email: "support@yahoo.com"}, {id: 6, email: "support2@yahoo.com"}],
            "description": "Some test text Lorem pisum Proporcionamos herramientas de marketing relacional: CRM, Fidelización, Buzoneo, Logística, Contact Center",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "229 W 43rd St NY 10036‎",
                "phoneNumber": "(000) 000 002",
                "mobile": "090909090",
                "latitude": 40.757471,
                "longitude": -73.987732,
                "website": "www.yahoo.com"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner3
        },
        {
            "following": false,
            "name": "IBM",
            "subtitle": "Subtitle - small description",
            "imgUrl": "/assets/img/logos/ikea.jpg",
            "class": "A",
            "emails": [{id: 7, email: "support@ibm.com"}, {id: 8, email: "support2@ibm.com"}],
            "description": "Some test text Lorem pisum Proporcionamos herramientas de marketing relacional: CRM, Fidelización, Buzoneo, Logística, Contact Center",
            "contactInfo": {
                "validAddress": false,
                "country": "USA",
                "city": "New York",
                "address": "1 New Orchard Road, Armonk",
                "phoneNumber": "914-499-1900",
                "mobile": "090909090",
                "latitude": 41.108304,
                "longitude": -73.720468,
                "website": "www.IBM.com"
            },
            "modified": new Date(2014, 4, 25),
            "responsible": owner4
        }
    ];

    for (var i = 0; i < 50; i++) {
        fakeAccountData.push({
            "following": false,
            "name": "fake-account-" + i,
            "subtitle": "Subtitle - small description",
            "imgUrl": "/assets/img/logos/ikea.jpg",
            "class": ["A", "B", "C"][Math.floor(i % 3)],
            "emails": [{id: (i * 1) + 9, email: "support@google.com"}, {
                id: (i * 1) + 10,
                email: "support2@google.com"
            }],
            "description": "Some test text Lorem pisum Proporcionamos herramientas de marketing relacional: CRM, Fidelización, Buzoneo, Logística, Contact Center",
            "contactInfo": {
                "validAddress": true,
                "country": "fake-country",
                "city": "fake-city",
                "address": i + " fake address",
                "phoneNumber": i + "(000) 000 001",
                "mobile": "090909090",
                "latitude": 37.331793 + (utils.generateRandom(10, i * 20) / 100),
                "longitude": -122.029584 + (utils.generateRandom(10, i * 20) / 100),
                "website": "www.google.com"
            },
            "modified": new Date(2014, 04, 25),
            "responsible": [owner1, owner2, owner3, owner4][Math.floor(i % 4)]
        });
    }

    fakeAccountData.forEach(function (account) {
        accounts.insert(account);
    });

    db.saveDatabase();
};

//endregion preparing data sets
var accountService = new AccountService();
exports = module.exports = accountService;