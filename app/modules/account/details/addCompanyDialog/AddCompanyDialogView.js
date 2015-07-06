define([
    'shared/BaseView',
    'modules/account/details/addCompanyDialog/AddCompanyDialogPresenter'
], function (BaseView, AddCompanyDialogPresenter) {
    'use strict';

    function AddCompanyDialogView($scope, $modalInstance, presenter) {
        presenter = presenter || new AddCompanyDialogPresenter();
        BaseView.call(this, $scope, null, presenter);
        this.$modalInstance = $modalInstance;
        this.configureEvents();
    }

    AddCompanyDialogView.inherits(BaseView, {
        relatedCompany: {
            get: function () {
                return this.$scope.relatedCompany;
            },
            set: function (value) {
                this.$scope.relatedCompany = value;
            }
        },
        accountName: {
            get: function () {
                return this.$scope.accountName;
            },
            set: function (value) {
                this.$scope.accountName = value;
            }
        },
        companyTypes: {
            get: function () {
                return this.$scope.companyTypes;
            },
            set: function (value) {
                this.$scope.companyTypes = value;
            }
        },
        warningMsg: {
            get: function () {
                return this.$scope.warningMsg;
            },
            set: function (value) {
                this.$scope.warningMsg = value;
            }
        }
    });

    AddCompanyDialogView.prototype.configureEvents = function () {
        var self = this;

        self.fn.close = function () {
            self.$modalInstance.dismiss();
        };

        self.fn.submit = function () {
            self.$modalInstance.close({
                name: self.accountName,
                relatedCompany: self.relatedCompany
            });
        };

        self.fn.getCompanyTypes = function () {
            self.event.onGetCompanyTypes(self.onGetCompanySuccess.bind(self));
        };

        self.fn.validateCompany = function () {
            if (self.relatedCompany.company && self.relatedCompany.company.id) {
                return true;
            }
            else {
                self.warningMsg = "Please choose a valid company name";
                return false;
            }
        };

    };

    AddCompanyDialogView.prototype.onGetCompanySuccess = function (data) {
        var self = this;
        self.companyTypes = data;
    };

    AddCompanyDialogView.newInstance = function ($scope, $modalInstance, $viewRepaintAspect, $logErrorAspect) {
        var previewDialogView = new AddCompanyDialogView($scope, $modalInstance);
        return previewDialogView._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return AddCompanyDialogView;
});