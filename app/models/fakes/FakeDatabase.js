/**
 * Created by kevin on 10/28/14.
 */
app.registerModel(function () {
    function isEmpty(o) {
        return o === null || o === undefined;
    }

    function accessToPath(object, dotPath) {
        if (isEmpty(object)) {
            return null;
        }

        if (dotPath.indexOf('.') != -1) {
            var plot = dotPath.split('.', 1);
            return accessToPath(object[plot[0]], dotPath.substring(plot[0].length + 1));
        } else {
            return object[dotPath];
        }
    }

    function writeToPath(object, dotPath, value) {
        if (isEmpty(object)) {
            return null;
        }

        if (dotPath.indexOf('.') != -1) {
            var plot = dotPath.split('.', 1);

            if (isEmpty(object[plot[0]])) {
                object[plot[0]] = {};
            }

            writeToPath(object[plot[0]], dotPath.substring(plot[0].length + 1), value);
        } else {
            if (isEmpty(object[dotPath])) {
                object[dotPath] = {};
            }

            object[dotPath] = value;
        }
    }

    function createObject(data, template) {
        var x = {};
        for (var i = 0; i < template.length; i++) {
            var field = template[i];

            writeToPath(x, field.columnKey, accessToPath(data, field.columnKey));
        }

        return x;
    }

    function FakeDatabase($currentFields, $currentAccounts, $currentOwners) {
        this.allFields = $currentFields.slice(0);

        this.currentFields = $currentFields.slice(0).filter(function (k) {
            return k.columnKey != 'imgUrl';
        });
        this.currentAccounts = $currentAccounts.slice(0);
        this.currentOwners = $currentOwners.slice(0);
    }

    FakeDatabase.prototype.getAccountFields = function () {
        return {success: true, data: this.currentFields};
    };

    FakeDatabase.prototype.getAllAccountFields = function () {
        return {success: true, data: this.allFields};
    };

    FakeDatabase.prototype.putAccountField = function (column) {
        this.currentFields.push(column);
    };

    FakeDatabase.prototype.deleteAccountField = function (columnKey) {
        this.currentFields = this.currentFields.filter(function (k) {
            return k.columnKey != columnKey;
        });
    };

    FakeDatabase.prototype.getAccounts = function (query) {
        var data = this.currentAccounts;

        if (query.filters) {
            data = data.filter(function (element) {
                var i = 0;

                var validFilters = query.filters.filter(function (k) {
                    return k.columnKey !== undefined && k.value !== undefined;
                });
                for (; i < validFilters.length; i++) {
                    var filter = query.filters[i];
                    var key = filter.columnKey;
                    var value = filter.value;

                    var data = accessToPath(element, key);
                    if (Object.prototype.toString.call(value) === "[object Array]") {
                        var found = value.length === 0;
                        for (var j = 0; j < value.length; j++) {
                            var valueUnionVal = value[j];
                            if (data == valueUnionVal) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            return false;
                        }
                    } else if (value !== undefined) {
                        if (data.toLowerCase().indexOf(value.toLowerCase()) == -1) {
                            return false;
                        }
                    }

                }
                return true;
            });
        }

        data.sort(function (a, b) {
            var aField = accessToPath(a, query.order.field);
            var bField = accessToPath(b, query.order.field);
            var direction = query.order.direction;

            var multiplier = direction == "asc" ? 1 : -1;
            if (typeof aField == "string" && typeof bField == "string") {
                return aField.localeCompare(bField) * multiplier;
            } else {
                return (aField - bField) * multiplier;
            }
        });

        var usingQueryFields = (query.fields && query.fields.length > 0) || false;
        var finalQueryFields = usingQueryFields ? query.fields : this.currentFields;

        data = data.slice(query.order.offset, query.order.offset + query.order.limit).map(function (el) {
            return createObject(el, finalQueryFields);
        }.bind(this));

        return {success: true, data: data, merge: usingQueryFields};
    };

    FakeDatabase.prototype.getAvailableFilters = function () {
        return {
            success: true, data: [
                {columnKey: 'contactInfo.address', name: "Dirección"},
                {columnKey: 'contactInfo.phoneNumber', name: "Numero tel."},
                {columnKey: 'contactInfo.city', name: "Ciudad"}
            ]
        };
    };

    FakeDatabase.prototype.getAvailableOwners = function (nameFilter) {
        var data = this.currentOwners;
        return {
            success: true, data: data.filter(function (k) {
                return k.name.toLowerCase().indexOf(nameFilter.toLowerCase()) != -1;
            })
        };
    };

    FakeDatabase.newInstance = function ($currentFields, $currentAccounts, $currentOwners) {
        var cf = $currentFields || [
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

        var ca = $currentAccounts || [
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
                        "id": 0,
                        "name": "Carlos Zamorano"
                    }
                }
            ];

        var co = $currentOwners || [
                {id: 2, name: "Andrea Perazzi"},
                {id: 1, name: "Antonio Sanchez"},
                {id: 0, name: "Carlos Zamorano"}
            ];

        return Some(new FakeDatabase(cf, ca, co));
    };

    return {newInstance: FakeDatabase.newInstance};
});