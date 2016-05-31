define([
    'app'
], function (app) {

    app.config(['$validationProvider', function ($validationProvider) {

        // configure validation system here
        var expression = {
            nilOrNumber: function (value) {
                if (!value)
                    return true;

                return value.match(/^\d+$/);
            },
            nilOrUrl: function (value) {
                if (!value)
                    return true;

                return value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
            },
            nilOrEmail: function (value) {
                if (!value)
                    return true;

                return value.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
            }
        };
        var defaultMsg = {
            required: {
                error: i18n.t('validationMsg.required')
            },
            email: {
                error: i18n.t('validationMsg.email')
            },
            nilOrEmail: {
                error: i18n.t('validationMsg.email')
            },
            number: {
                error: i18n.t('validationMsg.number')
            },
            nilOrNumber: {
                error: i18n.t('validationMsg.number')
            },
            url: {
                error: i18n.t('validationMsg.url')
            },
            nilOrUrl: {
                error: i18n.t('validationMsg.url')
            }
        };

        $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
    }]);
});
