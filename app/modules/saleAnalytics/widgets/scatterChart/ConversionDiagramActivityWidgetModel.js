/**
 * Created by justin on 2/2/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService',
    'config',
    'underscore'
], function (WidgetBase, AuthAjaxService, Configuration, _) {
    'use strict';

    function ConversionDiagramActivityWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);

    }

    ConversionDiagramActivityWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    ConversionDiagramActivityWidgetModel.prototype.getUrl = function () {
        return Configuration.api.activityWidgetConversionDataApi;
    };

    ConversionDiagramActivityWidgetModel.prototype.decorateServerData = function (tooltipGenerator, data) {
        var self = this;
        var returnData = {
            name: "",
            data: {
                columns: [],
                rows: []
            }
        };

        returnData.name = data.Series[0].Name;

        var serverData = data.Series[0].Points;

        var tooltip = {'type': 'string', 'role': 'tooltip', 'p': {'html': true}};
        returnData.data.columns.push({type: 'number', name: 'x'});

        var groups = _.groupBy(serverData, 'UserId');

        var numOfColumns = _.size(groups, 'UserId') * 2;

        _.each(groups, function (groupElems) {

            var groupData = {
                type: 'number',
                name: groupElems[0].Name
            };
            // insert column data
            returnData.data.columns.push(groupData);

            returnData.data.columns.push(tooltip);

            var index = returnData.data.columns.indexOf(groupData) -1;

            // insert row data
            _.each(groupElems, function (elem) {
                var row = [];
                row.push(elem.X);
                for(var i = 0; i < numOfColumns; i++){
                    if(i == index) row.push(elem.Y);
                    else if(i == (index+1) ) row.push(tooltipGenerator(elem));
                    else row.push(null);
                }
                returnData.data.rows.push(row);
            })

        });

        return returnData;
    };

    ConversionDiagramActivityWidgetModel.prototype.generateTooltip = function(element){

    };

    ConversionDiagramActivityWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    ConversionDiagramActivityWidgetModel.prototype._reload = function (tooltipGenerator) {
        return this._baseReload()
            .then(this.decorateServerData.bind(this, tooltipGenerator));
    };

    ConversionDiagramActivityWidgetModel.newInstance = function (ajaxService) {
        return new ConversionDiagramActivityWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return ConversionDiagramActivityWidgetModel;
});