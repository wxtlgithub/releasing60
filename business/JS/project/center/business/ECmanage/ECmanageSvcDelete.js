Ext.namespace('Js.Center.Business.ECserviceDelete');
Js.Center.Business.ECserviceDelete.func = function(row) {
	var deletesplit = "";
	for (var i = 0; i < row.length; i++) {
	    if (row.length == 1) {
	        deletesplit = row[i].data.numseqid;
	    }
	    else {
	        if (i < (row.length - 1)) {
	            deletesplit = row[i].data.numseqid + "," + deletesplit;
	        }
	        if (i == (row.length - 1)) {
	            deletesplit = deletesplit + row[i].data.numseqid;
	        }
	    }
	}
	
	Ext.Ajax.request({
	    url: Js.Center.Business.ECmanage.ECsvcInfoURL,
	    method: "POST",
		params: {
		    ids: deletesplit,
		    numecid: row[0].data.numecid,
		    flag: "delete"
		},
		success: function() {
		    Ext.Msg.alert("恭喜您", "删除成功了!");
		    Js.Center.Business.ECservice.Infostore.reload();
		},
		failure: function() {
		    Ext.Msg.alert("提 示", "删除失败了!");
		}
    });
};
  