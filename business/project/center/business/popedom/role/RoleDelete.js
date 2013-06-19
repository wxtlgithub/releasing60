Ext.namespace('Js.Center.Popedom.RoleDelete');
//============================================================定义删除方法

Js.Center.Popedom.RoleDelete.func = function(row) {

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
    doAjax(Js.Center.Popedom.UserFuncRoleUpdateURL, params, Js.Center.Popedom.Role.Infostore);
};
  