Ext.namespace('Js.Center.Business.UserGroupDelete');

Js.Center.Business.UserGroupDelete.func = function(row){
    
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numusergroupid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numusergroupid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numusergroupid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.Business.UserGroupUpdateURL, params, Js.Center.Business.UserGroup.Infostore);
};
