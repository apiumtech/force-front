define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/widgets/WidgetBase',
    'modules/saleAnalytics/reports/ReportFakeData',
    'shared/services/ArrayHelper',
    'config',
    'moment',
    'underscore'
], function (AjaxService, WidgetBase, ReportFakeData, ArrayHelper, Configuration, moment, _) {
    'use strict';

    function AllReportModel(ajaxService) {
        ajaxService = ajaxService || new AjaxService();
        WidgetBase.call(this, ajaxService);
        this.arrayHelper = ArrayHelper;
        this.queries = {
            user: "",
            permission: ""
        };

        this.addDateFilter(moment().subtract(Configuration.defaultDateSubtraction, 'days').toDate(), moment().toDate());
    }

    AllReportModel.inherits(WidgetBase, {});

    AllReportModel.prototype.reloadWidget = function () {
        return this._reload();
    };

    // winter version
    AllReportModel.prototype._reload = function () {
        var self = this;
        var url = Configuration.api.reportList;
        var fmRequest = {
          idCompany: 0,
          idEnvironment: 0,
          searchQuery: ''
        };
        var params = {
            url: url,
            type: 'GET',
            headers: {
              'x-fm-requestData': JSON.stringify(fmRequest)
            },
            contentType: 'application/json',
            dataType: 'json'
        };

        return self.authAjaxService.rawAjaxRequest(params).then(self.decorateServerData.bind(self));
    };

    // old version
   /*AllReportModel.prototype._reload = function () {
      var self = this;
      var url = Configuration.api.getAllReports;

      var params = {
        url: url,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json'
      };

      return self.authAjaxService.rawAjaxRequest(params).then(self.decorateServerData.bind(self));
    };*/

    AllReportModel.prototype.decorateServerData = function (data) {
        data = data.data;
        if (!data || !(data instanceof Array) || data.length <= 0) {
          throw new Error("No data received from server");
        }

        // Soportamos objeto Properties y objeto con props en minúsculas.
        // Originalmente era en capitalizado a lo .NET, la app espera eso...
        if(data[0].hasOwnProperty('Properties') || data[0].hasOwnProperty('id')) {
            data = data.map(function(item){
                var props = item.hasOwnProperty('Properties') ? item.Properties : item;
                return {
                    Id : props.id,
                    IdParent : props.idParent,
                    Date : props.date,
                    Description : props.description,
                    Favorite : props.favorite,
                    IsCrystal : props.hasOwnProperty('isCrystal') ? props.isCrystal : true,
                    IsShared : props.isShared,
                    Name : props.name,
                    Path : props.path,
                    Type : props.type,
                    ReportType : props.reportType
                };
            });
        }
        if(!data[0].hasOwnProperty('IsCrystal')) {
          data = data.map(function(item) {
            return _.extend({IsCrystal: true}, item);
          });
        }
        return this.arrayHelper.makeTree(data, 'IdParent', 'Id', 'children', -1);
    };

    return AllReportModel;
});
