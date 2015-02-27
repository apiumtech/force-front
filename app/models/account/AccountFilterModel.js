/**
 * Created by trung.dang on 02/12/2015
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var FakeDatabase = container.getService('models/fakes/FakeDatabase');
    var Q = container.getFunction('q');

    function AccountFilterModel($fakeDatabase) {
        this.fakeDatabase = $fakeDatabase;
        this.filters = [];
        this.selectedOwners = [];
        this.selectedAccountType = [];
        this.selectedFilters = [];
        this.selectedEnvironments = [];
    }

    AccountFilterModel.prototype.addFilter = function (filter) {
        return Q.fcall(function () {
            this.filters = this.filters.filter(function (k) {
                return k.columnKey !== filter.columnKey;
            }).concat([filter]);
            return this.filters;
        }.bind(this));
    };

    AccountFilterModel.prototype.removeFilter = function (filter) {
        return Q.fcall(function () {
            this.filters = this.filters.filter(function (k) {
                return k.columnKey !== filter.columnKey;
            });
            return this.filters;
        }.bind(this));
    };

    AccountFilterModel.prototype.getAvailableFilters = function (name) {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableFilters(name || "").data;
        }.bind(this));
    };

    AccountFilterModel.prototype.getAvailableViews = function (filter) {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableViews(filter || "").data.map(function (k) {
                k.selected = k.selected || false;
                return k;
            }.bind(this));
        }.bind(this));
    };

    AccountFilterModel.prototype.toggleViewsFilter = function (env_filter) {
        return Q.fcall(function () {
            this.fakeDatabase.toggleViews(env_filter);
        }.bind(this));
    };

    AccountFilterModel.prototype.getAvailableEnvironment = function (filter) {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableEnvironment(filter || "").data.map(function (k) {
                //k.selected = this.selectedAccountType.filter(function (v) {
                //    return v.id === k.id;
                //}).length > 0;
                k.selected = k.selected || false;
                return k;
            }.bind(this));
        }.bind(this));
    };

    AccountFilterModel.prototype.toggleEnvironmentFilter = function (env_filter) {
        return Q.fcall(function () {
            this.fakeDatabase.toggleEnvironment(env_filter);
        }.bind(this));
    };

    AccountFilterModel.prototype.getAvailableAccountType = function (filter) {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableAccountType(filter || "").data.map(function (k) {
                k.selected = this.selectedAccountType.filter(function (v) {
                    return v.id === k.id;
                }).length > 0;
                return k;
            }.bind(this));
        }.bind(this));
    };

    AccountFilterModel.prototype.toggleAccountTypeFilter = function (account_type_filter) {
        var objA = this.selectedAccountType.filter(function (k) {
            return k.id === account_type_filter.id;
        });

        if (objA.length > 0) { // remove account type filter
            var acctype_afterremove = this.selectedAccountType.filter(function (k) {
                return k.id != account_type_filter.id;
            });
            this.selectedAccountType = acctype_afterremove;
        } else { // add new account type filter
            account_type_filter.selected = true;
            this.selectedAccountType.push(account_type_filter);
        }

        //this.selectedOwners = this.selectedOwners.filter(function (value, index, self) {
        //    return self.indexOf(value) === index && value.selected;
        //});

        var filterValue = this.selectedAccountType.map(function (k) {
            return k.value;
        });
        return this.addFilter({columnKey: "class", value: filterValue});
    };

    AccountFilterModel.prototype.getAvailableOwners = function (name) {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableOwners(name || "").data.map(function (k) {
                k.selected = this.selectedOwners.filter(function (v) {
                    return v.id === k.id;
                }).length > 0;
                return k;
            }.bind(this));
        }.bind(this));
    };

    AccountFilterModel.prototype.toggleOwnerFilter = function (owner) {
        var existedSelectedOwner = this.selectedOwners.filter(function (k) {
            return k.id === owner.id;
        });

        if (existedSelectedOwner.length > 0) {
            owner.selected = false;
            var remain_filters = this.selectedOwners.filter(function (k) {
                return k.id != owner.id;
            });
            this.selectedOwners = remain_filters;
        } else {
            owner.selected = true;
            this.selectedOwners.push(owner);
        }


        var filterValue = this.selectedOwners.map(function (k) {
            return k.id;
        });
        return this.addFilter({columnKey: "responsible.id", value: filterValue});
    };

    AccountFilterModel.prototype.toggleFilter = function (owner) {
        var objA = this.selectedFilters.filter(function (k) {
            return k.id === owner.id;
        });

        if (objA.length > 0) { // remove account type filter
            var remain_filters = this.selectedFilters.filter(function (k) {
                return k.id != owner.id;
            });
            this.selectedFilters = remain_filters;
        } else { // add new account type filter
            owner.selected = true;
            this.selectedFilters.push(owner);
        }

        var filterValue = this.selectedFilters.map(function (k) {
            return {columnKey: k.columnKey, value: k.name};
        });
        //return this.addFilter({columnKey: "class", value: filterValue});
        return this.addFilter(filterValue);
    };

    AccountFilterModel.newInstance = function (db) {
        var database = db || FakeDatabase.newInstance(undefined, Configuration.fakeAccountData).getOrElse(throwException("We could not create a FakeDatabase!!!"));
        return Some(new AccountFilterModel(database));
    };

    return AccountFilterModel;

});