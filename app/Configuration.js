/**
 * Created by kevin on 10/29/14.
 */
app.registerService(function (container) {
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

    function putIdForFakeAccountData() {
        var data = [];

        var i = 0;
        for (var fakeAccount in fakeAccountData) {
            i++;
            data.push(angular.extend({"id": i}, fakeAccountData[fakeAccount]));
        }

        return data;
    }

    var api = {
        dataTableRequest: '/api/accounts/dataTables',
        getAvailableOwners: '/api/accounts/availableOwners',
        getAvailableEnvironments: '/api/accounts/environments',
        getAvailableViews: '/api/accounts/views',
        getAvailableAccountTypes: '/api/accounts/accountTypes',
        toggleFollow: '/api/accounts/toggleFollow'
    };

    return {
        defaultQuery: {order: {field: 'name', direction: 'asc', offset: 0, limit: 10}},
        defaultPageLimit: 15,
        fakeAccountData: putIdForFakeAccountData(),
        api: api
    };
});