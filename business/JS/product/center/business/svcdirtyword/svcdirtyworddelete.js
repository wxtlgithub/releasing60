Ext.namespace('Js.Center.System.SvcDirtyWordDelete');

Js.Center.System.SvcDirtyWordDelete.func = function(row){
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numdirtywordid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numdirtywordid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numdirtywordid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.System.SvcDirtyWordUpdateURL, params, Js.Center.System.SvcDirtyWord.Infostore);
    
};
