Ext.namespace('Js.Center.System.Deployment.ModuleItemConfig');
Js.Center.System.Deployment.ModuleItemConfig.func = function(programId,programName,nodeId){
	//获取配置项Js.Center.System.Deployment.DeploymentQueryURL
	var configData = doSynRequest(Js.Center.System.Deployment.DeploymentQueryURL +"?flag=gettaskitem&taskid="+programId);
	// ================================================================ 定义FormPanel
    var moduleConfigItemfp = new Ext.form.FormPanel({
    	frame: true,
        labelWidth: 100,
        items:[{
        	layout: 'column',
        	items:[{
        		xtype: "hidden",
        		name: "flag",
        		value: 'updatetaskitem'
        	},{
        		xtype: "hidden",
        		name: "taskid",
        		value: programId
        	},{
        		xtype: "hidden",
        		name: "nodeid",
        		value: nodeId
        	}]
        }]
    });
  //动态生成配置项
	WXTL.Common.generateConfigFormItem(configData,moduleConfigItemfp,true);
    
	//===================定义窗体
    var mainForm = moduleConfigItemfp.getForm();
	this.window = new WXTL.Widgets.CommonWindows.Window({
        title: programName +"配置",
        //height:450,
        mainForm: mainForm,
        updateURL: Js.Center.System.Deployment.DeploymentQueryURL,
        displayStore: Js.Center.System.Deployment.Node.Infostore,
        //updateState: true,
        //updateRecord: row,
        autoScroll:true,
        items: [moduleConfigItemfp],
        listeners:{
			"hide": function(){
				Js.Center.System.Deployment.ModuleConfig.ModuleStore.reload();
			}
		}
	});
	if(configData.data.length>12){
		this.window.setHeight(400);
	};
	Js.Center.System.Deployment.ModuleItemConfig.window.show();
	
};