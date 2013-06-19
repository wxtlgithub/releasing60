Ext.namespace('Js.Center.Purview.RightDelete');
Js.Center.Purview.RightDelete.func = function(row) {
checkLogin();
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numrightid;
        }
        else {

            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numrightid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numrightid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.Purview.RightUpdateURL, params, Js.Center.Purview.Right.Infostore);
};
  