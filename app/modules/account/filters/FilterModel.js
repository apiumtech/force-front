/**
 * Created by kevin on 11/5/14.
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var FakeDatabase = container.getService('models/fakes/FakeDatabase');
    var Q = container.getFunction('q');

    function FilterModel($fakeDatabase) {
        this.fakeDatabase = $fakeDatabase;
        this.filters = [];
        this.selectedOwners = [];
    }

    FilterModel.prototype.addFilter = function (filter) {
        return Q.fcall(function () {
            this.filters = this.filters.filter(function (k) {
                return k.columnKey !== filter.columnKey;
            }).concat([filter]);
            return this.filters;
        }.bind(this));
    };

    FilterModel.prototype.removeFilter = function (filter) {
        return Q.fcall(function () {
            this.filters = this.filters.filter(function (k) {
                return k.columnKey !== filter.columnKey;
            });
            return this.filters;
        }.bind(this));
    };

    FilterModel.prototype.getAvailableFilters = function (name) {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableFilters(name || "").data;
        }.bind(this));
    };

    FilterModel.prototype.getAvailableOwners = function (name) {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableOwners(name || "").data.map(function (k) {
                k.selected = this.selectedOwners.filter(function (v) {
                    return v.id === k.id;
                }).length > 0;
                return k;
            }.bind(this));
        }.bind(this));
    };

    FilterModel.prototype.toggleOwnerFilter = function (owner) {
        var objA = this.selectedOwners.filter(function (k) {
            return k.id === owner.id;
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

        var filterValue = this.selectedOwners.map(function (k) {
            return k.id;
        });
        return this.addFilter({columnKey: "responsible.id", value: filterValue});
    };

    FilterModel.newInstance = function (db) {
        var database = db || FakeDatabase.newInstance(undefined, Configuration.fakeAccountData);
        return new FilterModel(database);
    };

    return FilterModel;

});