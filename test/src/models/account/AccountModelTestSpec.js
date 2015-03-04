/**
 * Created by justin on 3/4/15.
 */

describe("AccountModel", function () {
    var AccountModel = app.getModel('models/account/AccountModel');

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {};
        sut = AccountModel.newInstance(ajaxService).getOrElse(throwInstantiateException(AccountModel));
    });
});

