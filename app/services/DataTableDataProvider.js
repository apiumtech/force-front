/**
 * Created by justin on 3/27/15.
 */
app.registerService(function (container) {

    function DataTableDataProvider() {
        this.availableColumns = [
            {data: "following", title: "Following", sortable: false, width: 70, visible: true},
            {data: "name", title: "Account Name", width: 250, visible: true},
            {data: "class", title: "Class.", visible: true},
            {data: "$loki", title: '<i class="fa ic-checkin-filled brand-green-text"></i>', visible: true},
            {data: "contactInfo.country", title: "Country", visible: true},
            {data: "contactInfo.city", title: "City", visible: true},
            {data: "contactInfo.address", title: "Address", visible: true},
            {data: "contactInfo.phoneNumber", title: "Tel. Number", visible: true},
            {data: "modified", title: "Modification Date", visible: true},
            {data: "responsible.name", title: "Owner", visible: true}
        ];
    }

    DataTableDataProvider.prototype.getTableFields = function () {
        return this.availableColumns;
    };

    DataTableDataProvider.newInstance = function () {
        return Some(new DataTableDataProvider());
    };

    return DataTableDataProvider;
});