Ext.namespace('Js.Center.Message.MessageDelete');

Js.Center.Message.MessageDelete.func = function(row){
   
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numcontentseqid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numcontentseqid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numcontentseqid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "deletemessage"
    };
    doAjax(Js.Center.Message.MessageUpdateURL, params, Js.Center.Message.Infostore);
    
};
