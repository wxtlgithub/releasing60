Ext.namespace('Js.Center.SendSMS.SMSDelete');

Js.Center.SendSMS.SMSDelete.func = function(row) {

    var deleteSplit = "";
        if (row!=null) {
            deleteSplit = row;
        };
	var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.SendSMS.SmsContentUpdateURL, params, Js.Center.SendSMS.Send.DisplayStore);
};
