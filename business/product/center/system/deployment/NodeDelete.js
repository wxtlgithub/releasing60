Ext.namespace('Js.Center.System.Deployment.NodeDelete');

Js.Center.System.Deployment.NodeDelete.func = function(row){
   
    var deleteSplit = "";
    for (var i = 0; i < row.length; i++) {
        if (row.length == 1) {
            deleteSplit = row[i].data.numtaskid;
        }
        else {
        
            if (i < (row.length - 1)) {
                deleteSplit = row[i].data.numtaskid + "," + deleteSplit;
            }
            if (i == (row.length - 1)) {
                deleteSplit = deleteSplit + row[i].data.numtaskid;
            }
        }
    };
    var params = {
        ids: deleteSplit,
        flag: "delete"
    };
    doAjax(Js.Center.System.Deployment.DeploymentQueryURL, params, Js.Center.System.Deployment.Node.Infostore);
    
    
};
