Ext.namespace('Js.Center.Business.ServiceCodedelete');
Js.Center.Business.ServiceCodedelete.func = function(row) {

	
 var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numsvcid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numsvcid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numsvcid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.Business.ServiceCodeUpdateURL, params, Js.Center.Business.ServiceCode.Infostore);
    
};
  