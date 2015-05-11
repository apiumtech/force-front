/**
 * Created by kevin on 10/22/14.
 */

app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var LiteralListService = container.getService('services/literal/LiteralListService');
    var QueryLiteralListBuilder = container.getService('services/literal/QueryLiteralListBuilder');

    function LiteralListModel($literalService, $queryLiteralListBuilder) {
        /*this.gateway = $literalService; // LiteralListService.js
        this.$queryLiteralListBuilder = $queryLiteralListBuilder;
        this.sorting = {};
        this.filterName = "";
        this.allColumns = null;
        this.columnKeys = [];
        this.columns = [];*/
    }

    /*LiteralListModel.prototype.getLiteralKeyList = function(){
      return this.gateway.getLiteralList();
    };*/


    /*LiteralListModel.prototype.setSearchTextFilter = function( searchPattern ){
      return this.gateway.getLiteralList( this.$queryLiteralListBuilder.setPattern( searchPattern ).build() );
    };*/


    LiteralListModel.newInstance = function (ls, qb) {
        var literalService = ls || LiteralListService.newInstance().getOrElse(throwException("Could not create LiteralListService"));
        var queryLiteralListBuilder = qb || QueryLiteralListBuilder.newInstance().getOrElse(throwException("Could not create QueryBuilder"));

        return Some(new LiteralListModel(literalService, queryLiteralListBuilder));
    };

    return {newInstance: LiteralListModel.newInstance};
});

