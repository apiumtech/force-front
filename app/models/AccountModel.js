/**
 * Created by kevin on 10/22/14.
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var FakeDatabase = container.getService('models/fakes/FakeDatabase');
    var Q = container.getFunction('q');
    var ObjectMerger = container.getService("services/ObjectMerger").getInstance();
    var QueryBuilder = container.getService('services/QueryBuilder');

    // converts {a: 1, b: 2} / [{name: 'a', value: 1}, {name: 'b', value: 2}]
    function flatObject(acc, base) {
        var prefix = (base ? base + "." : "");

        var result = [];
        for (var i in acc) {
            if (acc.hasOwnProperty(i)) {
                var el = acc[i];
                if (typeof el == "object") {
                    result = result.concat(flatObject(el, i));
                } else {
                    result.push({name: prefix + i, value: el});
                }
            }
        }
        return result;
    }

    function sortByPosition(onColumnList) {
        return function (a, b) {
            return onColumnList.indexOf(a.name) - onColumnList.indexOf(b.name);
        };
    }

    function mergeOrSave(model, response) {
        if (response.merge) { // merge
            var result = [];
            for (var i = 0; i < response.data.length; i++) {
                var value = ObjectMerger.leftMerge(model.data[i], response.data[i]);
                result.push(value);
            }

            model.data = result;
            return result;
        } else { // save
            model.data = response.data;
        }
    }

    function inArray(array, field) {
        return removeFromArray(array, field).length != array.length;
    }

    function removeFromArray(array, field) {
        return array.filter(function (k) { return k != field; });
    }

    function AccountModel($fakeDatabase, $queryBuilder) {
        this.fakeDatabase = $fakeDatabase;
        this.queryBuilder = $queryBuilder;
        this.selectedOwners = [];
        this.sorting = {};
    }

    AccountModel.prototype.setFilter = function (column, value) {
        this.queryBuilder.setFilter(column.columnKey, value);
        this.queryBuilder.setPage(0);

        return this.getAccounts();
    };

    AccountModel.prototype.addFilter = function (column, value) {
        var cols = this.columns;
        return Q.fcall(function () {
            this.queryBuilder.setFilter(column.columnKey, value);
            return this.queryBuilder.build().filters.map(function (f) {
                return cols.filter(function (k) {
                    return k.columnKey == f.columnKey;
                })[0];
            });
        }.bind(this));
    };


    AccountModel.prototype.removeFilter = function (column) {
        this.queryBuilder.removeFilter(column.columnKey);
        this.queryBuilder.setPage(0);

        return this.getAccounts();
    };

    AccountModel.prototype.toggleField = function (column) {
        if (inArray(this.columnKeys, column.columnKey)) {
            removeFromArray(this.columnKeys, column.columnKey);
            return this.removeField(column);
        } else {
            this.columnKeys.push(column.columnKey);
            return this.addField(column);
        }
    };

    AccountModel.prototype.addField = function (column) {
        this.queryBuilder.addField(column);
        this.queryBuilder.setPage(0);

        this.columns.push(column);
        this._setColumnList(this.columns);

        return this.getAccounts();
    };

    AccountModel.prototype.removeField = function (column) {
        this.queryBuilder.removeField(column.columnKey);
        this.queryBuilder.removeFilter(column.columnKey);

        var i = this.columns.indexOf(column);
        this.columns.splice(i, 1);
        this._setColumnList(this.columns);

        this.queryBuilder.setPage(0);

        return this.getAccounts();
    };

    AccountModel.prototype.nextPage = function () {
        this.queryBuilder.nextPage();
        return this.getAccounts();
    };

    AccountModel.prototype.toggleOwnerFilter = function (owner) {
        var objA = this.selectedOwners.filter(function (k) {
            return k.id == owner.id;
        });
        if (objA.length > 0) {
            var obj = objA[0];
            obj.selected = !obj.selected;

            if (obj.selected) {
                this.selectedOwners.push(owner);
            }
        } else {
            owner.selected = true;
            this.selectedOwners.push(owner);
        }

        this.selectedOwners = this.selectedOwners.filter(function (value, index, self) {
            return self.indexOf(value) === index && value.selected;
        });

        return this.setFilter({columnKey: "responsible.id"}, this.selectedOwners.map(function (k) {
            return k.id;
        }));
    };

    AccountModel.prototype.sortByField = function (field) {
        var fieldName = field.columnKey;
        if (this.sorting.field == fieldName) {
            this.sorting.dir = this.sorting.dir == 'asc' ? 'desc' : 'asc';
        } else {
            this.sorting.field = fieldName;
            this.sorting.dir = 'asc';
        }

        var dir = this.sorting.dir;
        this.columns.forEach(function (k) {
           if (k.columnKey == field.columnKey) {
               k.sorting = dir;
           } else {
               delete k.sorting;
           }
        });

        this.queryBuilder.setOrder(this.sorting.field, this.sorting.dir);
        this.queryBuilder.setPage(0);

        return this.getAccounts();
    };

    AccountModel.prototype.getCurrentFields = function () {
        return Q.fcall(function () {
            var accFieldsList = this.fakeDatabase.getAccountFields().data;
            this._setColumnList(accFieldsList);

            return accFieldsList;
        }.bind(this));
    };

    AccountModel.prototype.getAllFields = function () {
        return Q.fcall(function () {
            return this.fakeDatabase.getAllAccountFields().data.map(function (k) {
                return { column: k, enabled: inArray(this.columnKeys, k.columnKey) };
            }.bind(this));
        }.bind(this));
    };

    AccountModel.prototype.getAccounts = function () {
        if (this.columns == null) {
            return this.getCurrentFields()
                .then(this._queryData.bind(this));
        } else {
            return Q.fcall(this._queryData.bind(this));
        }
    };

    AccountModel.prototype.getNameAutocompletion = function (name) {
        return Q.fcall(function () {
            return this.fakeDatabase.autocompleteName(name).data.filter(function (e, i, arr) {
                return arr.lastIndexOf(e) === i;
            });
        }.bind(this));
    };

    AccountModel.prototype.getAvailableFields = function () {
        var cols = this.columnKeys;
        return this.getAllFields()
            .then(function (allColumns) {
                return allColumns
                    .filter(function (k) {
                        return cols.indexOf(k.columnKey) < 0;
                    });
            });
    };

    AccountModel.prototype.getAvailableFilters = function () {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableFilters().data;
        }.bind(this));
    };

    AccountModel.prototype.getAvailableOwners = function (name) {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableOwners(name || "").data;
        }.bind(this));
    };

    AccountModel.prototype._queryData = function () {
        var query = this.queryBuilder.build();
        this.queryBuilder.allFields();

        var queryResult = this.fakeDatabase.getAccounts(query);
        mergeOrSave(this, queryResult);

        var data = this.data.map(function (k) { return flatObject(k).sort(sortByPosition(this.columnKeys)) }.bind(this));
        return {headers: this.columns, elements: data };
    };

    AccountModel.prototype._setColumnList = function (colList) {
        this.columnKeys = colList.map(function (k) {
            return k.columnKey;
        });

        this.columns = colList;
    };

    AccountModel.newInstance = function (db, qb) {
        var database = db || FakeDatabase.newInstance(undefined, Configuration.fakeAccountData).getOrElse(throwException("We could not create a FakeDatabase!!!"));
        var queryBuilder = qb || QueryBuilder.newInstance().getOrElse(throwException("Could not create QueryBuilder"));

        return Some(new AccountModel(database, queryBuilder));
    };

    return {newInstance: AccountModel.newInstance};
});
