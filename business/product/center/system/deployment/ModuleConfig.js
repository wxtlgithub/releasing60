Ext.namespace('Js.Center.System.Deployment.ModuleConfig');
Js.Center.System.Deployment.ModuleConfig.func = function(programId,programName,nodeId){
	//获取配置项Js.Center.System.Deployment.DeploymentQueryURL
	//var configData = doSynRequest("test.jsp?flag=gettaskitem&programId="+programId);
	var configData = doSynRequest(Js.Center.System.Deployment.DeploymentQueryURL +"?flag=gettaskitem&taskid="+programId);
	// ================================================================ 定义FormPanel
    var moduleConfigItemfp = new Ext.Panel({//new Ext.form.FormPanel({
    	frame: true,
        labelWidth: 100,
        items:[{
        	layout: 'column',
        	items:[]
        }]
    });
  //动态生成配置项
	WXTL.Common.generateConfigFormItem(configData,moduleConfigItemfp,true);
    //===============定义网元模块配置
    Js.Center.System.Deployment.ModuleConfig.ModuleStore = new WXTL.Widgets.CommonData.GroupingStore({
        proxy: new Ext.data.HttpProxy({
            url: Js.Center.System.Deployment.DeploymentQueryURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'totalProperty',
            root: 'data',
            fields: [{
                name: 'id'
            }, {
                name: 'name'
            
            }, {
                name: 'boxLabel',
                mapping: "taskname"
            }, {
                name: 'inputValue',
                mapping: "programid"
            }, {
                name: 'checked',
                mapping:'ischecked'
            }]
        }),
        baseParams: {
            flag: "gettasklist",
            taskid:programId,//row.data.numtaskid,
            programtype:"-1",//"22",//(22：通讯模块，311：任务，62：公共模块，869：功能模块)
            columnlist: "programId,taskname",
            nodeid:nodeId
        }
    });
    Js.Center.System.Deployment.ModuleConfig.ModuleStore.reload();
    var moduleGroup = new WXTL.Widgets.CommonPanel.CheckBoxGroupPanel({
        store: Js.Center.System.Deployment.ModuleConfig.ModuleStore,
        defaultItemsName: "programid",
        defaultItemsboxLable: "没有"+programName+"相关配置模块。",
        style: "padding:5px 5px 5px 5px",
        boxLabelText:"  <a href='#' onclick='Js.Center.System.Deployment.ModuleItemConfig.func(\"{inputValue}\",\"{boxLabel}\",\""+nodeId+"\")'>配置</a>",
        //id: "Js.Center.System.Deployment.ModuleConfig.remoteCheckboxGroup",
        numcolumns: 2,
        blankText: "请选择"+programName+"模块",
        allowBlank: false,
        needButton: false
    });
    
    var moduleGroupPanel = new Ext.Panel({
        style: 'padding:0 0 0 5px',
        autoScroll: true,
        items: [moduleGroup]
    });
    //定义模块FormPanel
    var moduleConfigfp = new Ext.form.FormPanel({
    	//frame: true,
    	layout:"form",
        labelWidth: 100,
        items:[{
    		xtype: "hidden",
    		name: "flag",
    		value: 'updatetasklist'
    	},{
    		xtype: "hidden",
    		name: "taskid",
    		value: programId
    	},moduleConfigItemfp,moduleGroup]
    });
	//===================定义窗体
    var mainForm = moduleConfigfp.getForm();
	this.window = new WXTL.Widgets.CommonWindows.Window({
        title: programName +"配置",
        height:450,
        mainForm: mainForm,
        updateURL: Js.Center.System.Deployment.DeploymentQueryURL,
        displayStore: Js.Center.System.Deployment.ModuleConfig.ModuleStore,
        //updateState: true,
        //updateRecord: row,
        autoScroll:true,
        items: [moduleConfigfp],
        listeners:{
			"hide": function(){
				Js.Center.System.Deployment.NodeConfig.CommunicateModuleStore.reload();
				Js.Center.System.Deployment.NodeConfig.TaskModuleStore.reload();
				Js.Center.System.Deployment.NodeConfig.CommonModuleStore.reload();
				Js.Center.System.Deployment.NodeConfig.FuncModuleStore.reload();
			}
		}
	});
	if(configData.data.length>12){
		this.window.setHeight(400);
	};
	Js.Center.System.Deployment.ModuleConfig.window.show();
	
};