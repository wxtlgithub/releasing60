
    Ext.namespace('Js.Center.System.SpecialMobileDelete');
    Js.Center.System.SpecialMobileDelete.func = function(row) {
    	var deleteSplit = "";
        for (var i = 0; i < row.length; i++) {
            if (row.length == 1) {
                deleteSplit = row[i].data.vc2mobile;
            }
            else {
            
                if (i < (row.length - 1)) {
                    deleteSplit = row[i].data.vc2mobile + "," + deleteSplit;
                }
                if (i == (row.length - 1)) {
                    deleteSplit = deleteSplit + row[i].data.vc2mobile;
                }
            }
        };
        var params = {
            ids: deleteSplit,
            flag: "delete"
        };
        doAjax(Js.Center.System.SpecialMobileUpdateURL, params, Js.Center.System.SpecialMobile.Infostore);
};
  