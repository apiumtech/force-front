/**
 * Created by justin on 1/26/15.
 */

app.registerModel(function (container) {
    var WidgetBase = container.getService('services/WidgetBase');
    var AjaxService = container.getService("services/ajax/AuthAjaxService");
    var Configuration = container.getService('Configuration');
    // TODO: REMOVE WHEN HAVE CORRECT CONTRACT
    var FakeAjaxService = container.getService("services/FakeAjaxService");

    function BarChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
        // TODO: REMOVE WHEN HAVE CORRECT CONTRACT
        this.fakeAjaxService = FakeAjaxService.newInstance();

        this.currentFilter = 'allActivities';
        this.filters = [{
            name: "Account Type",
            key: "AccountType"
        }, {
            name: "Segment",
            key: "Segment"
        }];
    }

    BarChartWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    BarChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) == -1) {
            this.currentFilter = this.filters[0].key;
        }
        else
            this.currentFilter = filter;
    };

    BarChartWidgetModel.prototype.getUrl = function () {
        return Configuration.api.coverageWidgetDistributionDataApi.format(this.currentFilter);
    };

    BarChartWidgetModel.prototype.decorateServerData = function (data) {
        var responseData = {
            "data": {
                "params": {
                    "filters": this.filters,
                    "axis": {"x": []},
                    "bars": []
                }
            }
        };

        var dataArray = [];
        data.Series.forEach(function (i) {
            responseData.data.params.axis.x.push(i.name);
        });

        data.Labels.forEach(function (label) {
            responseData.data.params.bars.push({
                data: [],
                label: label
            });
        });

        return responseData;
    };

    BarChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    BarChartWidgetModel.prototype._reload = function () {
        //return this._baseReload()

// TODO: REMOVE WHEN HAVE CORRECT CONTRACT
        var request = {
            url: '',
            type: '',
            result: {
                "Series": [
                    {
                        "Name": "A",
                        "Points": [
                            {
                                "Y": "17,79"
                            },
                            {
                                "Y": "26,92"
                            }
                        ]
                    },
                    {
                        "Name": "B",
                        "Points": [
                            {
                                "Y": "17,02"
                            },
                            {
                                "Y": "23,40"
                            }
                        ]
                    },
                    {
                        "Name": "C",
                        "Points": [
                            {
                                "Y": "40,00"
                            },
                            {
                                "Y": "54,00"
                            }
                        ]
                    },
                    {
                        "Name": "CA",
                        "Points": [
                            {
                                "Y": "6,25"
                            },
                            {
                                "Y": "12,50"
                            }
                        ]
                    },
                    {
                        "Name": "D",
                        "Points": [
                            {
                                "Y": "32,26"
                            },
                            {
                                "Y": "41,94"
                            }
                        ]
                    },
                    {
                        "Name": "E",
                        "Points": [
                            {
                                "Y": "55,56"
                            },
                            {
                                "Y": "55,56"
                            }
                        ]
                    },
                    {
                        "Name": "F",
                        "Points": [
                            {
                                "Y": "12,82"
                            },
                            {
                                "Y": "15,38"
                            }
                        ]
                    },
                    {
                        "Name": "-",
                        "Points": [
                            {
                                "Y": "10,99"
                            },
                            {
                                "Y": "14,45"
                            }
                        ]
                    }
                ],
                "Labels": [
                    [
                        "hard",
                        "soft"
                    ]
                ]
            }
        };

        return this.fakeAjaxService.rawAjaxRequest(request)
// TODO: END OF TODO
            .then(this.decorateServerData.bind(this));
    };

    BarChartWidgetModel.newInstance = function (ajaxService) {
        return new BarChartWidgetModel(ajaxService || AjaxService.newInstance());
    };

    return BarChartWidgetModel;
});