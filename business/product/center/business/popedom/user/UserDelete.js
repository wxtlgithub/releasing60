Ext.namespace('Js.Center.Popedom.UserDelete');

Js.Center.Popedom.UserDelete.func = function(row){

var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numuserid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numuserid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numuserid;
            }
        }
    };
   
    var params={
            ids: deleteSplit,
            flag: "delete"
    };
   doAjax(Js.Center.Popedom.UserUpdateURL, params, Js.Center.Popedom.User.Infostore);
    
};
