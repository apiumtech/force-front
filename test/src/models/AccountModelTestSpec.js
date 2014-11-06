/**
 * Created by kevin on 10/24/14.
 */

describe("AccountModel", function () {
    var AccountModel = app.getModel('models/AccountModel');
    var QueryBuilder = app.getService('services/QueryBuilder');
    var FakeDatabase = app.getModel('models/fakes/FakeDatabase');

    [
        'setNameFilter', 'setFilters', 'toggleField',
        'addField', 'removeField', 'nextPage', 'sortByField'

    ].forEach(function () {
        it("should return the result of gateway.getAccounts() mapped", function () {
            var gateway = function () { return { data: 1 }};
        })
    });
});

