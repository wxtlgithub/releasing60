Ext.namespace('Js.Center.Business.GatewayDelete');

Js.Center.Business.GatewayDelete.func = function(row){
   
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numgwid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numgwid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numgwid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.Business.GatewayUpdateURL, params, Js.Center.Business.Gateway.Infostore);
    
    
};
