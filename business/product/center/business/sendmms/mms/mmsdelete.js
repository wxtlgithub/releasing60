Ext.namespace('Js.Center.SendMMS.MMSdelete');
Js.Center.SendMMS.MMSdelete.func = function(row) {

    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.nummmsid;
        }
        else {

            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.nummmsid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.nummmsid;
            }
        }
    };
    var params = {
        ids: deleteSplit
    };
    doAjax(Js.Center.SendMMS.MMSDeleteURL, params, Js.Center.SendMMS.MMS.Infostore);
};
  