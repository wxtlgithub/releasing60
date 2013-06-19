Ext.namespace('Js.Center.Business.ProductDelete');

Js.Center.Business.ProductDelete.func = function(row){
    
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numprodid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numprodid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numprodid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.Business.ProductUpdateURL, params, Js.Center.Business.Product.Infostore);
    
};
