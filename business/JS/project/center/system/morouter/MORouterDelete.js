Ext.namespace('Js.Center.Business.MORouterDelete');

Js.Center.Business.MORouterDelete.func = function(row){
    
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numrouteid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numrouteid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numrouteid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.Business.MORouterUpdateURL, params, Js.Center.Business.MORouter.Infostore);
    
    
};
