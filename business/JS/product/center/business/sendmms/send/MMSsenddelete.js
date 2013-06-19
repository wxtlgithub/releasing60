Ext.namespace('Js.Center.SendMMS.SendMMSDelete');

Js.Center.SendMMS.SendMMSDelete.func = function(row) {

    var deleteSplit = "";
        if (row!=null) {
            deleteSplit = row;
        }
	var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.SendMMS.MMSContentDeleteURL, params, Js.Center.SendMMS.Send.DisplayStore);
};
