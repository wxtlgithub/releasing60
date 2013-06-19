Ext.namespace('Js.Center.Popedom.ECRoleDelete');
//============================================================定义删除方法
Js.Center.Popedom.ECRoleDelete.func = function(row) {
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numroleid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numroleid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numroleid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.Popedom.ECRoleURL, params, Js.Center.Popedom.ECRoleInfo.Infostore);
};
  