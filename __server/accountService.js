/**
 * Created by Justin on 3/2/2015.
 */

var _ = require('underscore');
var queryBuilder = require('datatable');
var loki = require('lokijs');

var AccountService = function () {
    this.db = new loki(__dirname + '/fakeDb.json');
    var collections = this.db.listCollections();
    var self = this;
    if (!collections.length) {
        self.prepareData();
    }
};

AccountService.prototype.getFilterData = function (request) {
    var accounts = this.db.getCollection('Accounts');
    console.log(request);
    return accounts.data;
};

AccountService.prototype.getAccount = function(id){
    var accounts = this.db.getCollection('Accounts');
    return accounts.get(id);
};

AccountService.prototype.prepareData = function () {
    var accounts = this.db.addCollection('Accounts', {
        indices: 'id'
    });

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
            "modified": 1348790400,
            "responsible": {
                "id": 0,
                "name": "Carlos Zamorano"
            }
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
            "modified": 1348790410,
            "responsible": {
                "id": 2,
                "name": "Andrea Perazzi"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 0,
                "name": "Carlos Zamorano"
            }
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
            "modified": 1348790410,
            "responsible": {
                "id": 2,
                "name": "Andrea Perazzi"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
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
            "modified": 1348790400,
            "responsible": {
                "id": 1,
                "name": "Antonio Sanchez"
            }
        }
    ];

    fakeAccountData.forEach(function(account){
        accounts.insert(account);
    });

    this.db.saveDatabase();
};

var forceManager = {
    accountService: new AccountService()
};

module.exports = forceManager.accountService;