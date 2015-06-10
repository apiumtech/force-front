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

    };

    AddCompanyDialogView.prototype.onGetCompanySuccess = function(data){
        console.log("company relation type", data);
        var self = this;
        self.companyTypes = data.companyTypes;
    };

    AddCompanyDialogView.newInstance = function ($scope, $modalInstance, $viewRepaintAspect, $logErrorAspect) {
        var previewDialogView = new AddCompanyDialogView($scope, $modalInstance);
        return previewDialogView._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return AddCompanyDialogView;
});