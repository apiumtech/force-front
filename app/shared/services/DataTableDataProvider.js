/**
 * Created by justin on 3/27/15.
 */
define([
    'shared/services/ajax/FakeAjaxService'
], function (AjaxService) {

    function DataTableDataProvider(ajaxService) {
        this.authAjaxService = ajaxService;
        this.tableFields = [];
    }

    DataTableDataProvider.prototype.getTableFields = function () {
        return this.authAjaxService.rawAjaxRequest({
            result: [
                {
                    data: "following",
                    title: "Following",
                    dataType: "Boolean",
                    sortable: true,
                    width: 70,
                    visible: true,
                    isFilterable: true
                },
                {
                    data: "name",
                    title: "Account Name",
                    dataType: "String",
                    width: 250,
                    visible: true,
                    isFilterable: true
                },
                {
                    data: "imgUrl",
                    menuName: "Logo",
                    title: "Logo",
                    dataType: "String",
                    visible: true,
                    orderable: false,
                    width: 35
                },
                {data: "class", title: "Class.", dataType: "String", visible: true},
                {
                    data: "$loki",
                    title: '<i class="fa ic-checkin-filled brand-green-text"></i>',
                    menuName: 'Geolocalization',
                    width: 100,
                    dataType: "String",
                    orderable: false,
                    visible: true
                },
                {data: "contactInfo.country", title: "Country", dataType: "String", visible: true, isFilterable: true},
                {data: "contactInfo.city", title: "City", dataType: "String", visible: true, isFilterable: true},
                {data: "contactInfo.address", title: "Address", dataType: "String", visible: true, isFilterable: true},
                {
                    data: "contactInfo.phoneNumber",
                    title: "Tel. Number",
                    dataType: "String",
                    visible: true,
                    isFilterable: true
                },
                {data: "modified", title: "Modification Date", dataType: "DateTime", visible: true, isFilterable: true},
                {data: "responsible.name", title: "Owner", dataType: "String", visible: true, isFilterable: true}
            ]
        }).then(this.decorateTableFields.bind(this));
    };

    DataTableDataProvider.prototype.decorateTableFields = function (data) {
        this.tableFields = data;
        return data;
    };

    DataTableDataProvider.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AjaxService.newInstance();
        return new DataTableDataProvider(ajaxService);
    };

    return DataTableDataProvider;
});