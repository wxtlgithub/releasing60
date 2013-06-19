Ext.namespace('Js.Center.Business.ECsigntureDelete');

Js.Center.Business.ECsigntureDelete.func = function(row){
    
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.Business.ECmanage.ECSigntureURL, params, Js.Center.Business.ECsignture.Infostore);
    
    
};
