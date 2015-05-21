/**
 * Created by kevin on 10/29/14.
 */
define([], function(){
    var Configuration = container.getService('Configuration');

    function QueryBuilder($defaultQuery) {
        this.query = $defaultQuery;
        this.query.filters = this.query.filters || [];
        this.query.fields = this.query.fields || [];
        this.query.order = this.query.order || {};
    }

    QueryBuilder.prototype.setFilter = function (name, value) {
        this.query.filters =
            this.query.filters.filter(function (k) {
                return k.columnKey !== name;
            }).concat([{columnKey: name, value: value}]);

        return this;
    };

    QueryBuilder.prototype.removeFilter = function (name) {
        this.query.filters =
            this.query.filters.filter(function (k) {
                return k.columnKey !== name;
            });

        return this;
    };

    QueryBuilder.prototype.allFields = function () {
        this.query.fields = [];
        return this;
    };

    QueryBuilder.prototype.withoutFilter = function () {
        this.query.filters = [];
        return this;
    };

    QueryBuilder.prototype.addField = function (name) {
        if (this.query.fields.indexOf(name) === -1) {
            this.query.fields.push(name);
        }

        return this;
    };

    QueryBuilder.prototype.removeField = function (name) {
        this.query.fields =
            this.query.fields.filter(function (k) {
                return k !== name;
            });

        return this;
    };

    QueryBuilder.prototype.setOrder = function (field, type) {
        this.query.order.field = field;
        this.query.order.direction = type;

        this.query.order.offset = 0;
        this.query.order.limit = this.query.order.limit || Configuration.defaultPageLimit || 2;

        return this;
    };

    QueryBuilder.prototype.setPage = function (offset, limit) {
        this.query.order.offset = offset;
        this.query.order.limit = limit || this.query.order.limit || Configuration.defaultPageLimit || 2;

        return this;
    };

    QueryBuilder.prototype.nextPage = function () {
        this.query.order.offset += this.query.order.limit || Configuration.defaultPageLimit || 2;
        return this;
    };

    QueryBuilder.prototype.build = function () {
        return this.query;
    };

    QueryBuilder.newInstance = function ($defaultQuery) {
        var q = $defaultQuery || Configuration.defaultQuery;
        return new QueryBuilder(q);
    };

    return {newInstance: QueryBuilder.newInstance};
});