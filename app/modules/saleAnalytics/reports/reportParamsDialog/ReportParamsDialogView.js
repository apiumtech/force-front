define([
	'shared/BaseView',
	'modules/saleAnalytics/reports/reportParamsDialog/ReportParamsDialogPresenter',
    'shared/services/TranslatorService'
], function (BaseView, PreviewDialogPresenter, TranslatorService) {
	'use strict';

	function PreviewDialogView($scope, $modalInstance, presenter) {
		presenter = presenter || new PreviewDialogPresenter();
		BaseView.call(this, $scope, null, presenter);
		this.$modalInstance = $modalInstance;
        this.translator = TranslatorService.newInstance();
		this.configureEvents();
	}

	PreviewDialogView.inherits(BaseView, {
		report: {
			get: function () {
				return this.$scope.report;
			},
			set: function (value) {
				this.$scope.report = value;
			}
		}
	});

	PreviewDialogView.prototype.configureEvents = function () {
		var self = this;

		self.fn.close = function () {
			self.$modalInstance.dismiss();
		};

		self.fn.submit = function(){
            var matchingParams = {
                "[FECHADE]": "[FECHADE]",
                "[FECHAA]": "[FECHAA]",
                "[IDENVIRONMENT]": "idEntorno",
                "[IDSUCURSAL]": "idEntorno",
                "[IDEXPEDIENTE]": "idExpediente",
                "[IDUSUARIO]": "IdUsuario",
                "[IDEMPRESA]": "idEmpresa"
            };

            var paramList = [];
            for(var key in self.report.params){
                var value = self.report.params[key];
                if(key in matchingParams) {
                    key = matchingParams[key];
                }
                paramList.push({Key:key, Value:value});
            }

			//var paramList = Object.keys(self.report.params).map(function(key){
             //   var value = self.report.params[key];
             //   if(key in matchingParams) {
             //       key = matchingParams[key];
             //   }
			//	return {
			//		key: key,
			//		value: value
			//	};
			//});

			self.report.params = paramList;

			self.$modalInstance.close(self.report);
		};

        self.fn.getReportListOfValues = function(paramConfig){
            self.event.getReportListOfValues(paramConfig.List).then(function(listOfValues){
                /*listOfValues.forEach(function(item){
                    item.Key = self.translator.translate(item.Key);
                });*/
                paramConfig.Value = listOfValues;
            });
        };
        self.fn.getEnvironmentsLoV = function(paramConfig){
            self.event.getReportListOfValues('tblSucursales').then(function(listOfValues){
                paramConfig.Value = listOfValues;
                self.$scope.$apply();
            });
        };
	};

	PreviewDialogView.prototype.validateParameterInput = function(){

	};

	PreviewDialogView.newInstance = function ($scope, $modalInstance, $viewRepaintAspect, $logErrorAspect) {
		var previewDialogView = new PreviewDialogView($scope, $modalInstance);
		return previewDialogView._injectAspects($viewRepaintAspect, $logErrorAspect);
	};

	return PreviewDialogView;
});