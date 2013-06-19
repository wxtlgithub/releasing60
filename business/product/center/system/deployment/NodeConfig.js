Ext.namespace('Js.Center.System.Deployment.NodeConfig');
Js.Center.System.Deployment.NodeConfig.func = function(row){
	//获取配置项Js.Center.System.Deployment.DeploymentQueryURL
	var configData = doSynRequest(Js.Center.System.Deployment.DeploymentQueryURL +"?flag=gettaskitem&taskid="+row.data.numtaskid);
	
	// ================================================================ 定义FormPanel
    var nodeConfigfp = new Ext.Panel({//Ext.form.FormPanel({
    	frame: true,
        labelWidth: 100,
        items:[{
        	layout: 'column',
        	items:[]
        }]
        //buttonAlign: "right",
//        buttons: [new Ext.Button({
//            text: '保存',
//            minWidth: 70,
//            handler: function(){
//                if (nodeConfigfp.getForm().isValid()) {
//                	var nodeItem = "";
//                	for(var i =0;i<nodeConfigfp.getForm().items.length;i++){
//                		nodeItem = nodeItem +nodeConfigfp.getForm().items.items[i].name + ":" +nodeConfigfp.getForm().items.items[i].value +",";
//                	}
//                    // 弹出效果
//                    Ext.MessageBox.show({
//                        msg: '正在保存，请稍等...',
//                        progressText: 'Saving...',
//                        width: 300,
//                        wait: true,
//                        icon: 'download',
//                        animEl: 'saving'
//                    });
//                    setTimeout(function(){
//                        Ext.MessageBox.hide();
//                    }, 300000);
//                    nodeConfigfp.getForm().submit({
//                        url: Js.Center.System.Deployment.DeploymentQueryURL,
//                        method: "POST",
//                        success: function(form, action){
//                            var objJson = Ext.util.JSON.decode(action.response.responseText);
//                            var falg = objJson.success;
//                            if (falg == true) {
//                                Ext.Msg.alert("温馨提示", "操作成功了!");
//                            }
//                            else 
//                                Ext.Msg.alert('温馨提示', objJson.info);
//                        },
//                        failure: function(form, action){
//                            var objJson = Ext.util.JSON.decode(action.response.responseText);
//                            Ext.Msg.alert('温馨提示', objJson.info);
//                        }
//                    });
//                    
//                }
//            }
//        })]
    });
  //动态生成配置项
	WXTL.Common.generateConfigFormItem(configData,nodeConfigfp,true);
    //===============定义网元通讯模块配置============start============
    Js.Center.System.Deployment.NodeConfig.CommunicateModuleStore = new WXTL.Widgets.CommonData.GroupingStore({
        proxy: new Ext.data.HttpProxy({
            url: Js.Center.System.Deployment.DeploymentQueryURL,//"test1.jsp",//
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
            },{
                name: 'parentId',
                mapping:'parentid'
            }]
        }),
        baseParams: {
            flag: "gettasklist",
            taskid:row.data.numtaskid,
            programtype:"22",//(22：通讯模块，311：任务，62：公共模块，869：功能模块)
            columnlist: "programId,taskname"
        }
    });
    Js.Center.System.Deployment.NodeConfig.CommunicateModuleStore.reload();
    Js.Center.System.Deployment.NodeConfig.communicateGroup = new WXTL.Widgets.CommonPanel.CheckBoxGroupPanel({
        store: Js.Center.System.Deployment.NodeConfig.CommunicateModuleStore,
        defaultItemsName: "programid",
        defaultItemsboxLable: '没有相关通讯模块。',
        style: "padding:5px 5px 5px 5px",
        boxLabelText:"  <img src='jspack/product/common/Images/file-add.gif' qtip='添加模块' onclick='Js.Center.System.Deployment.NodeConfig.AddModule(\"{inputValue}\",\"{boxLabel}\",\"add\")'/>  <img src='jspack/product/common/Images/icons/edit.png' qtip='修改模块名称' onclick='Js.Center.System.Deployment.NodeConfig.AddModule(\"{inputValue}\",\"{boxLabel}\",\"update\")'/> <a href='#' onclick='Js.Center.System.Deployment.ModuleConfig.func(\"{inputValue}\",\"{boxLabel}\",\""+row.data.numtaskid+"\") '>配置</a> ",
        //id: "Js.Center.System.Deployment.NodeConfig.remoteCheckboxGroup",
        numcolumns: 2,
        blankText: "请选择通讯模块",
        allowBlank: false,
        needButton: false
    });
    
    var communicateGroupPanel = new Ext.Panel({
        style: 'padding:0 0 0 5px',
        title:'通讯模块',
        //autoHeight: true,
        //width: 300,
        height: 160,
        autoScroll: true,
        items: [Js.Center.System.Deployment.NodeConfig.communicateGroup]
    });
  //===============定义网元通讯模块配置============end============
    
  //===============定义网元任务模块配置============start============
    Js.Center.System.Deployment.NodeConfig.TaskModuleStore = new WXTL.Widgets.CommonData.GroupingStore({
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
            taskid:row.data.numtaskid,
            programtype:"311",//(22：通讯模块，311：任务，62：公共模块，869：功能模块)
            columnlist: "programId,taskname"
        }
    });
    Js.Center.System.Deployment.NodeConfig.TaskModuleStore.reload();
    var taskGroup = new WXTL.Widgets.CommonPanel.CheckBoxGroupPanel({
        store: Js.Center.System.Deployment.NodeConfig.TaskModuleStore,
        defaultItemsName: "programid",
        defaultItemsboxLable: '没有相关任务模块。',
        style: "padding:5px 5px 5px 5px",
        boxLabelText:"  <a href='#' onclick='Js.Center.System.Deployment.ModuleConfig.func(\"{inputValue}\",\"{boxLabel}\",\""+row.data.numtaskid+"\")'>配置</a>",
        numcolumns: 2,
        blankText: "请选择任务模块",
        allowBlank: false,
        needButton: false
    });
    
    var taskGroupPanel = new Ext.Panel({
        style: 'padding:0 0 0 5px',
        title:'任务模块',
        //autoHeight: true,
        //width: 300,
        height: 160,
        autoScroll: true,
        items: [taskGroup]
    });
  //===============定义网元任务模块配置============end============
    
  //===============定义网元公共模块配置============start============
    Js.Center.System.Deployment.NodeConfig.CommonModuleStore = new WXTL.Widgets.CommonData.GroupingStore({
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
            taskid:row.data.numtaskid,
            programtype:"62",//(22：通讯模块，311：任务，62：公共模块，869：功能模块)
            columnlist: "programId,taskname"
        }
    });
    Js.Center.System.Deployment.NodeConfig.CommonModuleStore.reload();
    var commonGroup = new WXTL.Widgets.CommonPanel.CheckBoxGroupPanel({
        store: Js.Center.System.Deployment.NodeConfig.CommonModuleStore,
        defaultItemsName: "programid",
        defaultItemsboxLable: '没有相关公共模块。',
        style: "padding:5px 5px 5px 5px",
        boxLabelText:"  <a href='#' onclick='Js.Center.System.Deployment.ModuleConfig.func(\"{inputValue}\",\"{boxLabel}\",\""+row.data.numtaskid+"\")'>配置</a>",
        numcolumns: 2,
        blankText: "请选择公共模块",
        allowBlank: false,
        needButton: false
    });
    
    var commonGroupPanel = new Ext.Panel({
        style: 'padding:0 0 0 5px',
        title:'公共模块',
        //autoHeight: true,
        //width: 300,
        height: 160,
        autoScroll: true,
        items: [commonGroup]
    });
  //===============定义网元公共模块配置============end============
    
  //===============定义网元功能模块配置============start============
    Js.Center.System.Deployment.NodeConfig.FuncModuleStore = new WXTL.Widgets.CommonData.GroupingStore({
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
            taskid:row.data.numtaskid,
            programtype:"869",//(22：通讯模块，311：任务，62：公共模块，869：功能模块)
            columnlist: "programId,taskname"
        }
    });
    Js.Center.System.Deployment.NodeConfig.FuncModuleStore.reload();
    var funcGroup = new WXTL.Widgets.CommonPanel.CheckBoxGroupPanel({
        store: Js.Center.System.Deployment.NodeConfig.FuncModuleStore,
        defaultItemsName: "programid",
        defaultItemsboxLable: '没有相关功能模块。',
        style: "padding:5px 5px 5px 5px",
        boxLabelText:"  <a href='#' onclick='Js.Center.System.Deployment.ModuleConfig.func(\"{inputValue}\",\"{boxLabel}\",\""+row.data.numtaskid+"\")'>配置</a>",
        numcolumns: 2,
        blankText: "请选择功能模块",
        allowBlank: false,
        needButton: false
    });
    
    var funcGroupPanel = new Ext.Panel({
        style: 'padding:0 0 0 5px',
        title:'功能模块',
        //autoHeight: true,
        //width: 300,
        border: true,
        height: 160,
        autoScroll: true,
        items: [funcGroup]
    });
  //===============定义网元功能模块配置============end============
    //定义模块FormPanel
    var moduleConfigfp = new Ext.form.FormPanel({
    	//frame: true,
        labelWidth: 100,
        items:[{
        	layout: 'column',
        	items:[{
        		xtype: "hidden",
        		name: "flag",
        		value: 'updatetasklist'
        	},{
        		xtype: "hidden",
        		name: "taskid",
        		value: row.data.numtaskid
        	},{
				columnWidth: 1,
	            layout: 'form',
	            //锚点布局-
	            defaults: {
	                anchor: "98%",
	                msgTarget: "side"
	            },
	            buttonAlign: "center",
	            //bodyStyle: "padding:10px 0 10px 15px",
	            items:[nodeConfigfp]
			},{
				columnWidth: .5,
	            layout: 'form',
	            //锚点布局-
	            defaults: {
	                anchor: "97%",
	                msgTarget: "side"
	            },
	            buttonAlign: "center",
	            //bodyStyle: "padding:10px 0 10px 15px",
	            items:[communicateGroupPanel,taskGroupPanel]
			},{
				columnWidth: .5,
	            layout: 'form',
	            //锚点布局-
	            defaults: {
	                anchor: "97%",
	                msgTarget: "side"
	            },
	            buttonAlign: "center",
	            //bodyStyle: "padding:10px 0 10px 15px",
	            items:[commonGroupPanel,funcGroupPanel]
			}]
        }]
    });
	//===================定义窗体
    var mainForm = moduleConfigfp.getForm();
	this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "利信通2.0系统配置",
        height:450,
        mainForm: mainForm,
        updateURL: Js.Center.System.Deployment.DeploymentQueryURL,
        displayStore: Js.Center.System.Deployment.Node.Infostore,
        updateState: true,
        updateRecord: row,
        autoScroll:true,
        style: 'padding:5px 0 0 5px',
        items: [moduleConfigfp],
        listeners:{
			"hide": function(){
				Js.Center.System.Deployment.NodeConfig.CommunicateModuleStore.reload();
			}
		}
	});
	if(configData.data.length>12){
		this.window.setHeight(400);
	};
	Js.Center.System.Deployment.NodeConfig.window.show();
	/************************************
	 * 复制添加模块，在checkboxgroup中动态添加复制项
	 ************************************/
	Js.Center.System.Deployment.NodeConfig.AddModule = function(itemValue,itemText,flag){
		var addInfofp = new Ext.form.FormPanel({
            frame: true,
            labelWidth: 80,
            layout: 'form',
            //defaultType: "textfield",
            //锚点布局-
            defaults: {
                anchor: "99%",
                msgTarget: "side"
            },
            buttonAlign: "center",
            bodyStyle: "padding:10px 0 10px 10px",
            items: [{
                xtype: "textfield",
                fieldLabel: "模块名称",
                value:itemText
            }]
        });
		var addWindow = new WXTL.Widgets.CommonWindows.Window({
	        title: "",
	        //height:450,
	        mainForm: addInfofp.getForm(),
	        //updateURL: Js.Center.System.Deployment.DeploymentQueryURL,
	        //displayStore: Js.Center.System.Deployment.Node.Infostore,
	        //updateState: true,
	        //updateRecord: row,
	        //autoScroll:true,
	        style: 'padding:5px 0 0 5px',
	        items: [addInfofp],
	        needButtons: false,
            buttons: [new Ext.Button({
                text: '确定',
                minWidth: 70,
                handler: function(){
            		var index = Js.Center.System.Deployment.NodeConfig.communicateGroup.store.find("inputValue",itemValue);	
            		if(flag == "add"){
            			var communicateRecord = Ext.data.Record.create([{
                			name: 'boxLabel'
                		}, {
                			name: 'inputValue'
                		}, {
                			name: 'checked'
                		}, {
                			name: 'parentId'
                		}]);
                		
            		
                		Js.Center.System.Deployment.NodeConfig.communicateGroup.store.insert(index+1,new communicateRecord({
                			inputValue:itemValue.split(":")[0] +"::"+addWindow.items.items[0].items.items[0].getValue() +":"+itemValue.split(":")[0],
                			boxLabel:addWindow.items.items[0].items.items[0].getValue(),//itemText,
                			parentId:itemValue,
                			checked:true
                		}));
                		Js.Center.System.Deployment.NodeConfig.communicateGroup.onLoad();
            		}
            		else if(flag == "update"){
            			var record = Js.Center.System.Deployment.NodeConfig.communicateGroup.store.getAt(index);
            			record.set("inputValue",itemValue.split(":")[0] +":"+itemValue.split(":")[1]+":"+addWindow.items.items[0].items.items[0].getValue());
            			record.set("boxLabel",addWindow.items.items[0].items.items[0].getValue());
            			record.commit();
            			Js.Center.System.Deployment.NodeConfig.communicateGroup.onLoad();
            		}
//            		else if(flag == "delete"){
//            			Js.Center.System.Deployment.NodeConfig.communicateGroup.store.removeAt(index);
//            			Js.Center.System.Deployment.NodeConfig.communicateGroup.onLoad();
//            		}
            		
            		
            		addWindow.close();
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(){
                    //Js.Center.Business.Product.ppbalanceAdd.window.mainForm.reset();
                    
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
            		addWindow.close();
                }
            })]
		});
		if(flag == "delete"){
			var index = Js.Center.System.Deployment.NodeConfig.communicateGroup.store.find("inputValue",itemValue);	
			Js.Center.System.Deployment.NodeConfig.communicateGroup.store.removeAt(index);
			Js.Center.System.Deployment.NodeConfig.communicateGroup.onLoad();
		}
		else{
			addWindow.show();
		}
		
		
	}
};
