/**
 * Created by kevin on 10/28/14.
 */
describe("FakeDatabase", function () {
    var FakeDatabase = app.getModel('models/fakes/FakeDatabase');

    var DefaultTableList = [
        {
            columnKey: "following",
            name: "Seguir"
        },
        {
            columnKey: "name",
            name: "Nombre"
        },
        {
            columnKey: "imgUrl",
            name: ""
        },
        {
            columnKey: "class",
            name: "Class."
        },
        {
            columnKey: "contactInfo.validAddress",
            name: "/images/validAddress.png"
        },
        {
            columnKey: "contactInfo.country",
            name: "País"
        },
        {
            columnKey: "contactInfo.city",
            name: "Ciudad"
        },
        {
            columnKey: "contactInfo.address",
            name: "Dirección"
        },
        {
            columnKey: "contactInfo.phoneNumber",
            name: "Numero tel."
        },
        {
            columnKey: "modified",
            name: "Modificación"
        },
        {
            columnKey: "responsible.name",
            name: "Responsable"
        }
    ];

    it("should return a default table fields list", function () {
        var db = FakeDatabase.newInstance().getOrElse(throwException("Could not create a FakeDatabase!!"));
        var expected = {success: true, data: DefaultTableList};
        var result = db.getAccountFields();

        expect(result).toEqual(expected);
    });

    it("should register a new column in the table fields list", function () {
        var db = FakeDatabase.newInstance().getOrElse(throwException("Could not create a FakeDatabase!!"));
        var newColumn = {columnKey: "someNewColumn", name: "Some New Column"};
        var expected = {success: true, data: DefaultTableList.concat(newColumn)};

        db.putAccountField(newColumn);
        expect(db.getAccountFields()).toEqual(expected);
    });

    it("should delete an existing column in the table fields list", function () {
        var db = FakeDatabase.newInstance().getOrElse(throwException("Could not create a FakeDatabase!!"));
        var columnToRemove = "responsible.name";
        var expected = {
            success: true, data: DefaultTableList.filter(function (k) {
                return k.columnKey != columnToRemove;
            })
        };

        db.deleteAccountField(columnToRemove);
        expect(db.getAccountFields()).toEqual(expected);
    });

    it("should get a basic response of a element", function () {
        var db = FakeDatabase.newInstance().getOrElse(throwException("Could not create a FakeDatabase!!"));
        var result = db.getAccounts({order: {field: 'name', direction: 'asc', offset: 0, limit: 1}});
        var expected = {
            success: true, data: [{
                "following": true,
                "name": "Apple",
                "imgUrl": "/img/apple.png",
                "class": "C",
                "contactInfo": {
                    "validAddress": true,
                    "country": "USA",
                    "city": "Cupertino",
                    "address": "Fake Avenue, 656",
                    "phoneNumber": "(000) 000 000"
                },
                "modified": 1316908806,
                "responsible": {
                    "name": "Carlos Zamorano"
                }
            }], merge: false
        };
        expect(result).toEqual(expected);
    });

    it("should get a basic response of a element with offset", function () {
        var db = FakeDatabase.newInstance().getOrElse(throwException("Could not create a FakeDatabase!!"));
        var result = db.getAccounts({order: {field: 'name', direction: 'asc', offset: 1, limit: 1}});
        var expected = {
            success: true, data: [{
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
                    "name": "Carlos Zamorano"
                }
            }], merge: false
        };
        expect(result).toEqual(expected);
    });

    it("should get a basic response of a element with filtering", function () {
        var db = FakeDatabase.newInstance().getOrElse(throwException("Could not create a FakeDatabase!!"));
        var result = db.getAccounts({order: {field: 'name', direction: 'asc', offset: 0, limit: 200}, filters: [{ "columnKey": "name", "value": "osoft" }] });
        var expected = {
            success: true, data: [{
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
                    "name": "Carlos Zamorano"
                }
            }], merge: false
        };
        expect(result).toEqual(expected);
    });
});