exports.getReportListOfValues = function (request, response) {
    var res;
    var list = request.params.list;

    if( list == "TBLTIPOSEMPRESA" ){
        res = {
            status: "ack",
            message: {type:"unknown",code:"99.99.99.99",name:"Generic message"},
            data: [
                {Key:"key_empresa1", Value:"Empresa num.1"},
                {Key:"key_empresa2", Value:"Empresa num.2"},
                {Key:"Empresa sin Key", Value:"Otra Empresa"}
            ],
            metaData: null
        };
    } else if( list == "TBLTIPOSCALIFICACIONEMPRESA" ) {
        res = {
            status: "ack",
            message: {type:"unknown",code:"99.99.99.99",name:"Generic message"},
            data: [
                {Key:"key_calif1", Value:"Calif num.1"},
                {Key:"key_calif2", Value:"Calif num.2"},
                {Key:"Calificacion sin Key", Value:"Otra Calif"}
            ],
            metaData: null
        };
    } else {
        throw new Error("unknown list type");
    }

    response.json(res);
};