define([
	'shared/BaseView',
	'modules/saleAnalytics/reports/reportParamsDialog/ReportParamsDialogPresenter'
], function (BaseView, PreviewDialogPresenter) {
	'use strict';

	function PreviewDialogView($scope, $modalInstance, presenter) {
		presenter = presenter || new PreviewDialogPresenter();
		BaseView.call(this, $scope, null, presenter);
		this.$modalInstance = $modalInstance;
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
			var paramList = Object.keys(self.report.params).map(function(key){
				return {
					key: key,
					value: self.report.params[key]
				};
			});

			self.report.params = paramList;

			self.$modalInstance.close(self.report);
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