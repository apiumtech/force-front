app.registerService(function (container) {

  var QueryLiteralBuilder = function(){};

  QueryLiteralBuilder.prototype.search = function( id ){
    var search =  {
                    credentials : { keys : { key : 'key', user : 'user', userkey : 'userKey', localTime : 'localTime' } } ,
                    id : id
                  };

    var nullBody = {
                    "Key": "",
                    "LanguageValues": [
                        {
                            "Key": "es-es",
                            "Value": ""
                        },
                        {
                            "Key": "en-gb",
                            "Value": ""
                        },
                        {
                            "Key": "en-us",
                            "Value": ""
                        },
                        {
                            "Key": "fr-fr",
                            "Value": ""
                        },
                        {
                            "Key": "it-it",
                            "Value": ""
                        },
                        {
                            "Key": "pt-pt",
                            "Value": ""
                        },
                        {
                            "Key": "ca-es",
                            "Value": ""
                        }
                    ]};
    return id != null ? search : nullBody;
  };

  QueryLiteralBuilder.prototype.updateOrCreateLiteral = function( literal ){
    var values = literal.LanguageValues.reduce( function(memo, val){
                    memo[val.Key] = val.Value;
                    return memo;
                  }, {} ); 

    return { credentials : { keys : { key : 'key', user : 'user', userkey : 'userKey', localTime : 'localTime' } } ,
              id : literal.Id,
              key : literal.Key,
              literalType : 'Label',
              values : values 
            };
  };

  QueryLiteralBuilder.newInstance = function( itemsPerPage ){
    return Some( new QueryLiteralBuilder() );
  };

  return QueryLiteralBuilder;

});

