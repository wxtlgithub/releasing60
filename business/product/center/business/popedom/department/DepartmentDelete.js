Ext.namespace('Js.Center.Popedom.DepartmentDelete');

Js.Center.Popedom.DepartmentDelete.func = function(row){
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numdepartid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numdepartid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numdepartid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.Popedom.DepartmentsUpdateURL, params, Js.Center.Popedom.Department.Infostore);
};
