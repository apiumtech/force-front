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

		self.fn.calculateLabel = function (paramConfig) {
			var label = self.translator.translate(paramConfig.Label);
			// if the label is not a key , then try to find it within the standard report parameter keys

			/*if( ["[IDPOBLACION]",
			"[IDPAIS]",
			"[STRPOBLACION]",
			"[STRPROVINCIA]"].indexOf(paramConfig.Id) > -1 ) {
				console.log("*** "+ paramConfig.Id +"-"+ paramConfig.Label);
			}*/

			if(!label) {
				var standard_IdToLiteral = {
					"[FECHADE]": "common_datestart",
					"[FECHAA]": "common_dateend",
					"[IDENVIRONMENT]": "label_environment",
					"[IDSUCURSAL]": "label_environment",
					"[IDEXPEDIENTE]": "title_opportunity",
					"[IDUSUARIO]": "label_user",
					"[IDEMPRESA]": "label_account",
					"[IDPROVINCIA]": "label_provinceregion"
					/*,
					"[IDPOBLACION]":,
					"[IDPAIS]":,
					"[STRPOBLACION]":,
					"[STRPROVINCIA]":*/
				};
				var standardLabelLiteralKey = standard_IdToLiteral[paramConfig.Id];
				if( standardLabelLiteralKey ) {
					label = self.translator.translate(standardLabelLiteralKey);
				} else {
					label = (paramConfig.Label || paramConfig.Id);
				}
			}

			return label;
		};

		self.fn.submit = function(){
            var matchingParams = {
                "[FECHADE]": {name:"[FECHADE]", valueAdapter:function(val){return val;}},
                "[FECHAA]": {name:"[FECHAA]", valueAdapter:function(val){return val;}},
                "[IDENVIRONMENT]": {name:"idEntorno", valueAdapter:function(val){return val.Id;}},
                "[IDSUCURSAL]": {name:"idEnvironment", valueAdapter:function(val){return val.Id;}},
                "[IDEXPEDIENTE]": {name:"idExpediente", valueAdapter:function(val){return val;}},
                "[IDUSUARIO]": {name:"IdUsuario", valueAdapter:function(val){return val;}},
                "[IDEMPRESA]": {name:"idEmpresa", valueAdapter:function(val){return val;}}
            };

            var paramList = [];
            for(var key in self.report.params) {
                var value = self.report.params[key];
                if(key in matchingParams) {
                    value = matchingParams[key].valueAdapter.call(null, value);
                    key = matchingParams[key].name;
                } else if( typeof value !== 'string' ){
					value = value.Id;
				}
                paramList.push({Key:key, Value:value});
            }

			self.report.params = paramList;

			self.$modalInstance.close(self.report);
		};

        self.fn.getReportListOfValues = function(paramConfig){
			paramConfig.Value = [{
				Description: self.translator.translate('wait_loading')
			}];
            self.event.getReportListOfValues(paramConfig.List).then(function(listOfValues){
                /*listOfValues.forEach(function(item){
                    item.Key = self.translator.translate(item.Key);
                });*/
                paramConfig.Value = listOfValues;
				self.$scope.$apply();
            });
        };
        self.fn.getEnvironmentsLoV = function(paramConfig){
			paramConfig.Value = [{
				Description: self.translator.translate('wait_loading')
			}];
            self.event.getReportListOfValues('tblSucursales').then(function(listOfValues){
                paramConfig.Value = listOfValues;
                self.$scope.$apply();
            });
        };

		self.data.isLoading = false;
		self.fn.onAutocompleteLoaded = function(){
			self.data.isLoading = false;
			self.$scope.$apply();
		};
		self.fn.onAutocompleteLoading = function(){
			self.data.isLoading = true;
			self.$scope.$apply();
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