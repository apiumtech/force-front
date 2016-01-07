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

    function ScatterChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);

    }

    ScatterChartWidgetModel.inherits(WidgetBase, {});

    ScatterChartWidgetModel.prototype.decorateServerData = function (tooltipGenerator, data) {
        var returnData = {
            name: "",
            data: {
                columns: [],
                rows: []
            }
        };

        returnData.name = data.Series[0].Name;

        var serverData = data.Series[0].Points;

        var colors = [];

        var legends = [];

        var tooltip = {'type': 'string', 'role': 'tooltip', 'p': {'html': true}};
        returnData.data.columns.push({type: 'number', name: 'x'});

        var groups = _.groupBy(serverData, 'UserId');

        var numOfColumns = _.size(groups, 'UserId') * 2;

        _.each(groups, function (groupElems) {

            var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
            colors.push(color);
            legends.push({name: groupElems[0].Name, color: color});

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
                    if(i === index){
                        row.push(elem.Y);
                    } else if(i === (index+1) ) {
                        row.push(tooltipGenerator(elem));
                    } else {
                        row.push(null);
                    }
                }
                returnData.data.rows.push(row);
            });

        });

        return {chartData: returnData, colors: colors, legends: legends};
    };

    ScatterChartWidgetModel.prototype.generateTooltip = function(element){

    };

    ScatterChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    ScatterChartWidgetModel.prototype._reload = function (tooltipGenerator) {
        return this._baseReload();
            //.then(this.decorateServerData.bind(this, tooltipGenerator));
    };

    ScatterChartWidgetModel.newInstance = function (ajaxService) {
        return new ScatterChartWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return ScatterChartWidgetModel;
});