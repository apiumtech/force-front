/**
 * Created by kevin on 11/5/14.
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var FakeDatabase = container.getService('models/fakes/FakeDatabase');
    var Q = container.getFunction('q');

    function FilterModel($fakeDatabase) {
        this.fakeDatabase = $fakeDatabase;
        this.columns = [];
    }

    FilterModel.prototype.getAvailableFilters = function () {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableFilters().data;
        }.bind(this));
    };

    FilterModel.prototype.getAvailableOwners = function (name) {
        return Q.fcall(function () {
            return this.fakeDatabase.getAvailableOwners(name || "").data;
        }.bind(this));
    };

    FilterModel.prototype.toggleOwnerFilter = function (owner) {
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

        return {
            set: {
                    columnKey: "responsible.id",
                    value: this.selectedOwners.map(function (k) {
                        return k.id;
                    })
                }
        };
    };

    FilterModel.newInstance = function (db, qb) {
        var database = db || FakeDatabase.newInstance(undefined, Configuration.fakeAccountData).getOrElse(throwException("We could not create a FakeDatabase!!!"));
        return Some(new FilterModel(database));
    };

    return FilterModel;

});