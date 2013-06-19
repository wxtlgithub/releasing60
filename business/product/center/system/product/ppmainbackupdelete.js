/*
 * 
 * 删除主备策略
 * 
 */
Ext.namespace('Js.Center.Business.Product.ppmainbackupDelete');

Js.Center.Business.Product.ppmainbackupDelete.func = function(row){
    
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numstraid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numstraid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numstraid;
            }
        }
    };
//	numprodid              //通道组id

//   numtypeid             //策略类别id    
    var params = {
        ids: deleteSplit,
		numprodid:row[0].data.numprodid,
		numtypeid:2,
        flag: "deleterotestaras"
    };
    doAjax(Js.Center.Business.RoutestraURL, params,Js.Center.Business.productpolicy.MainBackupInfostore);
    
};
