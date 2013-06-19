Ext.namespace('Js.Center.Business.ProgramDelete');

Js.Center.Business.ProgramDelete.func = function(row){
    
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numclientid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numclientid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numclientid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.Business.ProgramUpdateURL, params, Js.Center.Business.Program.Infostore);
    
    
};
