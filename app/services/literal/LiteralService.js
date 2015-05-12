app.registerService(function (container) {
  var Q = container.getFunction('q');
  var AjaxService = container.getService('services/AjaxService');
  var QueryLiteralBuilder = container.getService('services/literal/QueryLiteralBuilder');

  var LITERAL_KEY_BY_ID_URL = "https://commons-queries.forcemanager.net/literals/literal/literalById.ashx";
  var LITERAL_UPDATE_URL = "https://commons-commands.forcemanager.net/literals/literal/changeLiteralDetails.ashx";
  var LITERAL_CREATE_URL = "https://commons-commands.forcemanager.net/literals/literal/createLiteral.ashx";
  var LITERAL_DELETE_URL = "https://commons-commands.forcemanager.net/literals/literal/deleteLiteral.ashx";

  var LiteralService = function( $ajaxService, $queryLiteralBuilder ){
    this.ajaxService = $ajaxService;
    this.queryLiteralBuilder = $queryLiteralBuilder;
  };

  LiteralService.prototype.getLiteralById = function( id ){

    var body =  this.queryLiteralBuilder.search( id );

    return id != null ? this.ajaxService.ajax( {url: LITERAL_KEY_BY_ID_URL, data: JSON.stringify( body ), type:'POST', dataType: 'json' } )
                      : Q.fcall(function(){ return body });
  };

  LiteralService.prototype.updateOrCreateLiteral = function( literal ){

    var body =this.queryLiteralBuilder.updateOrCreateLiteral( literal );
    var url = literal.Id != null ? LITERAL_UPDATE_URL : LITERAL_CREATE_URL 

    return this.ajaxService.ajax( {url: url, data: JSON.stringify( body ), type:'POST', dataType: 'json' } );

  };

  LiteralService.prototype.deleteLiteral = function( id ){
    var body =  this.queryLiteralBuilder.search( id );
    return this.ajaxService.ajax( {url: LITERAL_DELETE_URL, data: JSON.stringify( body ), type:'POST', dataType: 'json' } );
  };

  LiteralService.newInstance = function($ajaxService, $queryLiteralBuilder){
    var ajaxService = $ajaxService || AjaxService.newInstance();
    var queryLiteralBuilder = $queryLiteralBuilder || QueryLiteralBuilder.newInstance();

    return  new LiteralService( ajaxService, queryLiteralBuilder ) ;
  };

  return LiteralService;
});
