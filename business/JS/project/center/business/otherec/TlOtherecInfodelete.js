Ext.namespace('Js.Center.Business.OtherEC.OtherEcDelete');
Js.Center.Business.OtherEC.OtherEcDelete.func = function(row){
	    var deleteSplit = "";
	    for (var i = 0; i < row.length; i++) {
	        if (row.length == 1) {
	            deleteSplit = row[i].data.numseqid;
	        }
	        else {
	            if (i < (row.length - 1)) {
	                deleteSplit = row[i].data.numseqid + "," + deleteSplit;
	            }
	            if (i == (row.length - 1)) {
	                deleteSplit = deleteSplit + row[i].data.numseqid;
	            }
	        }
	    };
	    var params = {ids: deleteSplit,flag: "Delete"};
	    doAjax(Js.Center.OtherEC.OtherECURL, params, Js.Center.Business.OtherEC.ECInfostore);
};