///<reference path = "vswd-ext_2.2.js" / >

//=======================================================================================CommonWindows
Ext.namespace("WXTL.Widgets.CommonWindows");
/**************************************************************************************************************
 * 控件类别：窗口window
 * 功能描述：添加、修改操作弹出的窗体
 ***************************************************************************************************************/

WXTL.Widgets.CommonWindows.Window = Ext.extend(Ext.Window, {
    title: "添加栏目成员",//标题
    width: 650,
    iconCls: "addicon",
    resizable: false,
    collapsible: true, // 允许缩放条
    closeAction: 'hide',//'close',//关闭方式
    closable: true,
    plain: true,
    modal: 'true',
    needButtons: "true",
    buttonAlign: "center",
    //表结构
    structure: '1',
    mainForm: '',
    updateURL: '',
    displayStore: '',
    updateState: true,
    updateRecord: '',
	needLoadDataStore: false,
	loadDataStoreFunc: '',
    initComponent: function(){
        if (this.structure != '') {
            this.initStructure();
        }
        WXTL.Widgets.CommonWindows.Window.superclass.initComponent.call(this);
		if (!this.rendered) {
			this.render(Ext.getBody());
		}
    },
    onRender: function(ct, position){
        WXTL.Widgets.CommonWindows.Window.superclass.onRender.call(this, ct, position);
    },
    initStructure: function(){
        var obj = this;
        //===============================================================添加监听事件
        this.addListener("show", function() {
        	if(obj.mainForm){
        		obj.mainForm.reset();
        		obj.center();
        		if (obj.updateState && obj.updateRecord != null) {
        			if(obj.mainForm.loadRecord)
        				obj.mainForm.loadRecord(obj.updateRecord);
        		}
        		if(obj.needLoadDataStore){
        			this.loadDataStoreFunc();
        			//eval(this.loadDataStoreFunc +"()");
        		}
        	}
        });
		
        if (this.needButtons) {
            this.buttons = [new Ext.Button({
                text: '确定',
                minWidth: 70,
                handler: function(){
                    if (obj.mainForm.isValid()) {
                        // 弹出效果
                        Ext.MessageBox.show({
                            msg: '正在保存，请稍等...',
                            progressText: 'Saving...',
                            width: 300,
                            wait: true,
                            icon: 'download',
                            animEl: 'saving'
                        });
                        setTimeout(function(){
                            Ext.MessageBox.hide();
                        }, 300000);
                        obj.mainFormSubmitFunc();
                        
                    }
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(){
                    obj.mainForm.reset();
                    if (obj.updateState && obj.updateRecord != null){
                        obj.mainForm.loadRecord(obj.updateRecord);
                    }
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function() {
                	if (obj.closeAction == 'close') {
                		obj.close();
                	}
                	else {
                		obj.hide();
                	}
                }
            })];
        }
    },
    mainFormSubmitFunc: function(sucessFuncs,parms,url){
    	var sucessFunc = "";
    	if(sucessFuncs != null && sucessFuncs !=''&& sucessFuncs != "undefined"){
            if(Ext.isIE == true ){
            	sucessFunc= sucessFuncs.replace(/\r\n/ig,"\\r\\n");
            }
            else{
            	sucessFunc= sucessFuncs.replace(/\n/ig,"\\n");
            }
        }
        var obj = this;
        if (parms != null) {
            Ext.Ajax.request({
                url: url,
                method: "POST",
                params: parms,
                success: function(form, action){
                    var objJson = Ext.util.JSON.decode(form.responseText);
                    var falg = objJson.success;
                    if (falg == true) {
                        if (sucessFunc == null || sucessFunc=='') {
							Ext.Msg.alert("温馨提示", "操作成功了!");
						}
						else {
							eval(sucessFunc);
						}
						if(obj.closeAction == 'close'){
						    obj.close();
						}
						else{
						    obj.hide();
						}
						
						if(obj.displayStore != null){
							obj.displayStore.reload();
						}
                    }
                    else {
						if (objJson.info != null && objJson.info == "对不起，您没有登录！") {
							Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
								window.location.href = "login.htm";
							});
						}
						else{
							Ext.Msg.alert('温馨提示', objJson.info);
						}
					}
                },
                failure: function(form, action){
                    var objJson = Ext.util.JSON.decode(action.response.responseText);
                    if (!objJson.success && objJson.info == "对不起，您没有登录！") {
						Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
							window.location.href = "login.htm";
						});
					}
					else{ 
						Ext.Msg.alert('温馨提示', objJson.info);
					}
                }
            });
        }
		else {
			obj.mainForm.submit({
				url: obj.updateURL,
				method: "POST",
				success: function(form, action){
					var objJson = Ext.util.JSON.decode(action.response.responseText);
					var falg = objJson.success;
					if (falg == true) {
						if (sucessFunc == null || sucessFunc=='') {
							Ext.Msg.alert("温馨提示", "操作成功了!");
						}
						else {
							eval(sucessFunc);
						}
						if(obj.closeAction == 'close'){
						    obj.close();
						}
						else{
						    obj.hide();
						}
						if(obj.displayStore != null){
							obj.displayStore.reload();
						}
					}
					else {
						if (objJson.info != null && objJson.info == "对不起，您没有登录！") {
							Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
								window.location.href = "login.htm";
							});
						}
						else{
							Ext.Msg.alert('温馨提示', objJson.info);
						}
					}
				},
				failure: function(form, action){
					var objJson = Ext.util.JSON.decode(action.response.responseText);
					if (!objJson.success && objJson.info == "对不起，您没有登录！") {
						Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
							window.location.href = "login.htm";
						});
					}
					else{
						Ext.Msg.alert('温馨提示', objJson.info);
					}
				}
			});
		}
    }//,
//	listeners:{
//		"beforeshow": function(){
//			alert('123');
//		},
//		"show": function(){
//			WXTL.Common.showWaitLoading(true);
//			this.center();
//			alert('123');
//			WXTL.Common.showWaitLoading(false);
//		}
//	}
});
Ext.reg('CommonWindows', WXTL.Widgets.CommonWindows.Window);



WXTL.Widgets.CommonWindows.WindowOriginal = Ext.extend(Ext.Window, {
    title: "添加栏目成员",//标题
    width: 650,
    iconCls: "addicon",
    resizable: false,
    collapsible: true, // 允许缩放条
    closeAction: 'close',//'hide',//关闭方式
    closable: true,
    plain: true,
    modal: 'true',
    needButtons: "true",
    buttonAlign: "center",
    //表结构
    structure: '1',
    mainForm: '',
    updateURL: '',
    displayStore: '',
    updateState: true,
    updateRecord: '',
    initComponent: function(){
        if (this.structure != '') {
            this.initStructure();
        }
        WXTL.Widgets.CommonWindows.Window.superclass.initComponent.call(this);
    },
    onRender: function(ct, position){
        WXTL.Widgets.CommonWindows.Window.superclass.onRender.call(this, ct, position);
    },
    initStructure: function(){
        var obj = this;
        //===============================================================添加监听事件
        this.addListener("show", function(){
            //obj.mainForm.reset();
            obj.center();
            if (obj.updateState && obj.updateRecord != null){
                obj.mainForm.loadRecord(obj.updateRecord);
            }
        });
        if (this.needButtons) {
            this.buttons = [new Ext.Button({
                text: '确定',
                minWidth: 70,
                handler: function(){
                    if (obj.mainForm.isValid()) {
                        // 弹出效果
                        Ext.MessageBox.show({
                            msg: '正在保存，请稍等...',
                            progressText: 'Saving...',
                            width: 300,
                            wait: true,
                            icon: 'download',
                            animEl: 'saving'
                        });
                        setTimeout(function(){
                            Ext.MessageBox.hide();
                        }, 300000);
                        obj.mainFormSubmitFunc();
                        
                    }
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(){
                    obj.mainForm.reset();
                    if (obj.updateState && obj.updateRecord != null){ 
                        obj.mainForm.loadRecord(obj.updateRecord);
                    }
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
                    obj.close();
                }
            })];
        }
    },
    mainFormSubmitFunc: function(sucessFuncs,parms,url){
    	var sucessFunc="";
    	if(sucessFuncs != null && sucessFuncs !=''&& sucessFuncs != "undefined"){
    		if(Ext.isIE == true ){
                sucessFunc= sucessFuncs.replace(/\r\n/ig,"\\r\\n");
            }
            else{
                sucessFunc= sucessFuncs.replace(/\n/ig,"\\n");
            }
        }
        var obj = this;
        if (parms != null) {
            Ext.Ajax.request({
                url: url,
                method: "POST",
                params: parms,
                success: function(form, action){
                    var objJson = Ext.util.JSON.decode(form.responseText);
                    var falg = objJson.success;
                    if (falg == true) {
                        if (sucessFunc == null || sucessFunc=='') {
							Ext.Msg.alert("温馨提示", "操作成功了!");
						}
						else {
							eval(sucessFunc);
						}
						
						if(obj.closeAction == 'close'){
						    obj.close();
						}
						else{
						    obj.hide();
						}
						if(obj.displayStore!=''){
							obj.displayStore.reload();
						}
                    }
                    else {
						if (obj.info == "对不起，您没有登录！") {
							Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
								window.location.href = "login.htm";
							});
						}
						else{ 
							Ext.Msg.alert('温馨提示', objJson.info);
						}
					}
                        
                },
                failure: function(form, action){
                    var objJson = Ext.util.JSON.decode(action.response.responseText);
                    if (!objJson.success && objJson.info == "对不起，您没有登录！") {
						Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
							window.location.href = "login.htm";
						});
					}
					else{
						Ext.Msg.alert('温馨提示', objJson.info);
					}
                }
            });
        }
		else {
			obj.mainForm.submit({
				url: obj.updateURL,
				method: "POST",
				success: function(form, action){
					var objJson = Ext.util.JSON.decode(action.response.responseText);
					var falg = objJson.success;
					if (falg == true) {
						if (sucessFunc == null || sucessFunc=='') {
							Ext.Msg.alert("温馨提示", "操作成功了!");
						}
						else {
							eval(sucessFunc);
						}
						if(obj.closeAction == 'close'){
						    obj.close();
						}
						else{
						    obj.hide();
						}
						if(obj.displayStore!=''){
							obj.displayStore.reload();
						}
					}
					else {
						if (obj.info == "对不起，您没有登录！") {
							Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
								window.location.href = "login.htm";
							});
						}
						else{
							Ext.Msg.alert('温馨提示', objJson.info);
						}
					}
				},
				failure: function(form, action){
					var objJson = Ext.util.JSON.decode(action.response.responseText);
					if (!objJson.success && objJson.info == "对不起，您没有登录！") {
						Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
							window.location.href = "login.htm";
						});
					}
					else{
						Ext.Msg.alert('温馨提示', objJson.info);
					}
				}
			});
		}
    },
   listeners:{
		"show": function(){
			this.center();
		}
	}
});
Ext.reg('CommonWindowsOriginal', WXTL.Widgets.CommonWindows.WindowOriginal);
//===================================================================================================CommonPanel
Ext.namespace("WXTL.Widgets.CommonPanel");
/**************************************************************************************************************
 * 控件类别：Panel
 * 功能描述：CheckBoxGroupPanel
 ***************************************************************************************************************/
WXTL.Widgets.CommonPanel.CheckBoxGroupPanel = Ext.extend(Ext.Panel, {
    store: null,
    defaultItemsName: '',
    defaultItemsboxLable: '',
    loadingText: 'Loading...',
    layout: 'form',
    title: '',
    loadingMask: null,
    needButton: true,
    // 配置连接
    boxLabelText:'',
    initComponent: function(){
        WXTL.Widgets.CommonPanel.CheckBoxGroupPanel.superclass.initComponent.call(this);
    },
    onRender: function(H, F){
        var obj = this;
        if (this.store) {
            this.store.on('load', this.onLoad, this);
        };
        if(this.needButton){
        	this.add(
        		new Ext.Panel({
        			layout:'column',
        			items: [{
        				columnWidth: .15 ,
        				items: [new Ext.form.Label({
        					style: "color:red;font-weight:normal",
        					text: this.name
        				})]
        			},{
        				columnWidth: .08 ,
        				items: [new Ext.Button({
        					text: " 全选 ",
        					listeners: {
        						"click": function(){
        							obj.setAll(true);
        						}
        					}
        				})]
        			},{
        				columnWidth: .1,
        				items: [new Ext.Button({
        					text: " 全不选 ",
        					listeners: {
        					"click": function(){
								obj.setAll(false);
							}
        				}
        				})]
        			},{
        				columnWidth: .1,
        				items: [new Ext.Button({
        					text: " 反选 ",
        					listeners: {
        						"click": function(){
								obj.invert();
							}
        				}
        			})]
        		}]
        	}));
        }
        WXTL.Widgets.CommonPanel.CheckBoxGroupPanel.superclass.onRender.call(this, H, F);
    },
    // private
    initEvents: function(){
        WXTL.Widgets.CommonPanel.CheckBoxGroupPanel.superclass.initEvents.call(this);
        //        if(this.loadMask){
        //            this.loadMask = new Ext.LoadMask(this.bwrap,
        //                    Ext.apply({store:this.store}, this.loadMask));
        //        }
    },
    // private
    onLoad: function(){
        var count = this.store.getCount();
        var myCheckboxItems = [];
        var columsTemp = this.numcolumns;
		if(count<this.numcolumns){
			columsTemp = count;
		}
		if (count == 0) {
			columsTemp=1;
            myCheckboxItems.push({
                boxLabel: this.defaultItemsboxLable,//"该通道组下面没有客户组，请选择其他通道组！",
                name: this.defaultItemsName,
                disabled: true
            });
		}
		else {
			if (count > 500){
				Ext.Msg.alert("温馨提示", "CheckBoxGroup控件最多显示500个数据项，请谅解!");
			}
			else{
				for (var i = 0; i < count; i++) {
					if (i < 501) {
						var boxLabel = this.store.getAt(i).data.boxLabel;
						var inputValue = this.store.getAt(i).data.inputValue;
						var checked = this.store.getAt(i).data.checked;
						var parentId = this.store.getAt(i).data.parentId == null? "" : this.store.getAt(i).data.parentId;
						if(parentId != ""){
							if(parentId == "-1"){
								myCheckboxItems.push({
									boxLabel: boxLabel,
									name: this.defaultItemsName,
									inputValue: inputValue,
									checked:checked
								});
								if(this.boxLabelText != ""){
									var objGroup = this;
									myCheckboxItems.push({
										xtype:'label',
										height:25,
										//style:"padding:5px 0 5px 0",
										html:this.boxLabelText.replace(/{inputValue}/g,inputValue).replace(/{boxLabel}/g,boxLabel)
									});
								}
							}
							else{
								//this.boxLabelText = "  <img src='jspack/product/common/Images/file-remove.gif' qtip='删除模块' onclick='Js.Center.System.Deployment.NodeConfig.AddModule(\"{inputValue}\",\"{boxLabel}\",\"delete\")'/>  <img src='jspack/product/common/Images/icons/edit.png' qtip='修改模块名称' onclick='Js.Center.System.Deployment.NodeConfig.AddModule(\"{inputValue}\",\"{boxLabel}\",\"update\")'/> <a href='#' onclick='Js.Center.System.Deployment.ModuleConfig.func(\"{inputValue}\",\"{boxLabel}\",\""+row.data.numtaskid+"\") '>配置</a> ";
								var boxLableTextChild = this.boxLabelText.replace("添加", "删除").replace("file-add.gif", "file-remove.gif").replace("add", "delete");
								//var index = this.store.find("inputValue",parentId);
//								myCheckboxItems.push({
//									xtype:'label',
//									height:27,
//									style:"padding:2px 0 0 20px",
//									text: boxLabel
//								});
//								if(this.boxLabelText != ""){
//									var objGroup = this;
//									myCheckboxItems.push({
//										xtype:'label',
//										height:25,
//										//style:"padding:5px 0 5px 0",
//										html:boxLableTextChild.replace(/{inputValue}/g,inputValue).replace(/{boxLabel}/g,boxLabel)
//									});
//								}
								myCheckboxItems.push({
									//hidden:true,
									boxLabel: boxLabel,
									name: this.defaultItemsName,
									inputValue: inputValue,
									style:"padding:2px 0 0 20px",
									checked:true
								});
								if(this.boxLabelText != ""){
									var objGroup = this;
									myCheckboxItems.push({
										//hidden:true,
										xtype:'label',
										height:25,
										//style:"padding:5px 0 5px 0",
										html:boxLableTextChild.replace(/{inputValue}/g,inputValue).replace(/{boxLabel}/g,boxLabel)
									});
								}
							}
//							if(this.store.getAt(i).json.data != null){
//								for(var j = 0; j<this.store.getAt(i).json.totalCount-1; j++){
//									var boxLabelChild = this.store.getAt(i).json.data[j].taskname;
//									var inputValueChild = this.store.getAt(i).json.data[j].programid;
//									var checkedChild = this.store.getAt(i).json.data[j].ischecked;
//									var parentIdChild = this.store.getAt(i).json.data[j].parentId == null? "" : this.store.getAt(i).json.data[j].parentId;
//									
//									myCheckboxItems.push({
//										xtype:'label',
//										height:25,
//										style:"padding:0 0 0 20px",
//										text: boxLabelChild
//									});
//									if(this.boxLabelText != ""){
//										var objGroup = this;
//										myCheckboxItems.push({
//											xtype:'label',
//											height:25,
//											//style:"padding:5px 0 5px 0",
//											html:this.boxLabelText.replace(/{inputValue}/g,inputValueChild).replace(/{boxLabel}/g,boxLabelChild)
//										});
//									}
//								}
//								
//							}
							
							
						}
						else{
							myCheckboxItems.push({
								boxLabel: boxLabel,
								name: this.defaultItemsName,
								inputValue: inputValue,
								checked:checked
							});
							if(this.boxLabelText != ""){
								//var objGroup = this;
								myCheckboxItems.push({
									xtype:'label',
									height:25,
									//style:"padding:5px 0 5px 0",
									html:this.boxLabelText.replace(/{inputValue}/g,inputValue).replace(/{boxLabel}/g,boxLabel)
								});
							}
						}
					}
				}
			}
		}
		if(Ext.isIE){
			this.remove(this.id + "CheckboxGroup");
			this.remove("x-form-el-" + this.id + "CheckboxGroup");
		}
		else{
			this.remove(this.id + "CheckboxGroup");
		}
		
        this.add(new Ext.form.CheckboxGroup({
            id: this.id + "CheckboxGroup",
            columns: columsTemp,
			hideLabel:true,
            style: "padding:0px 5px 5px 5px",
            anchor: '95%',
			msgTarget: "side",
            allowBlank: this.allowBlank,//false,
            blankText: this.blankText,
            items: myCheckboxItems
        }));
        this.doLayout();
    },
    invert: function(){
        this.items.items[1].items.each(function(c){
            if (!c.disabled) {
                c.setValue(!c.checked);
            }
        }, this);
    },
    setAll: function(v){
        this.items.items[1].items.each(function(c){
            if (c.setValue && !c.disabled) {
                c.setValue(v);
            }
        }, this);
    },
	reset: function(){
		//this.store.reload();
		//this.onLoad();
		this.setAll(false);
		this.items.items[1].reset();
	}
});
Ext.reg('CheckBoxGroupPanel', WXTL.Widgets.CommonPanel.CheckBoxGroupPanel);
/**************************************************************************************************************
 * 控件类别：Panel
 * 功能描述：显示查询条件的Panel
 ***************************************************************************************************************/
//Ext.namespace("wxtl.widgets.formpanel");
WXTL.Widgets.CommonPanel.QueryFormPanel = Ext.extend(Ext.FormPanel, {
    title: '查询条件',
    anchor: '100%',
    labelWidth: 80,
    collapsed: false,
    frame: true,
    labelSeparator: '：',
    height: 150,
    layout:'fit',
    //查询按钮触发方法名称
    queryMethod: "",
    needButtons: true,
	buttonAlign:"center",
    initComponent: function(){
        this.initStructure();
        WXTL.Widgets.CommonPanel.QueryFormPanel.superclass.initComponent.call(this);
    },
    onRender: function(ct, position){
        WXTL.Widgets.CommonPanel.QueryFormPanel.superclass.onRender.call(this, ct, position);
    },
    initStructure: function(){
        var obj = this;
        if (obj.needButtons) {
            this.buttons = [new Ext.Button({
                text: '查询',
                handler: function(){
                    obj.doQuery();
                }
            }), new Ext.Button({
                text: '重置',
                handler: function(){
                    obj.getForm().reset();
                }
            })];
        }
    },
    doQuery: function(){
       eval(this.queryMethod + "()");
    }
});
Ext.reg('queryFormPanel', WXTL.Widgets.CommonPanel.QueryFormPanel);
/**************************************************************************************************************
 * 控件类别：Panel
 * 功能描述：大文件上传Panel
 ***************************************************************************************************************/
//Ext.namespace("wxtl.widgets.formpanel");
WXTL.Widgets.CommonPanel.UploadLargeFilePanel = Ext.extend(Ext.Panel, {
    title: '',
	id: '',
    anchor: '100%',
    labelWidth: 80,
    frame: true,
	autoScroll:true,
    //height: 235,
	//浏览客户端文件ButtonText
	buttonClientText:'客户端文件',
	//浏览服务器端文件ButtonText
	buttonServerText:'服务器端文件',
	//客户端文件控件name,用于后台接受参数
	//fileClientName:'mobilefile',
	//获取服务器端文件地址
	url:'/url/upload.ashx',
	//服务器端文件数据源
	gridStore:'',
	//grid显示列
	cmGrid: '',
	//文件信息文本框高度
	txtMsgHeight: 150,
	//客户端文件控件lable帮助说明信息
	fieldlableFile:WXTL.Common.help.MOBILEFILE,
	items:null,
	filedialog:null,
	//是否需要大文件
	needLargfile:true,
	//允许上传的文件格式,多个用","隔开
	permittedFileExtensions:['txt'],
    initComponent: function(){
		var obj = this;
        this.initStructure(obj);
        WXTL.Widgets.CommonPanel.UploadLargeFilePanel.superclass.initComponent.call(this);
    },
    onRender: function(ct, position){
        WXTL.Widgets.CommonPanel.UploadLargeFilePanel.superclass.onRender.call(this, ct, position);
    },
    initStructure: function(obj){
        //var obj = this;
    	if(obj.needLargfile){
    		obj.items = [{
    			layout: 'column',
                defaults: {
                    anchor: '100%',
    				bodyStyle: 'padding:2px 0 0 5px;'
                },
    			items:[{
    				columnWidth:.8,
    				layout:'form',
    				border:false,
    				defaults: {
                        anchor: '100%'
                    },
    				items:[{
    					xtype: 'hidden',
    					name: 'filebyservice',
    					id: obj.id + "FileByService",
    					value:'0'//0 普通上传 1 大文件上传
    				},{
    					xtype: 'hidden',
    					//hidden:true,
    					//hideLabel: true,
    					//visible:false,
    					name: 'vc2loadfilename',
    					id: obj.id + "LoadFileName",
    					value:''//普通上传可以为空, 大文件上传为选择的文件名 
    				},{
    					xtype: 'fileuploadfield',
    					id: obj.id + 'ClientFile',
    					name: 'mobilefile',
    					buttonText:obj.buttonClientText,
                		fieldLabel: obj.fieldlableFile,//WXTL.Common.help.MOBILEFILE,
                		//allowBlank: false,
                		//blankText: "请选择上传文件",
    					buttonClickFunc: function(){
    						document.getElementById(obj.id + "FileByService").value=0;
    					},
    					msgTarget: 'qtip',//'under',
                        validator: function(){
                            var filePath = document.getElementById(obj.id + "ClientFile").value;
    						document.getElementById(obj.id + "ClientFileName").value = escape(filePath);
                            if (filePath != '') {
                                document.getElementById(obj.id +"FileMessage").value = getFileMessage(filePath);
                                if (checkFile(filePath) != '') {
                                    this.invalidText = checkFile(filePath);
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }
                            else 
                                return false;
                        }
    				}]
    			},{
    				columnWidth:.2,
    				layout:'form',
    				border:false,
    				items:[{
    					xtype: 'button',
    					text:obj.buttonServerText,
    					handler: function(){
    					    document.getElementById(obj.id + "FileByService").value=1;
    					    //document.getElementById(obj.id + "ClientFile").value="";
    						obj.items.items[0].items.items[0].items.items[2].reset();
    						document.getElementById(obj.id + "FileMessage").value="";
    						document.getElementById(obj.id + "ClientFileName").value="";
    						
    						if (WXTL.Widgets.CommonWindows.dialog == null) {
    							WXTL.Widgets.CommonWindows.dialog = new Ext.ux.UploadDialog.Dialog({
    								title: "服务器端文件",
    								modal: true,
    								url: '/URL/upload.ashx',//obj.url,//'URL/test.aspx',
    								tfFileName: obj.id,
    								//gridStore: obj.gridStore,
    								//cmGrid: obj.cmGrid,
    								permitted_extensions: obj.permittedFileExtensions,//['txt'],
    								reset_on_hide: false,
    								allow_close_on_upload: true,
    								upload_autostart: true
    							});
    							
    						}
    						
    						obj.filedialog = WXTL.Widgets.CommonWindows.dialog;
    						obj.filedialog.tfFileName = obj.id;
    						if (!obj.filedialog.is_uploading) {
    							if (obj.filedialog.gridStore != "") {
    								obj.filedialog.gridStore.reload();
    							}
    							
    						}
    						obj.filedialog.show();
    						obj.filedialog.updateToolbar();
    						//obj.filedialog.updateToolbar();
    					}
    				}]
    			},{
    				columnWidth:1,
    				layout:'form',
    				border:false,
    				defaults: {
                        anchor: '95%'
                    },
                    items: [{
                        xtype: 'textarea',
                        name: 'filemessage',
                        id: obj.id + "FileMessage",
                        fieldLabel: '文件信息',
                        readOnly: true,
    					allowBlank: false,
    					blankText:'请选择文件！',
                        //width: 400,
                        height: obj.txtMsgHeight
                    },{
                        xtype: 'hidden',
                        name: 'vc2clientfilename',
                        id: obj.id + "ClientFileName"
                    }]
    			}]
    		}];
    	}
    	else{
    		obj.items = [{
    			layout: 'column',
                defaults: {
                    anchor: '100%',
    				bodyStyle: 'padding:2px 0 0 5px;'
                },
    			items:[{
    				columnWidth:.8,
    				layout:'form',
    				border:false,
    				defaults: {
                        anchor: '100%'
                    },
    				items:[{
    					xtype: 'hidden',
    					name: 'filebyservice',
    					id: obj.id + "FileByService",
    					value:'0'//0 普通上传 1 大文件上传
    				},{
    					xtype: 'hidden',
    					//hidden:true,
    					//hideLabel: true,
    					//visible:false,
    					name: 'vc2loadfilename',
    					id: obj.id + "LoadFileName",
    					value:''//普通上传可以为空, 大文件上传为选择的文件名 
    				},{
    					xtype: 'fileuploadfield',
    					id: obj.id + 'ClientFile',
    					name: 'mobilefile',
    					buttonText:obj.buttonClientText,
                		fieldLabel: obj.fieldlableFile,//WXTL.Common.help.MOBILEFILE,
                		//allowBlank: false,
                		//blankText: "请选择上传文件",
    					buttonClickFunc: function(){
    						document.getElementById(obj.id + "FileByService").value=0;
    					},
    					msgTarget: 'qtip',//'under',
                        validator: function(){
                            var filePath = document.getElementById(obj.id + "ClientFile").value;
    						document.getElementById(obj.id + "ClientFileName").value = escape(filePath);
                            if (filePath != '') {
                                document.getElementById(obj.id +"FileMessage").value = getFileMessage(filePath);
                                if (checkFile(filePath) != '') {
                                    this.invalidText = checkFile(filePath);
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }
                            else 
                                return false;
                        }
    				}]
    			},{
    				columnWidth:.2,
    				layout:'form',
    				border:false,
    				items:[{
    					xtype: 'hidden',
    					fieldLabel:"隐藏大文件"
    					
    				}]
    			},{
    				columnWidth:1,
    				layout:'form',
    				border:false,
    				defaults: {
                        anchor: '95%'
                    },
                    items: [{
                        xtype: 'textarea',
                        name: 'filemessage',
                        id: obj.id + "FileMessage",
                        fieldLabel: '文件信息',
                        readOnly: true,
    					allowBlank: false,
    					blankText:'请选择文件！',
                        //width: 400,
                        height: obj.txtMsgHeight
                    },{
                        xtype: 'hidden',
                        name: 'vc2clientfilename',
                        id: obj.id + "ClientFileName"
                    }]
    			}]
    		}];
    	}
		
    }
});
Ext.reg('UploadLargeFilePanel', WXTL.Widgets.CommonPanel.UploadLargeFilePanel);
/**********************************************************************************************************
 * 控件类型：panel
 * 描述：自定义tab下主panel
 **********************************************************************************************************/
Ext.namespace("wxtl.widgets.panel");
WXTL.Widgets.CommonPanel.MainPanel = Ext.extend(Ext.Panel, {
    refreshlist: "",
    frame: true, // 渲染面板
    bodyBorder: false,
    border: false,
    autoScroll: true, // 自动显示滚动条

    layout: "anchor",
    defaults: {
        collapsible: true // 允许展开和收缩

    },
    initComponent: function(){
        WXTL.Widgets.CommonPanel.MainPanel.superclass.initComponent.call(this);
        this.addListener("activate", function(){
            if (refreshlist != "") {
				//window.alert("biao");
                eval(refreshlist+".reload()");
            }
        });
    }
});
Ext.reg('mainpanel', WXTL.Widgets.CommonPanel.MainPanel);
/**************************************************************************************************************
 * 控件类别：Panel
 * 功能描述：预览彩信panel
 ***************************************************************************************************************/
 
WXTL.Widgets.CommonPanel.MMSpanel = Ext.extend(Ext.Panel, {
    frame: true, // 渲染面板
    autoScroll: true, // 自动显示滚动条
    layout: "anchor",
    currFrame: 0,
    brotherPanel: null,
    contentJson: null,
    mmsSpace: 0,
    currFrameSpace: 0,
    initComponent: function(){
        this.initStructure();
        WXTL.Widgets.CommonPanel.MMSpanel.superclass.initComponent.call(this);
    },
    onRender: function(ct, position){
        WXTL.Widgets.CommonPanel.MMSpanel.superclass.onRender.call(this, ct, position);
    },
    refreshAll: function(){
        var obj = this;
        obj.getResourceSpace();
        obj.setTitle(formatString("预览：第{0}帧{1},共{2}", new Array(obj.currFrame + 1, Ext.util.Format.fileSize(obj.currFrameSpace), Ext.util.Format.fileSize(obj.mmsSpace))));
   
//   if(obj.contentJson.frame[obj.currFrame] == undefined)
//   {
//        if (obj.contentJson.frame[0].vc2image.vc2rescurl == "") {
//            obj.body.update(formatString(MMSNoImageFrameString, new Array(obj.contentJson.frame[0].vc2word.vc2rescdesc1.replace(/\r\n/ig,"<br/>"))));
//        }
//        else {
//            obj.body.update(formatString(MMSFrameString, new Array(obj.contentJson.frame[0].vc2image.vc2rescurl, obj.contentJson.frame[0].vc2word.vc2rescdesc1.replace(/\r\n/ig,"<br/>"))));
//        }
// 
//   
//   }
//   else 
//   {
        if (obj.contentJson.frame[obj.currFrame].vc2image.vc2rescurl == "") {
            obj.body.update(formatString(MMSNoImageFrameString, new Array(obj.contentJson.frame[obj.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig,"<br/>"))));
        }
        else {
            obj.body.update(formatString(MMSFrameString, new Array(obj.contentJson.frame[obj.currFrame].vc2image.vc2rescurl, obj.contentJson.frame[obj.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig,"<br/>"))));
        }
 
   
   //}
       
        
        
        if (obj.mmsSpace > 5340400){ 
            Ext.Msg.alert("温馨提示", "彩信不能大于50K!");
        }
    },
    refreshBrotherPanel: function(i){
        var obj = this;
        if (obj.brotherPanel != null) {
            if (i != null) {
                obj.brotherPanel.currFrame = i;
            }
            else {
                obj.brotherPanel.currFrame = obj.currFrame;
            }
            obj.brotherPanel.refreshAll();
            obj.brotherPanel.doLayout();
        }
    },
    getResourceSpace: function(){
        var obj = this;
        var frameNum = obj.contentJson.frame.length;
        obj.mmsSpace = 0;
        for (var i = 0; i < frameNum; i++) {
            var temObj = obj.contentJson.frame[i];
            if (i == obj.currFrame) {
                obj.currFrameSpace = (temObj.vc2word.numrescspace==""?0:parseInt(temObj.vc2word.numrescspace)) + (temObj.vc2image.numrescspace==""?0:parseInt(temObj.vc2image.numrescspace)) + (temObj.vc2backmusic.numrescspace==""?0:parseInt(temObj.vc2backmusic.numrescspace));
            };
            obj.mmsSpace = parseInt(obj.mmsSpace) + (temObj.vc2word.numrescspace==""?0:parseInt(temObj.vc2word.numrescspace)) + (temObj.vc2image.numrescspace==""?0:parseInt(temObj.vc2image.numrescspace)) + (temObj.vc2backmusic.numrescspace==""?0:parseInt(temObj.vc2backmusic.numrescspace));
        }
    },
    //==========播放停止专用方法
    stopCurrFrame:function (){
        var obj = this;
        currMMSPanel = obj;
        
        obj.getBottomToolbar().items.items[0].setText("播放");
        obj.getBottomToolbar().items.items[4].disable();
        obj.getBottomToolbar().items.items[8].disable();
		if (obj.brotherPanel != null) {
            obj.brotherPanel.enable();
        }

        window.clearInterval(playTime);
        currMMSPanel.refreshBrotherPanel();
        if (currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2image.vc2rescurl == "") {
            currMMSPanelRender(formatString(MMSNoImageFrameString, new Array(currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig,"<br/>"))), formatString("预览：第{0}帧{1}, 共{2}", new Array(currMMSPanel.currFrame + 1, Ext.util.Format.fileSize(currMMSPanel.currFrameSpace), Ext.util.Format.fileSize(currMMSPanel.mmsSpace))));
        }
        else {
            currMMSPanelRender(formatString(MMSFrameString, new Array(currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2image.vc2rescurl, currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig,"<br/>"))), formatString("预览：第{0}帧{1}, 共{2}", new Array(currMMSPanel.currFrame + 1, Ext.util.Format.fileSize(currMMSPanel.currFrameSpace), Ext.util.Format.fileSize(currMMSPanel.mmsSpace))));
        }
    
    },
    initStructure: function(){
        var obj = this;
        if (obj.brotherPanel != null) {
            obj.contentJson = obj.brotherPanel.contentJson;
        }
        currMMSPanel = obj;
        obj.getResourceSpace();
        if (obj.contentJson.frame[obj.currFrame].vc2image.vc2rescurl == "") {
            obj.html = formatString(MMSNoImageFrameString, new Array(obj.contentJson.frame[obj.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig,"<br/>")));
        }
        else {
            obj.html = formatString(MMSFrameString, new Array(obj.contentJson.frame[obj.currFrame].vc2image.vc2rescurl, obj.contentJson.frame[obj.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig,"<br/>")));
        }
        obj.title = formatString("预览：第{0}帧{1},共{2}", new Array(obj.currFrame + 1, Ext.util.Format.fileSize(obj.currFrameSpace), Ext.util.Format.fileSize(obj.mmsSpace)));
        obj.bbar = [{
            iconCls: "playicon",
            text: '播放',
            handler: function(){
                if (this.text == "播放") {
                    currMMSPanel = obj;
                    this.setText("停止");
                    obj.getBottomToolbar().items.items[4].enable();
                    obj.getBottomToolbar().items.items[8].enable();
                    if (obj.brotherPanel != null) {
                        obj.brotherPanel.disable();
                    }
                    
                    previewMMS(-1);
                }
                else {
                    this.setText("播放");
                    obj.getBottomToolbar().items.items[4].disable();
                    obj.getBottomToolbar().items.items[8].disable();
					if (obj.brotherPanel != null) {
                        obj.brotherPanel.enable();
                    }
                    window.clearInterval(playTime);
                    currMMSPanel.refreshBrotherPanel();
                    if (currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2image.vc2rescurl == "") {
                        currMMSPanelRender(formatString(MMSNoImageFrameString, new Array(currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig,"<br/>"))), formatString("预览：第{0}帧{1}, 共{2}", new Array(currMMSPanel.currFrame + 1, Ext.util.Format.fileSize(currMMSPanel.currFrameSpace), Ext.util.Format.fileSize(currMMSPanel.mmsSpace))));
                    }
                    else {
                        currMMSPanelRender(formatString(MMSFrameString, new Array(currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2image.vc2rescurl, currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig,"<br/>"))), formatString("预览：第{0}帧{1}, 共{2}", new Array(currMMSPanel.currFrame + 1, Ext.util.Format.fileSize(currMMSPanel.currFrameSpace), Ext.util.Format.fileSize(currMMSPanel.mmsSpace))));
                    }
                }
            }
        }, "", "-", "", {
            iconCls: "x-tbar-page-prev",
            text: '上一帧',
            disabled: true,
            handler: function(){
                if (playCurrFrameNum > 0) {
                    playCurrFrameNum = playCurrFrameNum - 1;
                    obj.currFrame = playCurrFrameNum;
                    window.clearInterval(playTime);
                    previewMMS(playCurrFrameNum - 1);
                    obj.refreshAll();
                    obj.render();
                    obj.refreshBrotherPanel();
                }
                else {
                    Ext.Msg.alert("温馨提示", "已经是第一帧!");
                }
                //                if (obj.currFrame > 0) {
                //                    obj.currFrame = obj.currFrame - 1;
                //                    obj.refreshAll();
                //                    obj.render();
                //                    obj.refreshBrotherPanel();
                //                }
                //                else {
                //                    Ext.Msg.alert("温馨提示", "已经是第一帧!");
                //                }
            }
        }, "", "-", "", {
            iconCls: "x-tbar-page-next",
            text: '下一帧',
            disabled: true,
            handler: function(){
                if (playCurrFrameNum + 1 < obj.contentJson.frame.length) {
                    playCurrFrameNum = playCurrFrameNum + 1;
                    obj.currFrame = playCurrFrameNum;
                    window.clearInterval(playTime);
                    previewMMS(playCurrFrameNum - 1);
                    obj.refreshAll();
                    obj.render();
                    obj.refreshBrotherPanel();
                }
                else {
                    Ext.Msg.alert("温馨提示", "已经是最后一帧!");
                }
                //                if (obj.currFrame + 1 < obj.contentJson.frame.length) {
                //                    obj.currFrame = obj.currFrame + 1;
                //                    obj.refreshAll();
                //                    obj.render();
                //                    obj.refreshBrotherPanel();
                //                }
                //                else {
                //                    Ext.Msg.alert("温馨提示", "已经是最后一帧!");
                //                }
            }
        }];
    }
});
Ext.reg('MMSpanel', WXTL.Widgets.CommonPanel.MMSpanel);
/**************************************************************************************************************
 * 控件类别：Panel
 * 功能描述：彩信帧列表panel（按帧）
 ***************************************************************************************************************/
WXTL.Widgets.CommonPanel.MMSFramePanel = Ext.extend(Ext.Panel, {
    frame: true, // 渲染面板
    layout: 'absolute',
    currFrame: 0,
    frameWidth: 104,
    frameHeight: 127,
    increment: 5,
    itemStartX: 5,
    itemStartY: 5,
    store: null,
    bodyWidth: 0,
    brotherPanel: null,
    contentJson: null,
    
    newFrame: {
        numframeid: 1,
        numframeorder: 1,
        numframetime: 5,
        vc2framename: "",
        vc2framedesc: "",
        vc2word: {
            numrescid: 1,
            numframeid: 1,
            vc2rescurl: '',
            vc2rescname: '',
            numtype: '3',
            numrescspace: 0,
            vc2rescdesc1: '',
            numrescdesc2: ''
        },
        vc2image: {
            numrescid: 1,
            numframeid: 1,
            vc2rescurl: '',
            vc2rescname: '',
            numtype: '1',
            numrescspace: 0,
            vc2rescdesc1: '',
            numrescdesc2: ''
        },
        vc2backmusic: {
            numrescid: 1,
            numframeid: 1,
            vc2rescurl: '',
            vc2rescname: '',
            numtype: '2',
            numrescspace: 0,
            vc2rescdesc1: '',
            numrescdesc2: ''
        }
    },
    initComponent: function(){
        this.initStructure();
        WXTL.Widgets.CommonPanel.MMSFramePanel.superclass.initComponent.call(this);
        this.addEvents('afterRefresh');
    },
    initEvents: function(){
        WXTL.Widgets.CommonPanel.MMSFramePanel.superclass.initEvents.call(this);
        this.dd = new WXTL.Widgets.CommonPanel.MMSFramePanel.DropZone(this, this.dropConfig);
    },
    
    beforeDestroy: function(){
        if (this.dd) {
            this.dd.unreg();
        }
        WXTL.Widgets.CommonPanel.MMSFramePanel.superclass.beforeDestroy.call(this);
    },
    onRender: function(ct, position){
        this.refreshAll();
        WXTL.Widgets.CommonPanel.MMSFramePanel.superclass.onRender.call(this, ct, position);
    },
    refreshAll: function(flag, json){
    
        var obj = this;
        if (json == null) {
            json = obj.contentJson;
        }
        obj.setTitle(formatString("帧列表(第{0}帧,共{1}帧)", new Array(obj.currFrame + 1, json.frame.length)));
        var frameNum = json.frame.length;
        if (flag == null) {
            if (obj.currFrame > 2 && obj.currFrame + 3 < frameNum){ 
                obj.itemStartX = 5 - (obj.currFrame - 3) * (obj.frameWidth + obj.increment);
            }
            else{
            	if (obj.currFrame < 2 || frameNum <= 7) {
                    obj.itemStartX = 5;
                }
                else{ 
                    if (obj.currFrame + 3 >= frameNum) {
                        obj.itemStartX = 5 - (frameNum - 7) * (obj.frameWidth + obj.increment);
                    }
                }
            } 
                
        }
        obj.bodyWidth = (obj.frameWidth + obj.increment) * frameNum;
        obj.removeAll();
        for (var i = 0; i < frameNum; i++) {
            var htmlFrame = MMSFrameSimpleStrNoImage;
            if (i == 0) {
                var xNum = obj.itemStartX;
            }
            else {
                xNum = obj.itemStartX + i * (obj.frameWidth + 5);
            }
            if (obj.currFrame == i) {
                var titleStr = formatString("第{0}帧({1}秒)<img src='jspack/product/common/Images/drop-yes.gif' align=AbsMiddle width=15 />", new Array((i + 1), json.frame[i].numframetime));
            }
            else {
                titleStr = formatString("第{0}帧({1}秒)", new Array((i + 1), json.frame[i].numframetime));
            }
            if (json.frame[i].vc2image.vc2rescurl != "") {
                htmlFrame = formatString(MMSFrameSimpleStr, new Array(json.frame[i].vc2image.vc2rescurl, 1));
            }
            else {
                htmlFrame = MMSFrameSimpleStrNoImage;
            }
            obj.add(new Ext.Panel({
                //id: "MMSFramePanel" + i,
                width: obj.frameWidth,
                height: obj.frameHeight,
                x: xNum,
                y: obj.itemStartY,
                frame: true, // 渲染面板
                itemIndex: i,
                margins: '3 3 3 3',
                title: titleStr,
                draggable: {
                    insertProxy: false
                },
                html: htmlFrame,//formatString(MMSFrameSimpleStr, new Array(json.frame[i].vc2image.vc2rescurl, 1)),
                listeners: {
                    render: function(c){
                        c.el.on('mouseover', function(){
                            c.setPosition(c.x - obj.increment / 2, c.y - obj.increment / 2);
                            c.setSize(obj.frameWidth + obj.increment, obj.frameHeight + obj.increment);
                            //obj.refreshBrotherPanel(c.itemIndex);
                        });
                        c.el.on('mouseout', function(){
                            c.setPosition(c.x + obj.increment / 2, c.y + obj.increment / 2);
                            c.setSize(obj.frameWidth, obj.frameHeight);
                            //obj.refreshBrotherPanel();
                        });
                        c.el.on('click', function(){
                            obj.currFrame = c.itemIndex;
                            obj.refreshAll();
                            obj.doLayout();
                            obj.refreshBrotherPanel();
                        });
                    }
                }
            }));
        };
        
        if(obj.contentJson.frame[obj.currFrame] == undefined){
            this.fireEvent('afterRefresh', obj, obj.contentJson, obj.contentJson.frame[0]); 
        }
        else{
            this.fireEvent('afterRefresh', obj, obj.contentJson, obj.contentJson.frame[obj.currFrame]);
        }
    },
    refreshBrotherPanel: function(i){
        var obj = this;
		if(this.brotherPanel != null){
			if(i != null){
				this.brotherPanel.currFrame = i;
			}
			else {
                this.brotherPanel.currFrame = obj.currFrame;
            }
            this.brotherPanel.contentJson = obj.contentJson;
            this.brotherPanel.refreshAll();
            this.brotherPanel.render();
		}
//        if (currMMSPanel != null) {
//            if (i != null) {
//                currMMSPanel.currFrame = i;
//            }
//            else {
//                currMMSPanel.currFrame = obj.currFrame;
//            }
//            currMMSPanel.contentJson = obj.contentJson;
//            currMMSPanel.refreshAll();
//            currMMSPanel.render();
//        }
    },
    initStructure: function(){
        var obj = this;
        obj.setTitle(formatString("帧列表(第{0}帧,共{1}帧)", new Array(obj.currFrame + 1, obj.contentJson.frame.length)));
        obj.items = new Array();
        obj.bbar = [{
            iconCls: "x-tbar-page-prev",
            text: '向前',
            handler: function(){
                if (obj.itemStartX < 0) {
                    obj.itemStartX = obj.itemStartX + 1 * (obj.frameWidth + obj.increment);
                    obj.refreshAll(false);
                    obj.doLayout();
                }
                else {
                    Ext.Msg.alert("温馨提示", "已经到头了!");
                }
            }
        }, "", "-", "　　　　　　　　　　　　　　　　　　", {
            iconCls: 'addicon',
            text: '添加帧',
            buttonAlign: "center",
            handler: function(){
                if (obj.contentJson.frame.length == 16){
                    Ext.Msg.alert("温馨提示", "添加失败，最多只可有16帧!");
                }
                else {
                    obj.currFrame = obj.contentJson.frame.length;
                    obj.contentJson.frame.push(obj.newFrame);
                    obj.refreshAll();
                    obj.doLayout();
                    obj.refreshBrotherPanel();
                }
            }
        }, "", "-", "", {
            iconCls: 'addicon',
            text: '插入帧',
            handler: function(){
                if (obj.contentJson.frame.length == 16){
                    Ext.Msg.alert("温馨提示", "添加失败，彩信最多可有16帧!");
                }
                else {
                    obj.contentJson.frame.splice(obj.currFrame, 0, obj.newFrame);
                    obj.refreshAll();
                    obj.doLayout();
                    obj.refreshBrotherPanel();
                }
            }
        }, "", "-", "", {
            iconCls: 'deleteicon',
            text: '删除帧',
            handler: function(){
                if (obj.contentJson.frame.length == 1){
                    Ext.Msg.alert("温馨提示", "删除失败，彩信至少要有1帧!");
                }
                else {
                    Ext.Msg.confirm("温馨提示!", "您确定要删除帧信息吗?", function(btn){
                        if (btn == "yes") {
                            obj.contentJson.frame.splice(obj.currFrame, 1);
                            if (obj.currFrame >= obj.contentJson.frame.length) {
                                obj.currFrame = obj.currFrame - 1;
                            }
                            obj.refreshAll();
                            obj.doLayout();
                            obj.refreshBrotherPanel();
                        }
                    });
                }
            }
        }, '->', "", "-", "", {
            iconCls: "x-tbar-page-next",
            text: '向后',
            handler: function(){
                if (obj.itemStartX + obj.bodyWidth > obj.width) {
                    obj.itemStartX = obj.itemStartX - 1 * (obj.frameWidth + obj.increment);
                    obj.refreshAll(false);
                    obj.doLayout();
                }
                else {
                    Ext.Msg.alert("温馨提示", "已经到尾了!");
                }
            }
        }];
    },
    doFrameOver: function(fromPos, toPos){
        var obj = this;
        if (fromPos >= 0 && toPos >= 0 && toPos <= obj.contentJson.frame.length && fromPos <= obj.contentJson.frame.length) {
            var json = obj.contentJson;
            if (fromPos < toPos) {
                var temValue = json.frame.slice(fromPos, fromPos + 1);
                json.frame.splice(toPos + 1, 0, temValue[0]);
                json.frame.splice(fromPos, 1);
                obj.currFrame = toPos;
                obj.refreshAll(false, json);
                obj.doLayout();
                obj.refreshBrotherPanel();
            }
            else{
            	if (fromPos > toPos) {
                    var temValue = json.frame.slice(fromPos, fromPos + 1);
                    json.frame.splice(toPos, 0, temValue[0]);
                    json.frame.splice(fromPos + 1, 1);
                    obj.currFrame = toPos;
                    obj.refreshAll(false, json);
                    obj.doLayout();
                    obj.refreshBrotherPanel();
                }
            } 
                
        }
    },
    moveFrame: function(fromPos, toPos){
        var obj = this;
        if (fromPos >= 0 && toPos >= 0 && toPos <= obj.contentJson.frame.length && fromPos <= obj.contentJson.frame.length) {
            if (fromPos < toPos) {
                var temValue = obj.contentJson.frame.slice(fromPos, fromPos + 1);
                obj.contentJson.frame.splice(toPos + 1, 0, temValue[0]);
                obj.contentJson.frame.splice(fromPos, 1);
                obj.currFrame = toPos;
                obj.refreshAll(false);
                obj.doLayout();
                obj.refreshBrotherPanel();
            }
            else{
            	if (fromPos > toPos) {
                    var temValue = obj.contentJson.frame.slice(fromPos, fromPos + 1);
                    obj.contentJson.frame.splice(toPos, 0, temValue[0]);
                    obj.contentJson.frame.splice(fromPos + 1, 1);
                    obj.currFrame = toPos;
                    obj.refreshAll(false);
                    obj.doLayout();
                    obj.refreshBrotherPanel();
                }
            } 
        }
    }
});
Ext.reg('MMSFramePanel', WXTL.Widgets.CommonPanel.MMSFramePanel);

WXTL.Widgets.CommonPanel.MMSFramePanel.DropZone = function(portal, cfg){
    this.portal = portal;
    Ext.dd.ScrollManager.register(portal.body);
    WXTL.Widgets.CommonPanel.MMSFramePanel.DropZone.superclass.constructor.call(this, portal.bwrap.dom, cfg);
    portal.body.ddScrollConfig = this.ddScrollConfig;
};

Ext.extend(WXTL.Widgets.CommonPanel.MMSFramePanel.DropZone, Ext.dd.DropTarget, {
    ddScrollConfig: {
        vthresh: 50,
        hthresh: -1,
        animate: true,
        increment: 200
    },
    
    createEvent: function(dd, e, data, col, c, pos){
        return {
            portal: this.portal,
            panel: data.panel,
            columnIndex: col,
            column: c,
            position: pos,
            data: data,
            source: dd,
            rawEvent: e,
            status: this.dropAllowed
        };
    },
    
    notifyOver: function(dd, e, data){
        var xy = e.getXY(), portal = this.portal, px = dd.proxy;
        
        // case column widths
        if (!this.grid) {
            this.grid = this.getGrid();
        }
        
        // handle case scroll where scrollbars appear during drag
        var cw = portal.body.dom.clientWidth;
        if (!this.lastCW) {
            this.lastCW = cw;
        }
        else{
        	if (this.lastCW != cw) {
                this.lastCW = cw;
                portal.doLayout();
                this.grid = this.getGrid();
            }
        }
            
        
        // determine items
        var col = 0, p, match = false, pos = 0, c = portal, items = c.items, overSelf = false;
        for (var len = items.length; pos < len; pos++) {
            p = items.items[pos];
            var h = p.el.getWidth();
            if (h === 0) {
                overSelf = true;
            }
            else {
                if ((p.el.getX() + (h / 2)) > xy[0]) {
                    match = true;
                    break;
                }
            }
        }
        pos = (match && p ? pos : c.items.getCount()) + (overSelf ? -1 : 0);
        var overEvent = this.createEvent(dd, e, data, col, c, pos);
        
        if (portal.fireEvent('validatedrop', overEvent) !== false &&
        portal.fireEvent('beforedragover', overEvent) !== false) {
            this.lastPos = {
                c: c,
                col: col,
                p: overSelf || (match && p) ? pos : false
            };
            
            this.currP = c.items.indexOf(dd.panel);
            this.lastP = this.lastPos.p;
            this.scrollPos = portal.body.getScroll();
            portal.fireEvent('dragover', overEvent);
            
            return overEvent.status;
        }
        else {
            return overEvent.status;
        }
    },
    
    notifyOut: function(){
        delete this.grid;
    },
    
    notifyDrop: function(dd, e, data){
        delete this.grid;
        if (!this.lastPos) {
            return;
        }
        var c = this.lastPos.c, col = this.lastPos.col, pos = this.lastPos.p;
        var dropEvent = this.createEvent(dd, e, data, col, c, pos !== false ? pos : c.items.getCount());
        
        if (this.portal.fireEvent('validatedrop', dropEvent) !== false &&
        this.portal.fireEvent('beforedrop', dropEvent) !== false) {
            //            dd.proxy.getProxy().remove();
            this.portal.moveFrame(this.currP, this.lastP);
            
            this.portal.fireEvent('drop', dropEvent);
            
            // scroll position is lost on drop, fix it
            var st = this.scrollPos.top;
            if (st) {
                var d = this.portal.body.dom;
                setTimeout(function(){
                    d.scrollTop = st;
                }, 10);
            }
            
        }
        delete this.lastPos;
        return true;
    },
    
    // internal cache of body and column coords
    getGrid: function(){
        var box = this.portal.bwrap.getBox();
        box.columnX = [];
        this.portal.items.each(function(c){
            box.columnX.push({
                x: c.el.getX(),
                w: c.el.getWidth(),
                y: c.el.getY(),
                h: c.el.getHeight()
            });
        });
        return box;
    },
    
    // unregister the dropzone from ScrollManager
    unreg: function(){
        //Ext.dd.ScrollManager.unregister(this.portal.body);
        WXTL.Widgets.CommonPanel.MMSFramePanel.DropZone.superclass.unreg.call(this);
    }
});



//=============================================================================================CommonGrid
Ext.namespace("WXTL.Widgets.CommonGrid");
WXTL.Widgets.CommonGrid.GridTreePanel = Ext.extend(Ext.grid.EditorGridPanel,{
	title:"查询结果",
	style:'padding:5px 0px 0px 0px',
	frame:true,
	//分页数
    pageSize: 12,
    //是否分页属性，默认true
    needPage: true,
    //是否有菜单栏，默认true
    needMenu: true,
    //是否显示右击菜单，默认true
    needRightMenu: false,
    //表结构
    structure: '1',
    //载入效果
    loadMask: true,
    //stripeRows: true,
    autoExpandColumn: 7,
    // 超过长度带自动滚动条
    autoScroll: true,
    //自适应数据
    autoHeight: true,
    //添加调用方法名称
    inertMethod: '',
    //修改调用方法名称
    updateMethod: '',
    //删除调用方法名称
    deleteMethod: '',
    //修改单字段调用路径

    afterEditURL: '',
    initComponent: function(){
        if (this.structure != '') {
            this.initStructure();
        }
        WXTL.Widgets.CommonGrid.GridPanel.superclass.initComponent.call(this);
        var obj = this;
        for (var i = 1; i <= 10; i++) {
            if (obj.colModel.lookup[i] != null && obj.colModel.lookup[i].editor != null) {
                obj.colModel.lookup[i].editor.addListener("complete", function(){
                    obj.getStore().reload();
                });
            }
        }
    },
    onRender: function(ct, position){
		if(ogrid.getColumnModel().getColumnId(0)!="checker"){
			ogrid.getSelectionModel().singleSelect=true;
		}
        WXTL.Widgets.CommonGrid.GridPanel.superclass.onRender.call(this, ct, position);
		
        
    },
    initStructure: function(){
        var ogrid = this;
		
        this.view = new Ext.grid.GroupingView({
            // 自动填充
            enableGroupingMenu:false,
            forceFit: true,
            sortAscText: '正序排列',
            sortDescText: '倒序排列',
            columnsText: '列显示/隐藏',
            groupByText: '根据本列分组',
            showGroupsText: '是否采用分组显示'
        });
        // 生成分页工具栏
        if (this.needPage) {
            var pagingToolbar = new Ext.PagingToolbar({
                displayInfo: true,
                store: this.store,
                emptyMsg: '没有符合条件的记录',
                //显示右下角信息

                displayInfo: true,
                displayMsg: '当前记录 {0} -- {1} 条 共 {2} 条记录',
                prevText: "上一页",
                nextText: "下一页",
                refreshText: "刷新",
                lastText: "最后页",
                firstText: "第一页",
                beforePageText: "当前页",
                afterPageText: "共{0}页"
            });
            pagingToolbar.pageSize = this.pageSize;
            this.bbar = pagingToolbar;
            this.bottomToolbar = this.bbar;
            
            var oSearch = new Ext.form.TextField({
                id: 'search',
                xtype: 'textfield',
                align: 'right'
            
            });
            
        };
        if (this.needMenu) {
            var keyField = this.keyField;
            // 生成顶部工具条

            var topToolbar = new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "新增",
                    handler: function(){
                        ogrid.doInsert();
                    }
                }, "", "-", "", {
                    iconCls: 'editicon',
                    text: "修改",
                    handler: function(){
                        ogrid.doEdit();
                    }
                }, "", "-", "", {
                    iconCls: 'deleteicon',
                    text: "删除",
                    handler: function(){
                        ogrid.doDelete();
                    }
                }]
            });
            this.tbar = topToolbar;
            this.topToolbar = this.tbar;
        };
        
        if (this.needRightMenu) {
			
            //-------------------------------------------------------右键菜单
            var ServiceCodeClick = new Ext.menu.Menu({
                items: [{
                    text: '新增',
                    iconCls: 'addicon',
                    handler: function(){
                        ogrid.doInsert();
                        ogrid.getStore().reload();
                    }
                }, {
                    text: '修改',
                    iconCls: 'editicon',
                    handler: function(){
                        ogrid.doEdit();
                    }
                }, {
                    text: '删除',
                    iconCls: 'deleteicon',
                    handler: function(){
                        ogrid.doDelete();
                    }
                }, {
                    text: '刷新',
                    iconCls: 'refreshicon',
                    handler: function(){
                        ogrid.getStore().reload();
                    }
                }]
            });
            //===============================================================添加监听事件
            this.addListener("rowcontextmenu", function(grid, rowIndex, e){
                e.stopEvent();
                ServiceCodeClick.showAt(e.getXY());
            });
            this.addListener("afteredit", function(e){
                ogrid.afterEdit(e);
            });
        }
        
    },
    /*
     * @功能：编辑用户选中的数据 @参数：id 为空则为新增数据 不为空则为修改数据

     *
     */
    doInsert: function(){
        eval(this.inertMethod + "()");
    },
    /*
     * @功能：编辑用户选中的数据 @参数：id 为空则为新增数据 不为空则为修改数据

     *
     */
    doEdit: function(id){
        var row = this.getSelectionModel().getSelections();
        if (row.length == 0) {
            Ext.Msg.alert("温馨提示", "请您选择一条记录!");
        }
        else{
        	if (row.length > 1) {
                Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
            }
            else{ 
                if (row.length == 1) {
                    eval(this.updateMethod + "(row[0])");
                }
            }
        } 
            
    },
    
    /*
     * @功能：删除所有选中记录支持批量删除
     *
     */
    doDelete: function(){
        var ogrid = this;
        var row = this.getSelectionModel().getSelections();
        if (row.length == 0) {
            Ext.Msg.alert("温馨提示", "请您选择记录!");
        }
        else {
            Ext.Msg.confirm("温馨提示!", "您确定要删除信息吗?", function(btn){
                if (btn == "yes") {
                    eval(ogrid.deleteMethod + "(row)");
                    //ogrid.getStore().reload();
                }
                else {
                
                }
            });
        }
    },
    afterEdit: function(e){
    
        var ogrid = this;
        //var g = e.grid;
        var r = e.record;
        var f = e.field;
        var v = e.value;
        //var orgin = e.originalValue;
        //var row = e.row;
        //var col = e.column;
        Ext.Ajax.request({
            url: this.afterEditURL,
            method: "POST",
            params: {
                flag: "update",
                field: f,
                value: v,
                id: r.id
            },
            success: function(response, option){
                ogrid.getStore().reload();
            },
            failure: function(){
                Ext.Msg.alert("不好意思", "修改失败了!");
            }
        });
    }
});
/**************************************************************************************************************
 * 控件类别：GridPanel
 * 功能描述：显示查询结果的EditorGridPanel
 ***************************************************************************************************************/
WXTL.Widgets.CommonGrid.GridPanel = Ext.extend(Ext.grid.EditorGridPanel, {
    title: "查询结果",
    style: 'padding:5px 0px 0px 0px',
    bodyStyle:'width:100%',
    frame: true,
    //分页数
    pageSize: 12,
    //是否分页属性，默认true
    needPage: true,
    //是否有菜单栏，默认true
    needMenu: true,
    //是否显示右击菜单，默认true
    needRightMenu: false,
	//是否预加载函数
	needLoadFunc: true,
    //表结构
    structure: '1',
    //载入效果
    loadMask: true,
    //stripeRows: true,
    autoExpandColumn: 7,
    // 超过长度带自动滚动条
    autoScroll: true,
    //自适应数据
    autoHeight: true,
    //添加调用方法名称
    inertMethod: '',
    //修改调用方法名称
    updateMethod: '',
    //删除调用方法名称
    deleteMethod: '',
    //修改单字段调用路径

    afterEditURL: '',
    initComponent: function(){
        if (this.structure != '') {
            this.initStructure();
        }
        WXTL.Widgets.CommonGrid.GridPanel.superclass.initComponent.call(this);
        var obj = this;
        for (var i = 1; i <= 10; i++) {
            if (obj.colModel.lookup[i] != null && obj.colModel.lookup[i].editor != null){ 
                obj.colModel.lookup[i].editor.addListener("complete", function(){
                    obj.getStore().reload();
                    
                });
            }
        }
		if(this.needLoadFunc){
			this.initLoadFunc();
		}
		
    },
    onRender: function(ct, position){
		if(this.getColumnModel().getColumnId(0) != "checker"){
			this.getSelectionModel().singleSelect=true;
		}
		else{
			this.getSelectionModel().singleSelect=false;
		}
        WXTL.Widgets.CommonGrid.GridPanel.superclass.onRender.call(this, ct, position);
        
    },
    initStructure: function(){
        var ogrid = this;
        this.view = new Ext.grid.GroupingView({
            // 自动填充
            enableGroupingMenu:false,
            forceFit: true,
            sortAscText: '正序排列',
            sortDescText: '倒序排列',
            columnsText: '列显示/隐藏',
            groupByText: '根据本列分组',
            showGroupsText: '是否采用分组显示'
        });
        // 生成分页工具栏

        if (this.needPage) {
            var pagingToolbar = new Ext.PagingToolbar({
                displayInfo: true,
                store: this.store,
                emptyMsg: '没有符合条件的记录',
                //显示右下角信息

                displayInfo: true,
                displayMsg: '当前记录 {0} -- {1} 条 共 {2} 条记录',
                prevText: "上一页",
                nextText: "下一页",
                refreshText: "刷新",
                lastText: "最后页",
                firstText: "第一页",
                beforePageText: "当前页",
                afterPageText: "共{0}页"
            });
            pagingToolbar.pageSize = this.pageSize;
            this.bbar = pagingToolbar;
            this.bottomToolbar = this.bbar;
            
            var oSearch = new Ext.form.TextField({
                id: 'search',
                xtype: 'textfield',
                align: 'right'
            
            });
            
        };
        if (this.needMenu) {
            var keyField = this.keyField;
            // 生成顶部工具条

            var topToolbar = new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "新增",
                    
					handler: function(){
                        ogrid.doInsert();
                    }
                }, "", "-", "", {
                    iconCls: 'editicon',
                    text: "修改",
                    handler: function(){
                        ogrid.doEdit();
                    }
                }, "", "-", "", {
                    iconCls: 'deleteicon',
                    text: "删除",
                    handler: function(){
                        ogrid.doDelete();
                    }
                }]
            });
            this.tbar = topToolbar;
            this.topToolbar = this.tbar;
        };
        
        if (this.needRightMenu) {
            //-------------------------------------------------------右键菜单
            var ServiceCodeClick = new Ext.menu.Menu({
                items: [{
                    text: '新增',
                    iconCls: 'addicon',
                    handler: function(){
                        ogrid.doInsert();
                        ogrid.getStore().reload();
                    }
                }, {
                    text: '修改',
                    iconCls: 'editicon',
                    handler: function(){
                        ogrid.doEdit();
                    }
                }, {
                    text: '删除',
                    iconCls: 'deleteicon',
                    handler: function(){
                        ogrid.doDelete();
                    }
                }, {
                    text: '刷新',
                    iconCls: 'refreshicon',
                    handler: function(){
                        ogrid.getStore().reload();
                    }
                }]
            });
            //===============================================================添加监听事件
            this.addListener("rowcontextmenu", function(grid, rowIndex, e){
                e.stopEvent();
                ServiceCodeClick.showAt(e.getXY());
            });
            this.addListener("afteredit", function(e){
                ogrid.afterEdit(e);
            });
        }
        
    },
	initLoadFunc: function(){
		//if(this.needLoadFunc){
			//if(this.needMenu){
			if(this.inertMethod != ""){
				if(eval(this.inertMethod + ".window") == null){
					eval(this.inertMethod + ".func()");
				}
			}
			if(this.updateMethod != ""){
				if(eval(this.updateMethod + ".window")== null){
					eval(this.updateMethod + ".func()");
				}
				
			}
			if(this.otherInitLoadFunc != null && this.otherInitLoadFunc.length>0){
				for(var i=0;i<this.otherInitLoadFunc.length;i++){
					eval(this.otherInitLoadFunc[i] + "()");
				}
			}
			//}
		//}
	},
    /*
     * @功能：编辑用户选中的数据 @参数：id 为空则为新增数据 不为空则为修改数据

     *
     */
    doInsert: function(){
		//WXTL.Common.showWaitLoading(true);

		eval(this.inertMethod + ".window.show()");
    },
    /*
     * @功能：编辑用户选中的数据 @参数：id 为空则为新增数据 不为空则为修改数据

     *
     */
    doEdit: function(id){
        var row = this.getSelectionModel().getSelections();
        if (row.length == 0) {
            Ext.Msg.alert("温馨提示", "请您选择一条记录!");
        }
        else{
        	if (row.length > 1) {
                Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
            }
            else{
                if (row.length == 1) {
                    //eval(this.updateMethod + "(row[0])");
					eval(this.updateMethod+ ".window.updateRecord=row[0];");
					eval(this.updateMethod+ ".window.mainForm.loadRecord(row[0]);");
					eval(this.updateMethod+ ".window.show();");
                }
            }
        } 
            
    },
    
    /*
     * @功能：删除所有选中记录支持批量删除
     *
     */
    doDelete: function(){
        var ogrid = this;
        var row = this.getSelectionModel().getSelections();
        if (row.length == 0) {
            Ext.Msg.alert("温馨提示", "请您选择记录!");
        }
        else {
            Ext.Msg.confirm("温馨提示!", "您确定要删除信息吗?", function(btn){
                if (btn == "yes") {
                    eval(ogrid.deleteMethod + "(row)");
                    //ogrid.getStore().reload();
                }
                else {
                
                }
            });
        }
    },
    afterEdit: function(e){
    
        var ogrid = this;
        var g = e.grid;
        var r = e.record;
        var f = e.field;
        var v = e.value;
        var orgin = e.originalValue;
        var row = e.row;
        var col = e.column;
        Ext.Ajax.request({
            url: this.afterEditURL,
            method: "POST",
            params: {
                flag: "update",
                field: f,
                value: v,
                id: r.id
            },
            success: function(response, option){
                ogrid.getStore().reload();
            },
            failure: function(){
                Ext.Msg.alert("不好意思", "修改失败了!");
            }
        })
    }
});
//==================================================================================CommonForm
Ext.namespace("WXTL.Widgets.CommonForm");
/*********************************************************************************
 * 控件类别：CheckboxGroup
 * 功能描述：显示一组CheckBox列表，可多选
 * @url：获取数据的地址
 * @queryparams：查询条件参数(queryparams: 'flag=selectallbyuserid&columnlist=numusergroupid,vc2usergroupname')
 * @numcolumns:每行可显示的列数
 * @requestname：每一项的Value绑定的字段
 * @defaultsItemsName：没有数据时默认初始化项Value绑定的字段
 * @defaultsItemsboxLable：没有数据时默认初始化项name绑定的字段
 *********************************************************************************/
Ext.namespace("WXTL.Widgets.CommonForm.CheckboxGroup");
WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup = Ext.extend(Ext.form.CheckboxGroup, {
    url: '',
    queryparams:'',
    numcolumns:3,
    requestname:'',
    defaultsItemsName:'',
    defaultsItemsboxLable:'',
    //messageID: '',
    reader: new Ext.data.JsonReader({
        totalProperty: 'totalProperty',
        root: 'data',
        fields: [{
            name: 'id'
        }, {
            name: 'name'
        
        }, {
            name: 'boxLabel',
            mapping: "vc2usergroupname"
        }, {
            name: 'inputValue',
            mapping: "numusergroupid"
        }, {
            name: 'checked'
        }]
    }),
    initComponent: function(){
        WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup.superclass.initComponent.call(this);
    },
    onRender: function(H, F){
        this.defaultItems = [{
            name: this.requestname,//this.defaultsItemsName,
            boxLabel: this.defaultsItemsboxLable,
            disabled: true
        }];
        this.items = this.defaultItems;
        if (this.url != '') {
            var conn = Ext.lib.Ajax.getConnectionObject().conn;
            conn.open("POST", this.url + "?"+this.queryparams, false);
            conn.send("");
            var response = Ext.decode(conn.responseText);
            var responses = this.reader.readRecords(Ext.decode(conn.responseText));
            if (response.success) {
                var records = responses.records;
                if (records.length > this.numcolumns) 
                    this.columns = this.numcolumns;
                for (var i = 0; i < records.length; i++) {
                    this.items[i] = records[i].data;
                }
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].name = this.requestname;
                }
            }
        }
        WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup.superclass.onRender.call(this, H, F);
    },
    /**
     * Set all boxes for this CheckboxGroup to checked or unchecked.
     * @param {Boolean} v true to check all boxes this group, false to uncheck all boxes this group.
     */
    invert: function(){
        this.items.each(function(c){
            if (!c.disabled) {
                c.setValue(!c.checked);
            }
        }, this);
    },
    
    /**
     * Set all boxes for this CheckboxGroup to checked or unchecked.
     * @param {Boolean} v true to check all boxes this group, false to uncheck all boxes this group.
     */
    setAll: function(v){
        this.items.each(function(c){
            if(c.setValue && !c.disabled){
                c.setValue(v);
            }
        }, this);
    }
});
Ext.reg("RemoteCheckboxGroup", WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup);
/***********************************************************************************
 * 控件类别：ComboBox
 * 功能描述：一定格式的下拉框（加载数据后第一项为"-=请选择=-"）
 ***********************************************************************************/

///<reference path = "vswd-ext_2.2.js" / >
//Ext.namespace("wxtl.widgets.form");
WXTL.Widgets.CommonForm.ComboBox = Ext.extend(Ext.form.ComboBox, {
    emptyText: '-=请选择=-', //没有选择数据时的提示
    mode: 'local', //数据加载模式默认为本地
    shadow:false,
    triggerAction: 'all', //显示全部数据
    valueField: 'id', //数据值

    displayField: 'name', //数据显示名    
    selectOnFocus: true, //是否支持鼠标和键盘，默认是
    enableKeyEvents: true, //键盘事件设置为真

    editable: true, //是否支持修改，默认否
    allowBlank: true, //是否必选，默认否

    typeAhead: true,
    forceSelection: true,
    resizable: false, //是否支持拖拽大小
    readOnly: false,
    valueNotFoundText: '-=请选择=-',
    isNeedDefaultChoose: true, //是否需要-=请选择=-选项
    initCancleText: function(o){ //自动添加一个空选择项
        var obj = this;
        o.on("blur", function(){
        	var count = o.store.getCount();
        	if(count >0){
        		return true;
            }
        	else{
        		o.setValue('');
	            return false;
        	}
        });
        o.on("select", function(){
            //            if (o.getValue() == -1) { //当选择-1时，把值设置为空

            //                o.setValue("");
            //            }
        });
        o.on('beforequery', function(e){   
                  
            var combo = e.combo;     
            if(!e.forceAll){     
                var input = combo.getRawValue();//e.query;     
                // 检索的正则   
                var regExp = new RegExp(".*" + input + ".*");   
                // 执行检索   
                combo.store.filterBy(function(record,id){     
                    // 得到每个record的项目名称值   
                    var text = record.get(combo.displayField);     
                    return regExp.test(text);    
                });   
                combo.expand();     
                return false;   
            }   
        });
        this.store.on("load", function(a){
        	if(obj.isNeedDefaultChoose){
	            if (a.getAt(0) != null && a.getAt(0).data[obj.valueField] != '') {
	                var r = new Ext.data.Record({});
	                r.set(o.valueField, ''); //添加一格值为-1的选项
	                r.set(o.displayField, '-=请选择=-');
	                a.insert(0, r);
	            }
        	}
        });
    },
 // private
    initEvents : function(){
        Ext.form.ComboBox.superclass.initEvents.call(this);

        this.keyNav = new Ext.KeyNav(this.el, {
            "up" : function(e){
                this.inKeyMode = true;
                this.selectPrev();
            },

            "down" : function(e){
                if(!this.isExpanded()){
                    this.onTriggerClick();
                }else{
                    this.inKeyMode = true;
                    this.selectNext();
                }
            },

            "enter" : function(e){
                this.onViewClick();
                //return true;
            },

            "esc" : function(e){
                this.collapse();
            },

            "tab" : function(e){
                this.onViewClick(false);
                return true;
            },

            scope : this,

            doRelay : function(foo, bar, hname){
                if(hname == 'down' || this.scope.isExpanded()){
                   return Ext.KeyNav.prototype.doRelay.apply(this, arguments);
                }
                return true;
            },

            forceKeyDown : true
        });
        this.queryDelay = Math.max(this.queryDelay || 10,
                this.mode == 'local' ? 10 : 250);
        this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
        if(this.typeAhead){
            this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
        }
        if(this.editable !== false){
            this.el.on("keyup", this.onKeyUp, this);
        }
        if(this.forceSelection){
            this.on('blur', this.doForce, this);
        }
    }, 
    // private
    onKeyUp : function(e){
    	if(this.editable !== false && !e.isSpecialKey()){   
	        this.lastKey = e.getKey();   
	        this.dqTask.delay(this.queryDelay);   
	    }   
	    Ext.form.ComboBox.superclass.onKeyUp.call(this, e);
    },
    initComponent: function(){
    	this.addEvents(   
                'select',   
                'expand',   
                'collapse',   
                'beforeselect'
        ); 
        this.initCancleText(this);
        WXTL.Widgets.CommonForm.ComboBox.superclass.initComponent.call(this);
        this.on("keyup",function(f,e){
        	this.doQuery();  	
        });
    }

});
Ext.reg('xComboBox', WXTL.Widgets.CommonForm.ComboBox);
/*******************************************************************************
 * 控件类型：DateTime
 * 功能描述：带时间的日期选择控件
 *******************************************************************************/
WXTL.Widgets.CommonForm.DateTime = Ext.extend(Ext.form.Field, {
    /**
     * @cfg {String/Object} defaultAutoCreate DomHelper element spec
     * Let superclass to create hidden field instead of textbox. Hidden will be submittend to server
     */
    defaultAutoCreate: {
        tag: 'input',
        type: 'hidden'
    }    /**
     * @cfg {Number} timeWidth Width of time field in pixels (defaults to 100)
     */
    ,
    timeWidth: 100    /**
     * @cfg {String} dtSeparator Date - Time separator. Used to split date and time (defaults to ' ' (space))
     */
    ,
    dtSeparator: ' '    /**
     * @cfg {String} hiddenFormat Format of datetime used to store value in hidden field
     * and submitted to server (defaults to 'Y-m-d H:i:s' that is mysql format)
     */
    ,
    hiddenFormat: 'Y-m-d H:i:s'    /**
     * @cfg {Boolean} otherToNow Set other field to now() if not explicly filled in (defaults to true)
     */
    ,
    otherToNow: true    /**
     * @cfg {Boolean} emptyToNow Set field value to now on attempt to set empty value.
     * If it is true then setValue() sets value of field to current date and time (defaults to false)
     */
    /**
     * @cfg {String} timePosition Where the time field should be rendered. 'right' is suitable for forms
     * and 'below' is suitable if the field is used as the grid editor (defaults to 'right')
     */
    ,
    timePosition: 'right' // valid values:'below', 'right'
    /**
     * @cfg {String} dateFormat Format of DateField. Can be localized. (defaults to 'm/y/d')
     */
    ,
    dateFormat: 'm/d/y'    /**
     * @cfg {String} timeFormat Format of TimeField. Can be localized. (defaults to 'g:i A')
     */
    ,
    timeFormat: 'g:i A'    /**
     * @cfg {Object} dateConfig Config for DateField constructor.
     */
    /**
     * @cfg {Object} timeConfig Config for TimeField constructor.
     */
    // {{{
    /**
     * @private
     * creates DateField and TimeField and installs the necessary event handlers
     */
    ,
    initComponent: function(){
        // call parent initComponent
        WXTL.Widgets.CommonForm.DateTime.superclass.initComponent.call(this);
        
        // create DateField
        var dateConfig = Ext.apply({}, {
            id: this.id + '-date',
            format: this.dateFormat || Ext.form.DateField.prototype.format,
            width: this.timeWidth,
            selectOnFocus: this.selectOnFocus,
            listeners: {
                blur: {
                    scope: this,
                    fn: this.onBlur
                },
                focus: {
                    scope: this,
                    fn: this.onFocus
                }
            }
        }, this.dateConfig);
        this.df = new Ext.form.DateField(dateConfig);
        this.df.ownerCt = this;
        delete (this.dateFormat);
        
        // create TimeField
        var timeConfig = Ext.apply({}, {
            id: this.id + '-time',
            format: this.timeFormat || Ext.form.TimeField.prototype.format,
            width: this.timeWidth,
            selectOnFocus: this.selectOnFocus,
            listeners: {
                blur: {
                    scope: this,
                    fn: this.onBlur
                },
                focus: {
                    scope: this,
                    fn: this.onFocus
                }
            }
        }, this.timeConfig);
        this.tf = new Ext.form.TimeField(timeConfig);
        this.tf.ownerCt = this;
        delete (this.timeFormat);
        
        // relay events
        this.relayEvents(this.df, ['focus', 'specialkey', 'invalid', 'valid']);
        this.relayEvents(this.tf, ['focus', 'specialkey', 'invalid', 'valid']);
        
    } // eo function initComponent
    // }}}
    // {{{
    /**
     * @private
     * Renders underlying DateField and TimeField and provides a workaround for side error icon bug
     */
    ,
    onRender: function(ct, position){
        // don't run more than once
        if (this.isRendered) {
            return;
        }
        
        // render underlying hidden field
        WXTL.Widgets.CommonForm.DateTime.superclass.onRender.call(this, ct, position);
        
        // render DateField and TimeField
        // create bounding table
        var t;
        if ('below' === this.timePosition || 'bellow' === this.timePosition) {
            t = Ext.DomHelper.append(ct, {
                tag: 'table',
                style: 'border-collapse:collapse',
                children: [{
                    tag: 'tr',
                    children: [{
                        tag: 'td',
                        style: 'padding-bottom:1px',
                        cls: 'ux-datetime-date'
                    }]
                }, {
                    tag: 'tr',
                    children: [{
                        tag: 'td',
                        cls: 'ux-datetime-time'
                    }]
                }]
            }, true);
        }
        else {
            t = Ext.DomHelper.append(ct, {
                tag: 'table',
                style: 'border-collapse:collapse',
                children: [{
                    tag: 'tr',
                    children: [{
                        tag: 'td',
                        style: 'padding-right:4px',
                        cls: 'ux-datetime-date'
                    }, {
                        tag: 'td',
                        cls: 'ux-datetime-time'
                    }]
                }]
            }, true);
        }
        
        this.tableEl = t;
        this.wrap = t.wrap({
            cls: 'x-form-field-wrap'
        });
        //        this.wrap = t.wrap();
        this.wrap.on("mousedown", this.onMouseDown, this, {
            delay: 10
        });
        
        // render DateField & TimeField
        this.df.render(t.child('td.ux-datetime-date'));
        this.tf.render(t.child('td.ux-datetime-time'));
        
        // workaround for IE trigger misalignment bug
        if (Ext.isIE && Ext.isStrict) {
            t.select('input').applyStyles({
                top: 0
            });
        }
        
        this.on('specialkey', this.onSpecialKey, this);
        this.df.el.swallowEvent(['keydown', 'keypress']);
        this.tf.el.swallowEvent(['keydown', 'keypress']);
        
        // create icon for side invalid errorIcon
        if ('side' === this.msgTarget) {
            var elp = this.el.findParent('.x-form-element', 10, true);
            this.errorIcon = elp.createChild({
                cls: 'x-form-invalid-icon'
            });
            
            this.df.errorIcon = this.errorIcon;
            this.tf.errorIcon = this.errorIcon;
        }
        
        // setup name for submit
        this.el.dom.name = this.hiddenName || this.name || this.id;
        
        // prevent helper fields from being submitted
        this.df.el.dom.removeAttribute("name");
        this.tf.el.dom.removeAttribute("name");
        
        // we're rendered flag
        this.isRendered = true;
        
        // update hidden field
        this.updateHidden();
        
    } // eo function onRender
    // }}}
    // {{{
    /**
     * @private
     */
    ,
    adjustSize: Ext.BoxComponent.prototype.adjustSize // }}}
    // {{{
    /**
     * @private
     */
    ,
    alignErrorIcon: function(){
        this.errorIcon.alignTo(this.tableEl, 'tl-tr', [2, 0]);
    } // }}}
    // {{{
    /**
     * @private initializes internal dateValue
     */
    ,
    initDateValue: function(){
        this.dateValue = this.otherToNow ? new Date() : new Date(1970, 0, 1, 0, 0, 0);
    } // }}}
    // {{{
    /**
     * Calls clearInvalid on the DateField and TimeField
     */
    ,
    clearInvalid: function(){
        this.df.clearInvalid();
        this.tf.clearInvalid();
    } // eo function clearInvalid
    // }}}
    // {{{
    /**
     * Calls markInvalid on both DateField and TimeField
     * @param {String} msg Invalid message to display
     */
    ,
    markInvalid: function(msg){
        this.df.markInvalid(msg);
        this.tf.markInvalid(msg);
    } // eo function markInvalid
    // }}}
    // {{{
    /**
     * @private
     * called from Component::destroy.
     * Destroys all elements and removes all listeners we've created.
     */
    ,
    beforeDestroy: function(){
        if (this.isRendered) {
            //            this.removeAllListeners();
            this.wrap.removeAllListeners();
            this.wrap.remove();
            this.tableEl.remove();
            this.df.destroy();
            this.tf.destroy();
        }
    } // eo function beforeDestroy
    // }}}
    // {{{
    /**
     * Disable this component.
     * @return {Ext.Component} this
     */
    ,
    disable: function(){
        if (this.isRendered) {
            this.df.disabled = this.disabled;
            this.df.onDisable();
            this.tf.onDisable();
        }
        this.disabled = true;
        this.df.disabled = true;
        this.tf.disabled = true;
        this.fireEvent("disable", this);
        return this;
    } // eo function disable
    // }}}
    // {{{
    /**
     * Enable this component.
     * @return {Ext.Component} this
     */
    ,
    enable: function(){
        if (this.rendered) {
            this.df.onEnable();
            this.tf.onEnable();
        }
        this.disabled = false;
        this.df.disabled = false;
        this.tf.disabled = false;
        this.fireEvent("enable", this);
        return this;
    } // eo function enable
    // }}}
    // {{{
    /**
     * @private Focus date filed
     */
    ,
    focus: function(){
        this.df.focus();
    } // eo function focus
    // }}}
    // {{{
    /**
     * @private
     */
    ,
    getPositionEl: function(){
        return this.wrap;
    } // }}}
    // {{{
    /**
     * @private
     */
    ,
    getResizeEl: function(){
        return this.wrap;
    } // }}}
    // {{{
    /**
     * @return {Date/String} Returns value of this field
     */
    ,
    getValue: function(){
        // create new instance of date
        return this.dateValue ? new Date(this.dateValue) : '';
    } // eo function getValue
    // }}}
    // {{{
    /**
     * @return {Boolean} true = valid, false = invalid
     * @private Calls isValid methods of underlying DateField and TimeField and returns the result
     */
    ,
    isValid: function(){
        return this.df.isValid() && this.tf.isValid();
    } // eo function isValid
    // }}}
    // {{{
    /**
     * Returns true if this component is visible
     * @return {boolean}
     */
    ,
    isVisible: function(){
        return this.df.rendered && this.df.getActionEl().isVisible();
    } // eo function isVisible
    // }}}
    // {{{
    /** 
     * @private Handles blur event
     */
    ,
    onBlur: function(f){
        // called by both DateField and TimeField blur events
        
        // revert focus to previous field if clicked in between
        if (this.wrapClick) {
            f.focus();
            this.wrapClick = false;
        }
        
        // update underlying value
        if (f === this.df) {
            this.updateDate();
        }
        else {
            this.updateTime();
        }
        this.updateHidden();
        
        // fire events later
        (function(){
            if (!this.df.hasFocus && !this.tf.hasFocus) {
                var v = this.getValue();
                if (String(v) !== String(this.startValue)) {
                    this.fireEvent("change", this, v, this.startValue);
                }
                this.hasFocus = false;
                this.fireEvent('blur', this);
            }
        }).defer(100, this);
        
    } // eo function onBlur
    // }}}
    // {{{
    /**
     * @private Handles focus event
     */
    ,
    onFocus: function(){
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.startValue = this.getValue();
            this.fireEvent("focus", this);
        }
    } // }}}
    // {{{
    /**
     * @private Just to prevent blur event when clicked in the middle of fields
     */
    ,
    onMouseDown: function(e){
        if (!this.disabled) {
            this.wrapClick = 'td' === e.target.nodeName.toLowerCase();
        }
    } // }}}
    // {{{
    /**
     * @private
     * Handles Tab and Shift-Tab events
     */
    ,
    onSpecialKey: function(t, e){
        var key = e.getKey();
        if (key === e.TAB) {
            if (t === this.df && !e.shiftKey) {
                e.stopEvent();
                this.tf.focus();
            }
            if (t === this.tf && e.shiftKey) {
                e.stopEvent();
                this.df.focus();
            }
        }
        // otherwise it misbehaves in editor grid
        if (key === e.ENTER) {
            this.updateValue();
        }
        
    } // eo function onSpecialKey
    // }}}
    // {{{
    /**
     * @private Sets the value of DateField
     */
    ,
    setDate: function(date){
        this.df.setValue(date);
    } // eo function setDate
    // }}}
    // {{{
    /** 
     * @private Sets the value of TimeField
     */
    ,
    setTime: function(date){
        this.tf.setValue(date);
    } // eo function setTime
    // }}}
    // {{{
    /**
     * @private
     * Sets correct sizes of underlying DateField and TimeField
     * With workarounds for IE bugs
     */
    ,
    setSize: function(w, h){
        if (!w) {
            return;
        }
        if ('below' === this.timePosition) {
            this.df.setSize(w, h);
            this.tf.setSize(w, h);
            if (Ext.isIE) {
                this.df.el.up('td').setWidth(w);
                this.tf.el.up('td').setWidth(w);
            }
        }
        else {
            this.df.setSize(w - this.timeWidth - 4, h);
            this.tf.setSize(this.timeWidth, h);
            
            if (Ext.isIE) {
                this.df.el.up('td').setWidth(w - this.timeWidth - 4);
                this.tf.el.up('td').setWidth(this.timeWidth);
            }
        }
    } // eo function setSize
    // }}}
    // {{{
    /**
     * @param {Mixed} val Value to set
     * Sets the value of this field
     */
    ,
    setValue: function(val){
        if (!val && true === this.emptyToNow) {
            this.setValue(new Date());
            return;
        }
        else {
        	if (!val) {
                this.setDate('');
                this.setTime('');
                this.updateValue();
                return;
            }
        }
            
        if ('number' === typeof val) {
            val = new Date(val);
        }
        else {
            if ('string' === typeof val && this.hiddenFormat) {
                val = Date.parseDate(val, this.hiddenFormat);
            }
        }
        val = val ? val : WXTL.Common.dateTime.getNow();
        var da, time;
        if (val instanceof Date) {
            this.setDate(val);
            this.setTime(val);
            this.dateValue = new Date(val);
        }
        else {
            da = val.split(this.dtSeparator);
            this.setDate(da[0]);
            if (da[1]) {
                if (da[2]) {
                    // add am/pm part back to time
                    da[1] += da[2];
                }
                this.setTime(da[1]);
            }
        }
        this.updateValue();
    } // eo function setValue
    // }}}
    // {{{
    /**
     * Hide or show this component by boolean
     * @return {Ext.Component} this
     */
    ,
    setVisible: function(visible){
        if (visible) {
            this.df.show();
            this.tf.show();
        }
        else {
            this.df.hide();
            this.tf.hide();
        }
        return this;
    } // eo function setVisible
    // }}}
    //{{{
    ,
    show: function(){
        return this.setVisible(true);
    } // eo function show
    //}}}
    //{{{
    ,
    hide: function(){
        return this.setVisible(false);
    } // eo function hide
    //}}}
    // {{{
    /**
     * @private Updates the date part
     */
    ,
    updateDate: function(){
    
        var d = this.df.getValue();
        if (d) {
            if (!(this.dateValue instanceof Date)) {
                this.initDateValue();
                if (!this.tf.getValue()) {
                    this.setTime(this.dateValue);
                }
            }
            this.dateValue.setMonth(0); // because of leap years
            this.dateValue.setFullYear(d.getFullYear());
            this.dateValue.setMonth(d.getMonth(), d.getDate());
            //            this.dateValue.setDate(d.getDate());
        }
        else {
            this.dateValue = '';
            this.setTime('');
        }
    } // eo function updateDate
    // }}}
    // {{{
    /**
     * @private
     * Updates the time part
     */
    ,
    updateTime: function(){
        var t = this.tf.getValue();
        if (t && !(t instanceof Date)) {
            t = Date.parseDate(t, this.tf.format);
        }
        if (t && !this.df.getValue()) {
            this.initDateValue();
            this.setDate(this.dateValue);
        }
        if (this.dateValue instanceof Date) {
            if (t) {
                this.dateValue.setHours(t.getHours());
                this.dateValue.setMinutes(t.getMinutes());
                this.dateValue.setSeconds(t.getSeconds());
            }
            else {
                this.dateValue.setHours(0);
                this.dateValue.setMinutes(0);
                this.dateValue.setSeconds(0);
            }
        }
    } // eo function updateTime
    // }}}
    // {{{
    /**
     * @private Updates the underlying hidden field value
     */
    ,
    updateHidden: function(){
        if (this.isRendered) {
            var value = this.dateValue instanceof Date ? this.dateValue.format(this.hiddenFormat) : '';
            this.el.dom.value = value;
        }
    } // }}}
    // {{{
    /**
     * @private Updates all of Date, Time and Hidden
     */
    ,
    updateValue: function(){
    
        this.updateDate();
        this.updateTime();
        this.updateHidden();
        
        return;
    } // eo function updateValue
    // }}}
    // {{{
    /**
     * @return {Boolean} true = valid, false = invalid
     * calls validate methods of DateField and TimeField
     */
    ,
    validate: function(){
        return this.df.validate() && this.tf.validate();
    } // eo function validate
    // }}}
    // {{{
    /**
     * Returns renderer suitable to render this field
     * @param {Object} Column model config
     */
    ,
    renderer: function(field){
        var format = field.editor.dateFormat || Ext.ux.form.DateTime.prototype.dateFormat;
        format += ' ' + (field.editor.timeFormat || Ext.ux.form.DateTime.prototype.timeFormat);
        var renderer = function(val){
            var retval = Ext.util.Format.date(val, format);
            return retval;
			
        };
        return renderer;
    }, 
	reset : function(){
		if(this.addDays){
			this.setValue(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), this.addDays));
		}
		else{
			this.setValue(new Date());
		}
        
    }
	// eo function renderer
    // }}}

}); // eo extend
// register xtype
Ext.reg('xDateTime', WXTL.Widgets.CommonForm.DateTime);

WXTL.Widgets.CommonForm.MonthPicker = Ext.extend(Ext.Component, {
    format: "M-y",
    okText: Ext.DatePicker.prototype.okText,
    cancelText: Ext.DatePicker.prototype.cancelText,
    constrainToViewport: true,
    monthNames: Date.monthNames,
    startDay: 0,
    value: 0,
    noPastYears: false,
    initComponent: function(){
        WXTL.Widgets.CommonForm.MonthPicker.superclass.initComponent.call(this);
        this.value = this.value ? this.value.clearTime() : new Date().clearTime();
        this.addEvents('select');
        if (this.handler) {
            this.on("select", this.handler, this.scope || this);
        }
    },
    focus: function(){
        if (this.el) {
            this.update(this.activeDate);
        }
    },
    onRender: function(container, position){
        var m = ['<div style="width: 200px; height:175px;"></div>'];
        m[m.length] = '<div class="x-date-mp"></div>';
        var el = document.createElement("div");
        el.className = "x-date-picker";
        el.innerHTML = m.join("");
        container.dom.insertBefore(el, position);
        this.el = Ext.get(el);
        this.monthPicker = this.el.down('div.x-date-mp');
        this.monthPicker.enableDisplayMode('block');
        this.el.unselectable();
        this.showMonthPicker();
        if (Ext.isIE) {
            this.el.repaint();
        }
        this.update(this.value);
    },
    createMonthPicker: function(){
        if (!this.monthPicker.dom.firstChild) {
            var buf = ['<table border="0" cellspacing="0">'];
            for (var i = 0; i < 6; i++) {
                buf.push('<tr><td class="x-date-mp-month"><a href="#">', this.monthNames[i].substr(0, 3), '</a></td>', '<td class="x-date-mp-month x-date-mp-sep"><a href="#">', this.monthNames[i + 6].substr(0, 3), '</a></td>', i == 0 ? '<td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-prev"></a></td><td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-next"></a></td></tr>' : '<td class="x-date-mp-year"><a href="#"></a></td><td class="x-date-mp-year"><a href="#"></a></td></tr>');
            }
            buf.push('<tr class="x-date-mp-btns"><td colspan="4"><button type="button" class="x-date-mp-ok">', this.okText, '</button><button type="button" class="x-date-mp-cancel">', this.cancelText, '</button></td></tr>', '</table>');
            this.monthPicker.update(buf.join(''));
            this.monthPicker.on('click', this.onMonthClick, this);
            this.monthPicker.on('dblclick', this.onMonthDblClick, this);
            this.mpMonths = this.monthPicker.select('td.x-date-mp-month');
            this.mpYears = this.monthPicker.select('td.x-date-mp-year');
            this.mpMonths.each(function(m, a, i){
                i += 1;
                if ((i % 2) == 0) {
                    m.dom.xmonth = 5 + Math.round(i * .5);
                }
                else {
                    m.dom.xmonth = Math.round((i - 1) * .5);
                }
            });
        }
    },
    showMonthPicker: function(){
        this.createMonthPicker();
        var size = this.el.getSize();
        this.monthPicker.setSize(size);
        this.monthPicker.child('table').setSize(size);
        this.mpSelMonth = (this.activeDate || this.value).getMonth();
        this.updateMPMonth(this.mpSelMonth);
        this.mpSelYear = (this.activeDate || this.value).getFullYear();
        this.updateMPYear(this.mpSelYear);
        this.monthPicker.show();
        //this.monthPicker.slideIn('t', {duration:.2});
    },
    updateMPYear: function(y){
        if (this.noPastYears) {
            var minYear = new Date().getFullYear();
            if (y < (minYear + 4)) {
                y = minYear + 4;
            }
        }
        this.mpyear = y;
        var ys = this.mpYears.elements;
        for (var i = 1; i <= 10; i++) {
            var td = ys[i - 1], y2;
            if ((i % 2) == 0) {
                y2 = y + Math.round(i * .5);
                td.firstChild.innerHTML = y2;
                td.xyear = y2;
            }
            else {
                y2 = y - (5 - Math.round(i * .5));
                td.firstChild.innerHTML = y2;
                td.xyear = y2;
            }
            this.mpYears.item(i - 1)[y2 == this.mpSelYear ? 'addClass' : 'removeClass']('x-date-mp-sel');
        }
    },
    updateMPMonth: function(sm){
        this.mpMonths.each(function(m, a, i){
            m[m.dom.xmonth == sm ? 'addClass' : 'removeClass']('x-date-mp-sel');
        });
    },
    selectMPMonth: function(m){
    },
    onMonthClick: function(e, t){
        e.stopEvent();
        var el = new Ext.Element(t), pn;
        if (el.is('button.x-date-mp-cancel')) {
            this.hideMonthPicker();
            //this.fireEvent("select", this, this.value);
        }
        else {
        	if (el.is('button.x-date-mp-ok')) {
                this.update(new Date(this.mpSelYear, this.mpSelMonth, (this.activeDate || this.value).getDate()));
                //this.hideMonthPicker();
                this.fireEvent("select", this, this.value);
            }
            else{
                if (pn = el.up('td.x-date-mp-month', 2)) {
                    this.mpMonths.removeClass('x-date-mp-sel');
                    pn.addClass('x-date-mp-sel');
                    this.mpSelMonth = pn.dom.xmonth;
                }
                else{ 
                    if (pn = el.up('td.x-date-mp-year', 2)) {
                        this.mpYears.removeClass('x-date-mp-sel');
                        pn.addClass('x-date-mp-sel');
                        this.mpSelYear = pn.dom.xyear;
                    }
                    else{ 
                        if (el.is('a.x-date-mp-prev')) {
                            this.updateMPYear(this.mpyear - 10);
                        }
                        else{
                            if (el.is('a.x-date-mp-next')) {
                                this.updateMPYear(this.mpyear + 10);
                            }
                        }
                    }
                }
            }
        }
            
    },
    onMonthDblClick: function(e, t){
        e.stopEvent();
        var el = new Ext.Element(t), pn;
        if (pn = el.up('td.x-date-mp-month', 2)) {
            this.update(new Date(this.mpSelYear, pn.dom.xmonth, (this.activeDate || this.value).getDate()));
            //this.hideMonthPicker();
            this.fireEvent("select", this, this.value);
        }
        else {
            if (pn = el.up('td.x-date-mp-year', 2)) {
                this.update(new Date(pn.dom.xyear, this.mpSelMonth, (this.activeDate || this.value).getDate()));
                //this.hideMonthPicker();
                this.fireEvent("select", this, this.value);
            }
        }
    },
    hideMonthPicker: function(disableAnim){
        Ext.menu.MenuMgr.hideAll();
    },
    showPrevMonth: function(e){
        this.update(this.activeDate.add("mo", -1));
    },
    showNextMonth: function(e){
        this.update(this.activeDate.add("mo", 1));
    },
    showPrevYear: function(){
        this.update(this.activeDate.add("y", -1));
    },
    showNextYear: function(){
        this.update(this.activeDate.add("y", 1));
    },
    update: function(date){
        this.activeDate = date;
        this.value = date;
        if (!this.internalRender) {
            var main = this.el.dom.firstChild;
            var w = main.offsetWidth;
            this.el.setWidth(w + this.el.getBorderWidth("lr"));
            Ext.fly(main).setWidth(w);
            this.internalRender = true;
            if (Ext.isOpera && !this.secondPass) {
                main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth + main.rows[0].cells[2].offsetWidth)) + "px";
                this.secondPass = true;
                this.update.defer(10, this, [date]);
            }
        }
    }
});
Ext.reg('monthpicker', WXTL.Widgets.CommonForm.MonthPicker);
WXTL.Widgets.CommonForm.MonthItem = function(config){
    WXTL.Widgets.CommonForm.MonthItem.superclass.constructor.call(this, new WXTL.Widgets.CommonForm.MonthPicker(config), config);
    this.picker = this.component;
    this.addEvents('select');
    this.picker.on("render", function(picker){
        picker.getEl().swallowEvent("click");
        picker.container.addClass("x-menu-date-item");
    });
    this.picker.on("select", this.onSelect, this);
};
Ext.extend(WXTL.Widgets.CommonForm.MonthItem, Ext.menu.Adapter, {
    onSelect: function(picker, date){
        this.fireEvent("select", this, date, picker);
        WXTL.Widgets.CommonForm.MonthItem.superclass.handleClick.call(this);
    }
});

WXTL.Widgets.CommonForm.MonthMenu = function(config){
    WXTL.Widgets.CommonForm.MonthMenu.superclass.constructor.call(this, config);
    this.plain = true;
    var mi = new WXTL.Widgets.CommonForm.MonthItem(config);
    this.add(mi);
    this.picker = mi.picker;
    this.relayEvents(mi, ["select"]);
};
Ext.extend(WXTL.Widgets.CommonForm.MonthMenu, Ext.menu.Menu, {
    cls: 'x-date-menu'
});
WXTL.Widgets.CommonForm.MonthField = function(cfg){
    WXTL.Widgets.CommonForm.MonthField.superclass.constructor.call(this, Ext.apply({}, cfg ||
    {}));
};
Ext.extend(WXTL.Widgets.CommonForm.MonthField, Ext.form.DateField, {
    format: "Y-m",
    triggerClass: "x-form-date-trigger",
    menuListeners: {
        select: function(m, d){
            this.setValue(d.format(this.format));
        },
        show: function(){
            this.onFocus();
        },
        hide: function(){
            this.focus.defer(10, this);
            var ml = this.menuListeners;
            this.menu.un("select", ml.select, this);
            this.menu.un("show", ml.show, this);
            this.menu.un("hide", ml.hide, this);
        }
    },
    onTriggerClick: function(){
        if (this.disabled) {
            return;
        }
        if (this.menu == null) {
            this.menu = new WXTL.Widgets.CommonForm.MonthMenu();
        }
        Ext.apply(this.menu.picker, {});
        this.menu.on(Ext.apply({}, this.menuListeners, {
            scope: this
        }));
        this.menu.show(this.el, "tl-bl?");
    }
});
Ext.reg("monthfield", WXTL.Widgets.CommonForm.MonthField);

/*****************************************************************************
 * 控件类别：textarea
 * 描述：短信编辑输入框，右下方可配置显示平台签名，左下方显示已输入字数
 *****************************************************************************/
WXTL.Widgets.CommonForm.Textarea = Ext.extend(Ext.form.Field, {
    labelText: "平台签名：" + IDIOGRAPH,
    timePosition: 'below',
    /**
     * @cfg {String/Object} defaultAutoCreate DomHelper element spec
     * Let superclass to create hidden field instead of textbox. Hidden will be submittend to server
     */
    defaultAutoCreate: {
        tag: 'input',
        type: 'hidden'
    },
    initComponent: function(){
        var obj = this;
        // call parent initComponent
        WXTL.Widgets.CommonForm.Textarea.superclass.initComponent.call(this);
        
        // create TimeField
        var labelConfig = Ext.apply({}, {
            width: 450,
            height: 20,
            html: "<div style='height:20px;font-size:12px;color:gray;width:200px;float:left'>" + this.labelText + "</div><div style='height:20px;font-size:12px;color:gray;width:200px;float:right;text-align:right' id='" + this.id + "fontsize'></div>"
        }, this.labelConfig);
        this.tf = new Ext.Panel(labelConfig);
        this.tf.ownerCt = this;
        
        // create DateField
        var textareaConfig = Ext.apply({}, {
            width: 450,
            height: 70,
            enableKeyEvents: true,
            listeners: {
                "keyup": function(tl){
                    Ext.get(obj.id + "fontsize").dom.innerHTML = "字数:" + obj.getSize();
                    
                }
            },
            validator: function(){
                if (obj.getSize() > obj.contentMaxLength) {
                    this.invalidText = '输入长度不能大于' + obj.contentMaxLength+'个字';
                    return false;
                };
                return true;
            }
        }, this.textareaConfig);
        this.df = new Ext.form.TextArea(textareaConfig);
        this.df.ownerCt = this;
        
        // relay events
        this.relayEvents(this.df, ['focus', 'specialkey', 'invalid', 'valid']);
        this.relayEvents(this.tf, ['focus', 'specialkey', 'invalid', 'valid']);
        
    } // eo function initComponent
    // }}}
    // {{{
    /**
     * @private
     * Renders underlying DateField and TimeField and provides a workaround for side error icon bug
     */
    ,
    onRender: function(ct, position){
        // don't run more than once
        if (this.isRendered) {
            return;
        }
        
        // render underlying hidden field
        WXTL.Widgets.CommonForm.Textarea.superclass.onRender.call(this, ct, position);
        
        // render DateField and TimeField
        // create bounding table
        var t;
        if ('below' === this.timePosition || 'bellow' === this.timePosition) {
            t = Ext.DomHelper.append(ct, {
                tag: 'table',
                style: 'border-collapse:collapse',
                children: [{
                    tag: 'tr',
                    children: [{
                        tag: 'td',
                        style: 'padding-bottom:1px',
                        cls: 'ux-datetime-date'
                    }]
                }, {
                    tag: 'tr',
                    children: [{
                        tag: 'td',
                        cls: 'ux-datetime-time'
                    }]
                }]
            }, true);
        }
        else {
            t = Ext.DomHelper.append(ct, {
                tag: 'table',
                style: 'border-collapse:collapse',
                children: [{
                    tag: 'tr',
                    children: [{
                        tag: 'td',
                        style: 'padding-right:4px',
                        cls: 'ux-datetime-date'
                    }, {
                        tag: 'td',
                        cls: 'ux-datetime-time'
                    }]
                }]
            }, true);
        }
        
        this.tableEl = t;
        this.wrap = t.wrap({
            cls: 'x-form-field-wrap'
        });
        //        this.wrap = t.wrap();
        this.wrap.on("mousedown", this.onMouseDown, this, {
            delay: 10
        });
        
        // render DateField & TimeField
        this.df.render(t.child('td.ux-datetime-date'));
        this.tf.render(t.child('td.ux-datetime-time'));
        
        // workaround for IE trigger misalignment bug
        if (Ext.isIE && Ext.isStrict) {
            t.select('input').applyStyles({
                top: 0
            });
        }
        
        this.on('specialkey', this.onSpecialKey, this);
        //this.df.el.swallowEvent(['keydown', 'keypress']);
        //this.tf.el.swallowEvent(['keydown', 'keypress']);
        
        // create icon for side invalid errorIcon
        if ('side' === this.msgTarget) {
            var elp = this.el.findParent('.x-form-element', 10, true);
            this.errorIcon = elp.createChild({
                cls: 'x-form-invalid-icon'
            });
            
            this.df.errorIcon = this.errorIcon;
            this.tf.errorIcon = this.errorIcon;
        }
        
        // setup name for submit
        this.el.dom.name = this.hiddenName || this.name || this.id;
        
        // prevent helper fields from being submitted
        this.df.el.dom.removeAttribute("name");
        this.tf.el.dom.removeAttribute("name");
        // we're rendered flag
        this.isRendered = true;
    },
    getSize: function(){
        //        var intLength = 0;
        //        for (var i = 0; i < this.df.getValue().length; i++) {
        //            if ((this.df.getValue().charCodeAt(i) < 0) || (this.df.getValue().charCodeAt(i) > 255)) 
        //                intLength = intLength + 2
        //            else 
        //                intLength = intLength + 1
        //        }
        return this.df.getValue().length;
    },
    onSpecialKey: function(t, e){
    
    }// eo function onRender
    // }}}
    // {{{
    /**
     * @private
     */
    ,
    adjustSize: Ext.BoxComponent.prototype.adjustSize // }}}
    // {{{
    /**
     * @private
     */
    ,
    alignErrorIcon: function(){
        this.errorIcon.alignTo(this.tableEl, 'tl-tr', [2, 0]);
    } // }}}
    // {{{
    /**
     * Calls clearInvalid on the DateField and TimeField
     */
    ,
    clearInvalid: function(){
        this.df.clearInvalid();
		Ext.get(this.id + "fontsize").dom.innerHTML ='';
        //this.tf.clearInvalid();
    } // eo function clearInvalid
    // }}}
    // {{{
    /**
     * Calls markInvalid on both DateField and TimeField
     * @param {String} msg Invalid message to display
     */
    ,
    markInvalid: function(msg){
        this.df.markInvalid(msg);
        this.tf.markInvalid(msg);
    } // eo function markInvalid
    // }}}
    // {{{
    /**
     * @private
     * called from Component::destroy.
     * Destroys all elements and removes all listeners we've created.
     */
    ,
    beforeDestroy: function(){
        if (this.isRendered) {
            //            this.removeAllListeners();
            this.wrap.removeAllListeners();
            this.wrap.remove();
            this.tableEl.remove();
            this.df.destroy();
            this.tf.destroy();
        }
    } // eo function beforeDestroy
    // }}}
    // {{{
    /**
     * Disable this component.
     * @return {Ext.Component} this
     */
    ,
    disable: function(){
        if (this.isRendered) {
            this.df.disabled = this.disabled;
            this.df.onDisable();
            this.tf.onDisable();
        }
        this.disabled = true;
        this.df.disabled = true;
        this.tf.disabled = true;
        this.fireEvent("disable", this);
        return this;
    } // eo function disable
    // }}}
    // {{{
    /**
     * Enable this component.
     * @return {Ext.Component} this
     */
    ,
    enable: function(){
        if (this.rendered) {
            this.df.onEnable();
            this.tf.onEnable();
        }
        this.disabled = false;
        this.df.disabled = false;
        this.tf.disabled = false;
        this.fireEvent("enable", this);
        return this;
    } // eo function enable
    // }}}
    // {{{
    /**
     * @private Focus date filed
     */
    ,
    focus: function(){
        this.df.focus();
    } // eo function focus
    // }}}
    // {{{
    /**
     * @private
     */
    ,
    getPositionEl: function(){
        return this.wrap;
    } // }}}
    // {{{
    /**
     * @private
     */
    ,
    getResizeEl: function(){
        return this.wrap;
    } // }}}
    // {{{
    ,
    setValue: function(v){
        if (this.emptyText && this.el && v !== undefined && v !== null && v !== '') {
            this.el.removeClass(this.emptyClass);
        }
        if (this.isRendered) {
            this.df.setValue(v);
            this.el.dom.value = v;
        }
        //WXTL.Widgets.CommonForm.Textarea.superclass.setValue.apply(this, arguments);
        //this.applyEmptyText();
        //this.autoSize();
    }    /**
     * @return {Date/String} Returns value of this field
     */
    ,
    getValue: function(){
        return this.df.getValue();
    }    /**
     * @return {Boolean} true = valid, false = invalid
     * @private Calls isValid methods of underlying DateField and TimeField and returns the result
     */
    ,
	setLableText: function(v){
		if (this.emptyText && this.el && v !== undefined && v !== null && v !== '') {
            this.el.removeClass(this.emptyClass);
        }
        if (this.isRendered) {
			 this.tf.el.dom.innerHTML="<div style='height:20px;font-size:12px;color:gray;width:200px;float:left'>" + v + "</div><div style='height:20px;font-size:12px;color:gray;width:200px;float:right;text-align:right' id='" + this.id + "fontsize'></div>";
			
			//this.el.dom.value = v;
        }
	},
    isValid: function(){
        return this.df.isValid();
    }// eo function isValid
    // }}}
    // {{{
    /**
     * Returns true if this component is visible
     * @return {boolean}
     */
    ,
    isVisible: function(){
        return this.df.rendered && this.df.getActionEl().isVisible();
    } // eo function isVisible
    // }}}
    // {{{
    /** 
     * @private Handles blur event
     */
    ,
    onBlur: function(f){
        // called by both DateField and TimeField blur events
        
        // revert focus to previous field if clicked in between
        if (this.wrapClick) {
            f.focus();
            this.wrapClick = false;
        }
        
        // update underlying value
        if (f === this.df) {
            this.updateDate();
        }
        else {
            this.updateTime();
        }
        this.updateHidden();
        
        // fire events later
        (function(){
            if (!this.df.hasFocus && !this.tf.hasFocus) {
                var v = this.getValue();
                if (String(v) !== String(this.startValue)) {
                    this.fireEvent("change", this, v, this.startValue);
                }
                this.hasFocus = false;
                this.fireEvent('blur', this);
            }
        }).defer(100, this);
        
    } // eo function onBlur
    // }}}
    // {{{
    /**
     * @private Handles focus event
     */
    ,
    onFocus: function(){
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.startValue = this.getValue();
            this.fireEvent("focus", this);
        }
    } // }}}
    // {{{
    /**
     * @private Just to prevent blur event when clicked in the middle of fields
     */
    ,
    onMouseDown: function(e){
        if (!this.disabled) {
            this.wrapClick = 'td' === e.target.nodeName.toLowerCase();
        }
    }    /**
     * @private
     * Sets correct sizes of underlying DateField and TimeField
     * With workarounds for IE bugs
     */
    ,
    setSize: function(w, h){
        if (!w) {
            return;
        }
        if ('below' === this.timePosition) {
            this.df.setSize(w, h);
            this.tf.setSize(w, h);
            if (Ext.isIE) {
                this.df.el.up('td').setWidth(w);
                this.tf.el.up('td').setWidth(w);
            }
        }
        else {
            this.df.setSize(w - this.timeWidth - 4, h);
            this.tf.setSize(this.timeWidth, h);
            
            if (Ext.isIE) {
                this.df.el.up('td').setWidth(w - this.timeWidth - 4);
                this.tf.el.up('td').setWidth(this.timeWidth);
            }
        }
    }    /**
     * Hide or show this component by boolean
     * @return {Ext.Component} this
     */
    ,
    setVisible: function(visible){
        if (visible) {
            this.df.show();
            this.tf.show();
        }
        else {
            this.df.hide();
            this.tf.hide();
        }
        return this;
    } // eo function setVisible
    // }}}
    //{{{
    ,
    show: function(){
        return this.setVisible(true);
    } // eo function show
    //}}}
    //{{{
    ,
    hide: function(){
        return this.setVisible(false);
    }    /**
     * @return {Boolean} true = valid, false = invalid
     * calls validate methods of DateField and TimeField
     */
    ,
    validate: function(){
        this.el.dom.value = this.df.getValue();
        return this.df.validate();
    }
}); // eo extend
// register xtype
Ext.reg('xTextarea', WXTL.Widgets.CommonForm.Textarea);
/**************************************************************************************************************
 * 控件类别：Field
 * 功能描述：彩信帧编辑 上传控件
 ***************************************************************************************************************/
WXTL.Widgets.CommonForm.FileUpload = Ext.extend(Ext.form.Field, {
    timePosition: '',
    cbText: "不需要",
    defaultAutoCreate: {
        tag: 'input',
        type: 'hidden'
    },
    initComponent: function(){
        var obj = this;
        WXTL.Widgets.CommonForm.FileUpload.superclass.initComponent.call(this);
        
        // create checkBox
        var checkBoxConfig = Ext.apply({}, {
            id: obj.id + "cb",
            name: obj.name + "cb",
            boxLabel: obj.cbText,
            hideLabel: true,
            listeners: {
                check: function(c, flag){
                    if (flag) {
                        obj.tf.setDisabled(true);
                    }
                    else 
                        obj.tf.setDisabled(false);
                }
            }
        }, obj.checkBoxConfig);
        obj.cb = new Ext.form.Checkbox(checkBoxConfig);
        obj.cb.ownerCt = obj;
        
        // create textField
        var textFieldConfig = Ext.apply({}, {
            id: obj.id + "tf",
            name: obj.name + "tf",
            style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
            hideLabel: true,
            inputType: 'file',
            width: 285,
            initEvents: function(){
                var stopEvent = function(e){
                    e.stopEvent();
                };
                obj.tf.el.on("keypress", stopEvent, obj.tf);
                obj.tf.el.on("keydown", stopEvent, obj.tf);
                obj.tf.el.on("contextmenu", stopEvent, obj.tf);
                obj.tf.el.on("onpaste", stopEvent, obj.tf);
                obj.tf.el.on("onkeydown", stopEvent, obj.tf);
            }
        }, obj.textFieldConfig);
        obj.tf = new Ext.form.TextField(textFieldConfig);
        obj.tf.ownerCt = obj;
        
        
        // relay events
        obj.relayEvents(obj.cb, ['focus', 'specialkey', 'invalid', 'valid']);
        obj.relayEvents(obj.tf, ['focus', 'specialkey', 'invalid', 'valid']);
        
    },
    onRender: function(ct, position){
        if (this.isRendered) {
            return;
        }
        
        WXTL.Widgets.CommonForm.FileUpload.superclass.onRender.call(this, ct, position);
        
        var t;
        if ('below' === this.timePosition || 'bellow' === this.timePosition) {
            t = Ext.DomHelper.append(ct, {
                tag: 'table',
                style: 'border-collapse:collapse',
                children: [{
                    tag: 'tr',
                    children: [{
                        tag: 'td',
                        style: 'padding-bottom:1px',
                        cls: 'ux-datetime-date'
                    }]
                }, {
                    tag: 'tr',
                    children: [{
                        tag: 'td',
                        cls: 'ux-datetime-time'
                    }]
                }]
            }, true);
        }
        else {
            t = Ext.DomHelper.append(ct, {
                tag: 'table',
                style: 'border-collapse:collapse',
                children: [{
                    tag: 'tr',
                    children: [{
                        tag: 'td',
                        style: 'padding-right:10px',
                        cls: 'ux-datetime-time'
                    }, {
                        tag: 'td',
                        cls: 'ux-datetime-date'
                    }]
                }]
            }, true);
        }
        
        this.tableEl = t;
        this.wrap = t.wrap({
            cls: 'x-form-field-wrap'
        });
        
        this.cb.render(t.child('td.ux-datetime-date'));
        this.tf.render(t.child('td.ux-datetime-time'));
        
        if ('side' === this.msgTarget) {
            var elp = this.el.findParent('.x-form-element', 10, true);
            this.errorIcon = elp.createChild({
                cls: 'x-form-invalid-icon'
            });
            
            this.cb.errorIcon = this.errorIcon;
            this.tf.errorIcon = this.errorIcon;
        }
        
        // setup name for submit
        this.el.dom.name = this.hiddenName || this.name || this.id;
        
        // prevent helper fields from being submitted
        //this.cb.el.dom.removeAttribute("name");
        //this.tf.el.dom.removeAttribute("name");
        // we're rendered flag
        this.isRendered = true;
    },
    getSize: function(){
    
    },
    onSpecialKey: function(t, e){
    
    },
    adjustSize: Ext.BoxComponent.prototype.adjustSize,
    alignErrorIcon: function(){
        this.errorIcon.alignTo(this.tableEl, 'tl-tr', [2, 0]);
    },
    clearInvalid: function(){
        this.cb.clearInvalid();
        this.tf.clearInvalid();
        //Ext.get(this.id).dom.innerHTML = '';
        //this.tf.clearInvalid();
    },
    markInvalid: function(msg){
        this.cb.markInvalid(msg);
        this.tf.markInvalid(msg);
    },
    beforeDestroy: function(){
        if (this.isRendered) {
            //            this.removeAllListeners();
            this.wrap.removeAllListeners();
            this.wrap.remove();
            this.tableEl.remove();
            this.cb.destroy();
            this.tf.destroy();
        }
    },
    disable: function(){
        if (this.isRendered) {
            this.df.disabled = this.disabled;
            this.df.onDisable();
            this.tf.onDisable();
        }
        this.disabled = true;
        this.cb.disabled = true;
        this.tf.disabled = true;
        this.fireEvent("disable", this);
        return this;
    },
    enable: function(){
        if (this.rendered) {
            this.df.onEnable();
            this.tf.onEnable();
        }
        this.disabled = false;
        this.cb.disabled = false;
        this.tf.disabled = false;
        this.fireEvent("enable", this);
        return this;
    },
    setValue: function(filePath){
        //if(filePath!="")
        this.tf.setValue(filePath);
        //		else
        //			this.cb.setValue(true);
        //if (document.getElementById(this.id+"tf") != null) {
        //    var e = document.getElementById(this.id+"tf");
        //    e.outerHTML = e.outerHTML;
        // }
    
    },
    getValue: function(){
        return this.tf.getValue();
    },
    getCheckValue: function(){
        return this.cb.getValue();
    }
});
Ext.reg('FileUpload', WXTL.Widgets.CommonForm.FileUpload);


/**************************************************************************************************
 * @class Ext.ux.TreeCheckNodeUI
 * @extends Ext.tree.TreeNodeUI
 * 对 Ext.tree.TreeNodeUI 进行checkbox功能的扩展,后台返回的结点信息不用非要包含checked属性
 *  
 * 扩展的功能点有：
 * 一、支持只对树的叶子进行选择
 *    只有当返回的树结点属性leaf = true 时，结点才有checkbox可选
 * 	  使用时，只需在声明树时，加上属性 onlyLeafCheckable: true 既可，默认是false
 * 
 * 二、支持对树的单选
 *    只允许选择一个结点
 * 	  使用时，只需在声明树时，加上属性 checkModel: "single" 既可
 * 
 * 三、支持对树的级联多选 
 *    当选择结点时，自动选择该结点下的所有子结点，或该结点的所有父结点（根结点除外），特别是支持异步，当子结点还没显示时，会从后台取得子结点，然后将其选中/取消选中
 *    使用时，只需在声明树时，加上属性 checkModel: "cascade" 或"parentCascade"或"childCascade"既可
 * 
 * 四、添加"check"事件
 *    该事件会在树结点的checkbox发生改变时触发
 *    使用时，只需给树注册事件,如：
 *    tree.on("check",function(node,checked){...});
 * 
 * 默认情况下，checkModel为'multiple'，也就是多选，onlyLeafCheckable为false，所有结点都可选
 * 
 * 使用方法：在loader里加上 baseAttrs:{uiProvider:Ext.ux.TreeCheckNodeUI} 既可.
 * 例如：
 *   var tree = new Ext.tree.TreePanel({
 *		el:'tree-ct',
 *		width:568,
 *		height:300,
 *		checkModel: 'cascade',   //对树的级联多选
 *		onlyLeafCheckable: false,//对树所有结点都可选
 *		animate: false,
 *		rootVisible: false,
 *		autoScroll:true,
 *		loader: new Ext.tree.DWRTreeLoader({
 *			dwrCall:Tmplt.getTmpltTree,
 *			baseAttrs: { uiProvider: Ext.ux.TreeCheckNodeUI } //添加 uiProvider 属性
 *		}),
 *		root: new Ext.tree.AsyncTreeNode({ id:'0' })
 *	});
 *	tree.on("check",function(node,checked){alert(node.text+" = "+checked)}); //注册"check"事件
 *	tree.render();
 *****************************************************************************************************/

Ext.ux.TreeCheckNodeUI = function(){
    //多选: 'multiple'(默认)
    //单选: 'single'
    //级联多选: 'cascade'(同时选父和子);'parentCascade'(选父);'childCascade'(选子)
    this.checkModel = 'multiple';
    
    //only leaf can checked
    this.onlyLeafCheckable = false;
    
    Ext.ux.TreeCheckNodeUI.superclass.constructor.apply(this, arguments);
};

Ext.extend(Ext.ux.TreeCheckNodeUI, Ext.tree.TreeNodeUI, {

    renderElements: function(n, a, targetNode, bulkRender){
        var tree = n.getOwnerTree();
        this.checkModel = tree.checkModel || this.checkModel;
        this.onlyLeafCheckable = tree.onlyLeafCheckable || false;
        
        // add some indent caching, this helps performance when rendering a large tree
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';
        
        //var cb = typeof a.checked == 'boolean';
        var cb = (!this.onlyLeafCheckable || a.leaf);
        var href = a.href ? a.href : Ext.isGecko ? "" : "#";
        var buf = ['<li class="x-tree-node"><div ext:tree-node-id="', n.id, '" class="x-tree-node-el x-tree-node-leaf x-unselectable ', a.cls, '" unselectable="on">', '<span class="x-tree-node-indent">', this.indentMarkup, "</span>", '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow" />', '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon', (a.icon ? " x-tree-node-inline-icon" : ""), (a.iconCls ? " " + a.iconCls : ""), '" unselectable="on" />', cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + (a.checked ? 'checked="checked" />' : '/>')) : '', '<a hidefocus="on" class="x-tree-node-anchor" href="', href, '" tabIndex="1" ', a.hrefTarget ? ' target="' + a.hrefTarget + '"' : "", '><span unselectable="on">', n.text, "</span></a></div>", '<ul class="x-tree-node-ct" style="display:none;"></ul>', "</li>"].join('');
        
        var nel;
        if (bulkRender !== true && n.nextSibling && (nel = n.nextSibling.ui.getEl())) {
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin", nel, buf);
        }
        else {
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf);
        }
        
        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        var index = 3;
        if (cb) {
            this.checkbox = cs[3];
            Ext.fly(this.checkbox).on('click', this.check.createDelegate(this, [null]));
            index++;
        }
        this.anchor = cs[index];
        this.textNode = cs[index].firstChild;
    },
    // private
    check: function(checked){
        var n = this.node;
        var tree = n.getOwnerTree();
        this.checkModel = tree.checkModel || this.checkModel;
        
        if (checked === null) {
            checked = this.checkbox.checked;
        }
        else {
            this.checkbox.checked = checked;
        }
        
        n.attributes.checked = checked;
        tree.fireEvent('check', n, checked);
        
        if (this.checkModel == 'single') {
            var checkedNodes = tree.getChecked();
            for (var i = 0; i < checkedNodes.length; i++) {
                var node = checkedNodes[i];
                if (node.id != n.id) {
                    node.getUI().checkbox.checked = false;
                    node.attributes.checked = false;
                    tree.fireEvent('check', node, false);
                }
            }
        }
        else {
            if (!this.onlyLeafCheckable) {
                if (this.checkModel == 'cascade' || this.checkModel == 'parentCascade') {
                    var parentNode = n.parentNode;
                    if (parentNode !== null) {
                        this.parentCheck(parentNode, checked);
                    }
                }
                if (this.checkModel == 'cascade' || this.checkModel == 'childCascade') {
                    if (!n.expanded && !n.childrenRendered) {
                        n.expand(false, false, this.childCheck);
                    }
                    else {
                        this.childCheck(n);
                    }
                }
            }
        }
    },
    
    
    // private
    childCheck: function(node){
        var a = node.attributes;
        if (!a.leaf) {
            var cs = node.childNodes;
            var csui;
            for (var i = 0; i < cs.length; i++) {
                csui = cs[i].getUI();
                if (csui.checkbox.checked ^ a.checked) {
                    csui.check(a.checked);
                }
            }
        }
    },
    
    // private
    parentCheck: function(node, checked){
        var checkbox = node.getUI().checkbox;
        if (typeof checkbox == 'undefined') {
            return;
        }
        if (!(checked ^ checkbox.checked)){ 
            return;
        }
        if (!checked && this.childHasChecked(node)) {
            return;
        }
        checkbox.checked = checked;
        node.attributes.checked = checked;
        node.getOwnerTree().fireEvent('check', node, checked);
        
        var parentNode = node.parentNode;
        if (parentNode !== null) {
            this.parentCheck(parentNode, checked);
        }
    },
    
    // private
    childHasChecked: function(node){
        var childNodes = node.childNodes;
        if (childNodes || childNodes.length > 0) {
            for (var i = 0; i < childNodes.length; i++) {
                if (childNodes[i].getUI().checkbox.checked) {
                    return true;
                }
            }
        }
        return false;
    },
    
    toggleCheck: function(value){
        var cb = this.checkbox;
        if (cb) {
            var checked = (value === undefined ? !cb.checked : value);
            this.check(checked);
        }
    }
});
/*********************************************************
*功能描述：上传控件（针对IE下重置不清空数据的问题）
*
*
**********************************************************/
/*!
 * Ext JS Library 3.1.1
 * Copyright(c) 2006-2010 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
//Ext.ns('Ext.ux.form');

/**
 * @class WXTL.Widgets.CommonForm.FileUploadField
 * @extends Ext.form.TextField
 * Creates a file upload field.
 * @xtype fileuploadfield
 */
WXTL.Widgets.CommonForm.FileUploadField = Ext.extend(Ext.form.TextField,  {
    //emptyText: '请选择文件',
    /**
     * @cfg {String} buttonText The button text to display on the upload button (defaults to
     * 'Browse...').  Note that if you supply a value for {@link #buttonCfg}, the buttonCfg.text
     * value will be used instead if available.
     */
    buttonText: '选择文件',//'Browse...',
    buttonClickFunc: null,
    /**
     * @cfg {Boolean} buttonOnly True to display the file upload field as a button with no visible
     * text field (defaults to false).  If true, all inherited TextField members will still be available.
     */
    buttonOnly: false,
    /**
     * @cfg {Number} buttonOffset The number of pixels of space reserved between the button and the text field
     * (defaults to 3).  Note that this only applies if {@link #buttonOnly} = false.
     */
    buttonOffset: 3,
    /**
     * @cfg {Object} buttonCfg A standard {@link Ext.Button} config object.
     */

    // private
    readOnly: true,

    /**
     * @hide
     * @method autoSize
     */
    autoSize: Ext.emptyFn,

    // private
    initComponent: function(){
        WXTL.Widgets.CommonForm.FileUploadField.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event fileselected
             * Fires when the underlying file input field's value has changed from the user
             * selecting a new file from the system file selection dialog.
             * @param {WXTL.Widgets.CommonForm.FileUploadField} this
             * @param {String} value The file value returned by the underlying file input field
             */
            'fileselected'
        );
    },

    // private
    onRender : function(ct, position){
        WXTL.Widgets.CommonForm.FileUploadField.superclass.onRender.call(this, ct, position);

        this.wrap = this.el.wrap({cls:'x-form-field-wrap x-form-file-wrap'});
        this.el.addClass('x-form-file-text');
        this.el.dom.removeAttribute('name');
        this.createFileInput();

        var btnCfg = Ext.applyIf(this.buttonCfg || {}, {
            text: this.buttonText
        });
        this.button = new Ext.Button(Ext.apply(btnCfg, {
            renderTo: this.wrap,
            cls: 'x-form-file-btn' + (btnCfg.iconCls ? ' x-btn-icon' : '')
        }));

        if(this.buttonOnly){
            this.el.hide();
            this.wrap.setWidth(this.button.getEl().getWidth());
        }

        this.bindListeners();
        this.resizeEl = this.positionEl = this.wrap;
		Ext.fly(this.el).on('btnClick', function(){
            this.fireEvent('btnClick', this);
        }, this);
    },
    
    bindListeners: function(){
        this.fileInput.on({
            scope: this,
            mouseenter: function() {
                this.button.addClass(['x-btn-over','x-btn-focus']);
            },
            mouseleave: function(){
                this.button.removeClass(['x-btn-over','x-btn-focus','x-btn-click']);
            },
            mousedown: function(){
                this.button.addClass('x-btn-click');
            },
            mouseup: function(){
                this.button.removeClass(['x-btn-over','x-btn-focus','x-btn-click']);
            },
            change: function(){
                var v = this.fileInput.dom.value;
                if(Ext.isIE){
                    v = v.substring(v.lastIndexOf("\\") + 1);
                }
                this.setValue(v);
                this.fireEvent('fileselected', this, v);   
				if(this.buttonClickFunc != null){
					this.buttonClickFunc();
				}
            }
        });
    },
    
    createFileInput : function() {
        this.fileInput = this.wrap.createChild({
            id: this.getFileInputId(),
            name: this.name||this.getId(),
            cls: 'x-form-file',
            tag: 'input',
            type: 'file',
            size: 1
        });
    },
    
    reset : function(){
		if (this.fileInput) {
			this.fileInput.remove();
			this.createFileInput();
			this.bindListeners();
		}
        WXTL.Widgets.CommonForm.FileUploadField.superclass.reset.call(this);
    },

    // private
    getFileInputId: function(){
        return this.id + '-file';
    },

    // private
    onResize : function(w, h){
        WXTL.Widgets.CommonForm.FileUploadField.superclass.onResize.call(this, w, h);

        this.wrap.setWidth(w);

        if(!this.buttonOnly){
            var w = this.wrap.getWidth() - this.button.getEl().getWidth() - this.buttonOffset;
            this.el.setWidth(w);
        }
    },

    // private
    onDestroy: function(){
        WXTL.Widgets.CommonForm.FileUploadField.superclass.onDestroy.call(this);
        Ext.destroy(this.fileInput, this.button, this.wrap);
    },
    
    onDisable: function(){
        WXTL.Widgets.CommonForm.FileUploadField.superclass.onDisable.call(this);
        this.doDisable(true);
    },
    
    onEnable: function(){
        WXTL.Widgets.CommonForm.FileUploadField.superclass.onEnable.call(this);
        this.doDisable(false);

    },
    
    // private
    doDisable: function(disabled){
        this.fileInput.dom.disabled = disabled;
        this.button.setDisabled(disabled);
    },


    // private
    preFocus : Ext.emptyFn,

    // private
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
    }

});

Ext.reg('fileuploadfield', WXTL.Widgets.CommonForm.FileUploadField);

// backwards compat
Ext.form.FileUploadField = WXTL.Widgets.CommonForm.FileUploadField;

//==================================================================================================CommonData
//自定义数据载入控件
/*********************************************************************************
 * 控件类别：GroupingStore
 * 功能描述：GridPanel的数据集合
 *********************************************************************************/
Ext.namespace("WXTL.Widgets.CommonData");
WXTL.Widgets.CommonData.GroupingStore = Ext.extend(Ext.data.GroupingStore, {
    listeners: {
		loadexception: function(s){
			if(!this.reader.jsonData.success && this.reader.jsonData.info!= null && this.reader.jsonData.info=="对不起，您没有登录！"){
				Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
                    window.location.href = "login.htm";
                });
			}
		},
		load:function(a,b,c){
			if(!a.reader.jsonData.success){
				if(a.reader.jsonData.info!= null && a.reader.jsonData.info=="对不起，您没有登录！"){
					
					Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
	                    window.location.href = "login.htm";
	                });
				}
				else{
					//Ext.Msg.alert("温馨提示", a.reader.jsonData.info);
				}
				if(a.reader.jsonData.data == "false"){
					this.removeAll();
				}
			}
		}
    }
});
Ext.reg('GroupingStore', WXTL.Widgets.CommonData.GroupingStore);

//============================================================================================树形下拉框
/*********************************************************************************
 * 控件类别：ComboxWithTree
 * 功能描述：树形下拉框
 *********************************************************************************/
 WXTL.Widgets.CommonForm.ComboWithTree = Ext.extend(Ext.form.TriggerField,  {   
    /**  
     * @cfg {Boolean} readOnly  
     * 设置为只读状态  
     *   
     */  
    readOnly : false ,  
    enableKeyEvent: true,
    /**  
     * @cfg {String} displayField  
     * 用于显示数据的字段名  
     *   
     */  
    displayField : 'text',   
    /**  
     * @cfg {String} valueField  
     * 用于保存真实数据的字段名  
     */  
    valueField : null,   
    /**  
     * @cfg {String} hiddenName  
     * 保存真实数据的隐藏域名  
     */  
    hiddenName : null,   
    /**  
     * @cfg {Integer} listWidth  
     * 下拉框的宽度  
     */  
    listWidth : null,   
    /**  
     * @cfg {Integer} minListWidth  
     * 下拉框最小宽度  
     */  
    minListWidth : 50,   
    /**  
     * @cfg {Integer} listHeight  
     * 下拉框高度  
     */  
    listHeight : null,   
    /**  
     * @cfg {Integer} minListHeight  
     * 下拉框最小高度  
     */  
    minListHeight : 50,   
    /**  
     * @cfg {String} dataUrl  
     * 数据地址  
     */  
    dataUrl : null,   
    /**  
     * @cfg {Ext.tree.TreePanel} tree  
     * 下拉框中的树  
     */  
    tree : null,   
    /**  
     * @cfg {String} value  
     * 默认值  
     */  
    value : null,   
    /**  
     * @cfg {String} displayValue  
     * 用于显示的默认值  
     */  
    displayValue : null,  
    /**
     * 用于treeFilter过滤保存隐藏的节点
     */
    hiddenPkgs:[],
    /**
     * 用于treeFilter过滤保存匹配的节点
     */
    filterPkgs:[],
    /**  
     * @cfg {Object} baseParams  
     * 向后台传递的参数集合  
     */  
    baseParams : {}, 
	treeRootVisible:false,  
    /**  
     * @cfg {Object} treeRootConfig  
     * 树根节点的配置参数  
     */  
    treeRootConfig : {   
        id : '-1',   
        text : '-=请选择=-',   
        draggable:false
        },  
		 
    /**  
     * @cfg {String/Object} autoCreate  
     * A DomHelper element spec, or true for a default element spec (defaults to  
     * {tag: "input", type: "text", size: "24", autocomplete: "off"})  
     */  
    defaultAutoCreate : {tag: "input", type: "text", size: "24", autocomplete: "off"},   
  
    initComponent : function(){ 
        
        WXTL.Widgets.CommonForm.ComboWithTree.superclass.initComponent.call(this);   
        this.addEvents(   
                'select',   
                'expand',   
                'collapse',   
                'beforeselect'
        ); 
        this.on("keyup",function(){
        	if(!this.isExpanded()){
        		this.tree.expandAll();
        		this.onTriggerClick(); 
        	}
        	//this.onTriggerClick(); 	 
        	 this.filterTree(this,this.tree);        	
        });
        this.on("blur",function(){
        	if(this.filterPkgs.length == 0){
        		//判断是否有匹配项，如果没有，则赋空值
            	if(this.getValue() == null ){
            		var node = {
        				id : '',   
        		        text : '',   
        		        draggable:false
            		};
            		this.setValue(node);
            		return false;
            	}
            	else{
            		var node = this.tree.getNodeById(this.getValue());
            		this.onSelect(node);
            		//this.setValue(node);
            		return true;
            	}
        	}
        	
        });
    },   

 // private
    initEvents : function(){
        Ext.form.ComboBox.superclass.initEvents.call(this);

        this.keyNav = new Ext.KeyNav(this.el, {
            "up" : function(e){
                this.inKeyMode = true;
                this.selectPrev();
            },

            "down" : function(e){
                if(!this.isExpanded()){
                    this.onTriggerClick();
                }else{
                    this.inKeyMode = true;
                    this.selectNext();
                }
            },

            "enter" : function(e){
                this.onViewClick();
                //return true;
            },

            "esc" : function(e){
                this.collapse();
            },

            "tab" : function(e){
                this.onViewClick(false);
                return true;
            },

            scope : this,

            doRelay : function(foo, bar, hname){
                if(hname == 'down' || this.scope.isExpanded()){
                   return Ext.KeyNav.prototype.doRelay.apply(this, arguments);
                }
                return true;
            },

            forceKeyDown : true
        });
        this.queryDelay = Math.max(this.queryDelay || 10,
                this.mode == 'local' ? 10 : 250);
        this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
        if(this.typeAhead){
            this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
        }
        if(this.editable !== false){
            this.el.on("keyup", this.onKeyUp, this);
        }
        if(this.forceSelection){
            this.on('blur', this.doForce, this);
        }
    },
       
    initList : function(){   
        if(!this.list){   
            var cls = 'x-treefield-list';   
  
            this.list = new Ext.Layer({   
                shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false  
            });   
  
            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);   
            this.list.setWidth(lw);   
            this.list.swallowEvent('mousewheel');   
               
            this.innerList = this.list.createChild({cls:cls+'-inner'});   
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));   
            this.innerList.setHeight(this.listHeight || this.minListHeight);   
            if(!this.tree){   
                this.tree = this.createTree(this.innerList);       
            }   
            this.tree.on('click',this.select,this);   
            this.tree.render();   
        }   
    },   
    onRender : function(ct, position){   
        WXTL.Widgets.CommonForm.ComboWithTree.superclass.onRender.call(this, ct, position);   
        if(this.hiddenName){   
            this.hiddenField = this.el.insertSibling({tag:'input',    
                                                     type:'hidden',    
                                                     name: this.hiddenName,    
                                                     id: (this.hiddenId||this.hiddenName)},   
                    'before', true);   
            this.hiddenField.value =   
                this.hiddenValue !== undefined ? this.hiddenValue :   
                this.value !== undefined ? this.value : '';   
            this.el.dom.removeAttribute('name');   
        }   
        if(Ext.isGecko){   
            this.el.dom.setAttribute('autocomplete', 'off');   
        }   
  
        this.initList();
    },
	
    select : function(node){   
        if(this.fireEvent('beforeselect', node, this)!= false){   
            this.onSelect(node);   
            this.fireEvent('select', this, node);   
        }   
    },   
    
    onSelect:function(node){   
        this.setValue(node);   
        this.collapse();   
    }, 
//    keyup: function(){
//    	this.filterTree(this,this.tree);
//    	this.fireEvent('keyup', this, e);
//    },
    createTree:function(el){   
        var obj=this;
        var Tree = Ext.tree;   
       	var root = new Tree.AsyncTreeNode(this.treeRootConfig);
        var tree = new Ext.tree.TreePanel({//Tree.TreePanel({
            el: el,
            autoScroll: true,
            animate: true,
            containerScroll: true,
			root:root,
			rootVisible:this.treeRootVisible,//false,
            loader: new Tree.TreeLoader({
                dataUrl: this.dataUrl,
                listeners: {
                    "beforeload": function(treeloader, node){
                        treeloader.baseParams = obj.baseParams;
                    }
                }
                  
            })
        });
//		if(this.treeRootVisible){
//			tree.expandAll();
//		}
		tree.expandAll();
		//tree.expand();
		//tree.render();
        return tree;   
    },   
  
    filterTree: function(e,treeComb){
    	var obj = this;
	    //得到模糊匹配值
    	var text = e.getTextValue();
    	//定义treeFilter
    	var filter = new Ext.tree.TreeFilter(treeComb, {
    		clearBlank: true,
    		autoClear: true
		});
    	//先要显示上次隐藏掉的节点
    	Ext.each(obj.hiddenPkgs, function(n){
            n.ui.show();
        });
    	// 如果输入的数据不存在，就执行clear()
        if(!text){
            filter.clear();           
            return;
        }  

        treeComb.expandAll();

        // 根据输入制作一个正则表达式，'i'代表不区分大小写
        var re = new RegExp(Ext.escapeRe(text), 'i');
        
        filter.filterBy(function(n){
        	var textval = n.text;
        	// 只过滤叶子节点，这样省去枝干被过滤的时候，底下的叶子都无法显示
        	return !n.isLeaf() || re.test(n.text);
        });
        //清空上次隐藏的节点
        e.hiddenPkgs = [];
        var k = 0;
        e.filterPkgs=[];
        treeComb.root.cascade(function(n) {
        	
        	// 如果这个节点是叶子，且不匹配，就应该隐藏掉
        	if(n.isLeaf() && !re.test(n.text)){
        		n.ui.hide();
                obj.hiddenPkgs.push(n);
        	}
        	// 如果这个节点不是叶子，而且下面没有子节点，就应该隐藏掉
        	if(!n.isLeaf()&& n.ui.ctNode.offsetHeight<3&& !re.test(n.text)){
                n.ui.hide();
                obj.hiddenPkgs.push(n);
            }
            if(n.id!='root'){
                if(!n.isLeaf() && n.ui.ctNode.offsetHeight >= 3 && hasChild(n,re)==false&& !re.test(n.text)){
                    n.ui.hide();
                    obj.hiddenPkgs.push(n);
                }
            }
            if(re.test(n.text)){
            	k++;
            	obj.filterPkgs.push(n);
//            	if(k==1){
//            		var newValue = n.text;
//                    var len = newValue.length;
//                    var selStart = obj.getRawValue().length;
//                    if(selStart != len){
//                    	n.select();
//                		obj.setValue(n);
//                		obj.selectText(selStart, newValue.length);
//                    }
//            		
//            	}
            }
            

        });
        
        function hasChild(n,re){
            var str=false;
            n.cascade(function(n1){
                 if(re.test(n1.text)){
                     str = true;
                     return;
                 }
             });
             return str;
       }

	
	 },
 
    getValue : function(){   
        if(this.valueField){   
            return typeof this.value != 'undefined' ? this.value : '';   
        }else{   
            return WXTL.Widgets.CommonForm.ComboWithTree.superclass.getValue.call(this);   
        }   
    },   
	getTextValue : function(){   
        if(this.displayValue){   
            return typeof this.displayValue != 'undefined' ? this.displayValue : '';   
        }else{   
            return WXTL.Widgets.CommonForm.ComboWithTree.superclass.getValue.call(this);   
        }   
    },   
    setValue : function(node){   
        //if(!node)return;   
        var text,value;   
        if(node && typeof node == 'object'){   
            text = node[this.displayField];   
            value = node[this.valueField || this.displayField];   
        }else{   
            text = node;   
            value = node;   
                   
        }   
        if(this.hiddenField){   
            this.hiddenField.value = value;   
        }   
        WXTL.Widgets.CommonForm.ComboWithTree.superclass.setValue.call(this, text);   
        this.value = value;   
    },   
    onResize: function(w, h){   
        WXTL.Widgets.CommonForm.ComboWithTree.superclass.onResize.apply(this, arguments);   
        if(this.list && this.listWidth == null){   
            var lw = Math.max(w, this.minListWidth);   
            this.list.setWidth(lw);   
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));   
        }   
    },   
    validateBlur : function(){   
        return !this.list || !this.list.isVisible();      
    },   
    onDestroy : function(){   
        if(this.list){   
            this.list.destroy();   
        }   
        if(this.wrap){   
            this.wrap.remove();   
        }   
        WXTL.Widgets.CommonForm.ComboWithTree.superclass.onDestroy.call(this);   
    },   
    collapseIf : function(e){   
        if(!e.within(this.wrap) && !e.within(this.list)){   
            this.collapse();   
        }   
    },   
  
    collapse : function(){   
        if(!this.isExpanded()){   
            return;   
        }   
        this.list.hide();   
        Ext.getDoc().un('mousewheel', this.collapseIf, this);   
        Ext.getDoc().un('mousedown', this.collapseIf, this);   
        this.fireEvent('collapse', this);   
    },   
    expand : function(){   
        if(this.isExpanded() || !this.hasFocus){   
            return;   
        }   
        this.onExpand();   
        this.list.alignTo(this.wrap, this.listAlign);   
        this.list.show();   
        Ext.getDoc().on('mousewheel', this.collapseIf, this);   
        Ext.getDoc().on('mousedown', this.collapseIf, this);   
        this.fireEvent('expand', this);   
    },   
    onExpand : function(){   
        var doc = Ext.getDoc();   
        this.on('click',function(){alert(111)},this);   
    },   
    isExpanded : function(){   
        return this.list && this.list.isVisible();   
    },   
    onTriggerClick : function(){   
        if(this.disabled){   
            return;   
        }   
        if(this.isExpanded()){   
            this.collapse();   
        }else {   
            this.onFocus({});   
            this.expand();   
        }   
        this.el.focus();   
    }   
});   
Ext.reg('ComboWithTree', WXTL.Widgets.CommonForm.ComboWithTree);  

WXTL.Widgets.CommonForm.ClickLabel = Ext.extend(Ext.form.Label, {
    initComponent: function(){
        WXTL.Widgets.CommonForm.ClickLabel.superclass.initComponent.call(this);
        this.addEvents('click');
    },
    onRender: function(ct, position){
        if (!this.el) {
            if (this.src && this.src != "") {
                this.el = document.createElement('img');
                this.el.src = this.src;
                if (this.forId) {
                    this.el.setAttribute('htmlFor', this.forId);
                }
            }
            
        }
        
        WXTL.Widgets.CommonForm.ClickLabel.superclass.onRender.call(this, ct, position);
        
        Ext.fly(this.el).on('click', function(){
            this.fireEvent('click', this);
        }, this);
    }
});

Ext.reg('ClickLabel', WXTL.Widgets.CommonForm.ClickLabel);


//=================================================主题
WXTL.Widgets.CommonForm.ThemeCycleButton = Ext.extend(Ext.CycleButton, {  
    /**  
     * file 你的css名称  
     * text 下拉框的名称  
     * iconCls 设置图标css 
     */              
    cssItems:[   
		{file: 'ext-all.css', text: '默认主题 ',checked:true,  iconCls: 'icon-blue-theme'}, 
        {file: 'ext-all.css', text: '蓝色月影 ',  iconCls: 'icon-blue-theme'}, 
        {file: 'xtheme-gray.css', text: '灰色回忆 ', iconCls: 'icon-gray-theme'},   
        {file: 'xtheme-slate.css', text: '深蓝心情 ', iconCls: 'icon-slate-theme'},   
        {file: 'xtheme-black.css', text: '黑色物语 ', iconCls: 'icon-black-theme'},   
        {file: 'xtheme-olive.css', text: '绿色芳香 ', iconCls: 'icon-olive-theme'}, 
		{file: 'xtheme-chocolate.css', text: '巧克力味 ', iconCls: 'icon-chocolate-theme'},  
		{file: 'xtheme-gray-extend.css', text: '香远逸清 ', iconCls: 'icon-gray-extend-theme'},
		{file: 'xtheme-peppermint.css', text: '永恒不变 ', iconCls: 'icon-peppermint-theme'},
        {file: 'xtheme-purple.css', text: '诱惑紫色 ', iconCls: 'icon-purple-theme'}   
    ],   
    themeVar:'style',   
    headVar: 'head',   
    //cssPath是你放css的位置，这个路径要是弄错了，神仙也出不来的   
    cssPath:'extjs2.2/resources/css/',   
    initComponent: function() {   
  
        Ext.apply(this, {   
            showText: true,   
            prependText: ' ',   
            items: this.cssItems   
        });   
        if(Ext.state.Manager){   
            var selectedTheme = Ext.state.Manager.get(this.themeVar); 
            if(selectedTheme){    
                for(var i=0; i<this.items.length;i++){   
                    if (this.items[i].file == selectedTheme){  
                        this.items[i].checked = true;   
//                      this.setActiveItem(this.items[i], true); //error ??  
                        this.changeHandler(this, this.items[i]);   
//                      this.changeHandler.defer(1000, this, [this, this.items[i]]); 
                        break;  
                    }  
                }  
            }   
        }   
        WXTL.Widgets.CommonForm.ThemeCycleButton.superclass.initComponent.apply(this, arguments);  
    },   
    changeHandler: function(o, i){   
        if(Ext.state.Manager.getProvider()) {  
            Ext.state.Manager.set(this.themeVar, i.file);  
            Ext.state.Manager.set(this.headVar, i.head);   
        }   
        Ext.util.CSS.swapStyleSheet(this.themeVar, this.cssPath + i.file);  
        Ext.util.CSS.getRule('.x-panel-body', true).style.background = 'url(' + i.head + ')';  
		document.getElementById("imgLogo").src="jspack/product/common/Images/" + i.iconCls + ".jpg";
//      Ext.util.CSS.updateRule('.x-panel-body', 'background', 'url(' + i.head + ')'); 
        if(Ext.getCmp('viewport')){ 
            Ext.getCmp('viewport').layout.center.panel.setSize(Ext.getCmp('viewport').layout.center.getSize().width + 1); 
            Ext.getCmp('viewport').doLayout(); 
            Ext.getCmp('viewport').layout.center.panel.setSize(Ext.getCmp('viewport').layout.center.getSize().width - 1); 
            Ext.getCmp('viewport').doLayout();   
        }   
    }   
});   
Ext.reg('ThemeCycleButton', WXTL.Widgets.CommonForm.ThemeCycleButton);  


WXTL.Widgets.CommonGrid.GridPanelOriginal = Ext.extend(Ext.grid.EditorGridPanel, {
    title: "查询结果",
    style: 'padding:5px 0px 0px 0px',
    frame: true,
    //分页数
    pageSize: 12,
    //是否分页属性，默认true
    needPage: true,
    //是否有菜单栏，默认true
    needMenu: true,
    //是否显示右击菜单，默认true
    needRightMenu: false,
    //表结构
    structure: '1',
    //载入效果
    loadMask: true,
    //stripeRows: true,
    autoExpandColumn: 7,
    // 超过长度带自动滚动条
    autoScroll: true,
    //自适应数据
    autoHeight: true,
    //添加调用方法名称
    inertMethod: '',
    //修改调用方法名称
    updateMethod: '',
    //删除调用方法名称
    deleteMethod: '',
    //修改单字段调用路径

    afterEditURL: '',
    initComponent: function(){
        if (this.structure != '') {
            this.initStructure();
        }
        WXTL.Widgets.CommonGrid.GridPanel.superclass.initComponent.call(this);
        var obj = this;
        for (var i = 1; i <= 10; i++) {
            if (obj.colModel.lookup[i] != null && obj.colModel.lookup[i].editor != null){
                obj.colModel.lookup[i].editor.addListener("complete", function(){
                    obj.getStore().reload()
                });
            }
        }
    },
    onRender: function(ct, position){
         if(this.getColumnModel().getColumnId(0) != "checker"){
			this.getSelectionModel().singleSelect=true;
		}
		else{
			this.getSelectionModel().singleSelect=false;
		}

        WXTL.Widgets.CommonGrid.GridPanel.superclass.onRender.call(this, ct, position);
        
    },
    initStructure: function(){
        var ogrid = this;
        this.view = new Ext.grid.GroupingView({
            // 自动填充
            enableGroupingMenu:false,
            forceFit: true,
            sortAscText: '正序排列',
            sortDescText: '倒序排列',
            columnsText: '列显示/隐藏',
            groupByText: '根据本列分组',
            showGroupsText: '是否采用分组显示'
        });
        // 生成分页工具栏

        if (this.needPage) {
            var pagingToolbar = new Ext.PagingToolbar({
                displayInfo: true,
                store: this.store,
                emptyMsg: '没有符合条件的记录',
                //显示右下角信息

                displayInfo: true,
                displayMsg: '当前记录 {0} -- {1} 条 共 {2} 条记录',
                prevText: "上一页",
                nextText: "下一页",
                refreshText: "刷新",
                lastText: "最后页",
                firstText: "第一页",
                beforePageText: "当前页",
                afterPageText: "共{0}页"
            });
            pagingToolbar.pageSize = this.pageSize;
            this.bbar = pagingToolbar;
            this.bottomToolbar = this.bbar;
            
            var oSearch = new Ext.form.TextField({
                id: 'search',
                xtype: 'textfield',
                align: 'right'
            
            });
            
        };
        if (this.needMenu) {
            var keyField = this.keyField;
            // 生成顶部工具条

            var topToolbar = new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "新增",
                    handler: function(){
                        ogrid.doInsert();
                    }
                }, "", "-", "", {
                    iconCls: 'editicon',
                    text: "修改",
                    handler: function(){
                        ogrid.doEdit();
                    }
                }, "", "-", "", {
                    iconCls: 'deleteicon',
                    text: "删除",
                    handler: function(){
                        ogrid.doDelete();
                    }
                }]
            });
            this.tbar = topToolbar;
            this.topToolbar = this.tbar;
        };
        
        if (this.needRightMenu) {
            //-------------------------------------------------------右键菜单
            var ServiceCodeClick = new Ext.menu.Menu({
                items: [{
                    text: '新增',
                    iconCls: 'addicon',
                    handler: function(){
                        ogrid.doInsert();
                        ogrid.getStore().reload();
                    }
                }, {
                    text: '修改',
                    iconCls: 'editicon',
                    handler: function(){
                        ogrid.doEdit();
                    }
                }, {
                    text: '删除',
                    iconCls: 'deleteicon',
                    handler: function(){
                        ogrid.doDelete();
                    }
                }, {
                    text: '刷新',
                    iconCls: 'refreshicon',
                    handler: function(){
                        ogrid.getStore().reload();
                    }
                }]
            });
            //===============================================================添加监听事件
            this.addListener("rowcontextmenu", function(grid, rowIndex, e){
                e.stopEvent();
                ServiceCodeClick.showAt(e.getXY());
            });
            this.addListener("afteredit", function(e){
                ogrid.afterEdit(e);
            });
        }
        
    },
    /*
     * @功能：编辑用户选中的数据 @参数：id 为空则为新增数据 不为空则为修改数据

     *
     */
    doInsert: function(){
        eval(this.inertMethod + "()");
    },
    /*
     * @功能：编辑用户选中的数据 @参数：id 为空则为新增数据 不为空则为修改数据

     *
     */
    doEdit: function(id){
        var row = this.getSelectionModel().getSelections();
        if (row.length == 0) {
            Ext.Msg.alert("温馨提示", "请您选择一条记录!");
        }
        else {
            if (row.length > 1) {
                Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
            }
            else {
                if (row.length == 1) {
                    eval(this.updateMethod + "(row[0])");
                }
            }
        }
    },
    
    /*
     * @功能：删除所有选中记录支持批量删除
     *
     */
    doDelete: function(){
        var ogrid = this;
        var row = this.getSelectionModel().getSelections();
        if (row.length == 0) {
            Ext.Msg.alert("温馨提示", "请您选择记录!");
        }
        else {
            Ext.Msg.confirm("温馨提示!", "您确定要删除信息吗?", function(btn){
                if (btn == "yes") {
                    eval(ogrid.deleteMethod + "(row)");
                    //ogrid.getStore().reload();
                }
                else {
                
                }
            });
        }
    },
    afterEdit: function(e){
    
        var ogrid = this;
        var g = e.grid;
        var r = e.record;
        var f = e.field;
        var v = e.value;
        var orgin = e.originalValue;
        var row = e.row;
        var col = e.column;
        Ext.Ajax.request({
            url: this.afterEditURL,
            method: "POST",
            params: {
                flag: "update",
                field: f,
                value: v,
                id: r.id
            },
            success: function(response, option){
                ogrid.getStore().reload();
            },
            failure: function(){
                Ext.Msg.alert("不好意思", "修改失败了!");
            }
        });
    }
});

//======================Portal Panel拖拽功能Start=======================
/*
 * Ext JS Library 2.0
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */
Ext.namespace("Ext.ux");
Ext.ux.Portal = Ext.extend(Ext.Panel, {
    layout: 'column',
    autoScroll:true,
    cls:'x-portal',
    defaultType: 'portalcolumn',

    initComponent : function(){
        Ext.ux.Portal.superclass.initComponent.call(this);
        this.addEvents({
            validatedrop:true,
            beforedragover:true,
            dragover:true,
            beforedrop:true,
            drop:true
        });
    },

    initEvents : function(){
        Ext.ux.Portal.superclass.initEvents.call(this);
        this.dd = new Ext.ux.Portal.DropZone(this, this.dropConfig);
    }
});
Ext.reg('portal', Ext.ux.Portal);


Ext.ux.Portal.DropZone = function(portal, cfg){
    this.portal = portal;
    Ext.dd.ScrollManager.register(portal.body);
    Ext.ux.Portal.DropZone.superclass.constructor.call(this, portal.bwrap.dom, cfg);
    portal.body.ddScrollConfig = this.ddScrollConfig;
};

Ext.extend(Ext.ux.Portal.DropZone, Ext.dd.DropTarget, {
    ddScrollConfig : {
        vthresh: 50,
        hthresh: -1,
        animate: true,
        increment: 200
    },

    createEvent : function(dd, e, data, col, c, pos){
        return {
            portal: this.portal,
            panel: data.panel,
            columnIndex: col,
            column: c,
            position: pos,
            data: data,
            source: dd,
            rawEvent: e,
            status: this.dropAllowed
        };
    },

    notifyOver : function(dd, e, data){
        var xy = e.getXY(), portal = this.portal, px = dd.proxy;

        // case column widths
        if(!this.grid){
            this.grid = this.getGrid();
        }

        // handle case scroll where scrollbars appear during drag
        var cw = portal.body.dom.clientWidth;
        if(!this.lastCW){
            this.lastCW = cw;
        }else if(this.lastCW != cw){
            this.lastCW = cw;
            portal.doLayout();
            this.grid = this.getGrid();
        }

        // determine column
        var col = 0, xs = this.grid.columnX, cmatch = false;
        for(var len = xs.length; col < len; col++){
            if(xy[0] < (xs[col].x + xs[col].w)){
                cmatch = true;
                break;
            }
        }
        // no match, fix last index
        if(!cmatch){
            col--;
        }

        // find insert position
        var p, match = false, pos = 0,
            c = portal.items.itemAt(col),
            items = c.items.items;

        for(var len = items.length; pos < len; pos++){
            p = items[pos];
            var h = p.el.getHeight();
            if(h !== 0 && (p.el.getY()+(h/2)) > xy[1]){
                match = true;
                break;
            }
        }

        var overEvent = this.createEvent(dd, e, data, col, c,
                match && p ? pos : c.items.getCount());

        if(portal.fireEvent('validatedrop', overEvent) !== false &&
           portal.fireEvent('beforedragover', overEvent) !== false){

            // make sure proxy width is fluid
            px.getProxy().setWidth('auto');

            if(p){
                px.moveProxy(p.el.dom.parentNode, match ? p.el.dom : null);
            }else{
                px.moveProxy(c.el.dom, null);
            }

            this.lastPos = {c: c, col: col, p: match && p ? pos : false};
            this.scrollPos = portal.body.getScroll();

            portal.fireEvent('dragover', overEvent);

            return overEvent.status;;
        }else{
            return overEvent.status;
        }

    },

    notifyOut : function(){
        delete this.grid;
    },

    notifyDrop : function(dd, e, data){
        delete this.grid;
        if(!this.lastPos){
            return;
        }
        var c = this.lastPos.c, col = this.lastPos.col, pos = this.lastPos.p;

        var dropEvent = this.createEvent(dd, e, data, col, c,
                pos !== false ? pos : c.items.getCount());

        if(this.portal.fireEvent('validatedrop', dropEvent) !== false &&
           this.portal.fireEvent('beforedrop', dropEvent) !== false){

            dd.proxy.getProxy().remove();
            dd.panel.el.dom.parentNode.removeChild(dd.panel.el.dom);
            if(pos !== false){
                c.insert(pos, dd.panel);
            }else{
                c.add(dd.panel);
            }
            
            c.doLayout();

            this.portal.fireEvent('drop', dropEvent);

            // scroll position is lost on drop, fix it
            var st = this.scrollPos.top;
            if(st){
                var d = this.portal.body.dom;
                setTimeout(function(){
                    d.scrollTop = st;
                }, 10);
            }

        }
        delete this.lastPos;
    },

    // internal cache of body and column coords
    getGrid : function(){
        var box = this.portal.bwrap.getBox();
        box.columnX = [];
        this.portal.items.each(function(c){
             box.columnX.push({x: c.el.getX(), w: c.el.getWidth()});
        });
        return box;
    }
});
/*
 * Ext JS Library 2.0
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.ux.PortalColumn = Ext.extend(Ext.Container, {
    layout: 'anchor',
    autoEl: 'div',
    defaultType: 'portlet',
    cls:'x-portal-column'
});
Ext.reg('portalcolumn', Ext.ux.PortalColumn);
/*
 * Ext JS Library 2.0
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.ux.Portlet = Ext.extend(Ext.Panel, {
    anchor: '100%',
    frame:true,
    collapsible:true,
    draggable:true,
    cls:'x-portlet'
});
Ext.reg('portlet', Ext.ux.Portlet);
//=======================PortalPanel拖拽功能END==========================================

//==========重写RadioGroup控件getValue和setValue方法===Start=============================
Ext.override(Ext.form.RadioGroup, {   
    getValue: function(){   
        var v;   
        if (this.rendered) {   
            this.items.each(function(item){   
                if (!item.getValue())    
                    return true;   
                v = item.getRawValue();   
                return false;   
            });   
        }   
        else {   
            for (var k in this.items) {   
                if (this.items[k].checked) {   
                    v = this.items[k].inputValue;   
                    break;   
                }   
            }   
        }   
        return v;   
    },   
    setValue: function(v){   
        if (this.rendered)    
            this.items.each(function(item){   
                item.setValue(item.getRawValue() == v);   
            });   
        else {   
            for (var k in this.items) {   
                this.items[k].checked = this.items[k].inputValue == v;   
            }   
        }   
    }   
}); 
//==========重写RadioGroup控件getValue和setValue方法===End===============================
//==========重写CheckboxGroup控件getValue和setValue方法===Start=============================
Ext.override(Ext.form.BasicForm,{  
    findField : function(id){          
        var field = this.items.get(id);          
        if(!field){  
            this.items.each(function(f){  
                if(f.isXType('radiogroup')||f.isXType('checkboxgroup')){  
                    f.items.each(function(c){  
                        if(c.isFormField && (c.dataIndex == id || c.id == id || c.getName() == id)){  
                            field = c;  
                            return false;  
                        }  
                    });  
                }  
                                  
                if(f.isFormField && (f.dataIndex == id || f.id == id || f.getName() == id)){  
                    field = f;  
                    return false;  
                }  
            });  
        }  
        return field || null;  
    }   
}); 
Ext.override(Ext.form.CheckboxGroup, {
    getValue: function() {
		var v = [];
		this.items.each(function(item) {
			if (item.getValue()) {
				v.push(item.getRawValue());
			} else {
				v.push('');
			}
		});
		return v;
	},
	setValue: function(vals) {
		var a = [];
		if (Ext.isArray(vals)) {
			a = vals;
		} else {
			a = [vals];
		}
		this.items.each(function(item) {
			item.setValue(false); // reset value
			for ( var i = 0 ; i < a.length ; i ++ ) {
				var val = a[i];
				if ( val == item.getRawValue() ) {
					item.setValue(true);
				}
			};
		});
	}
});

//==========重写CheckboxGroup控件getValue和setValue方法===End===============================

/*********************************************************
*功能描述:带复选框的下拉框
**********************************************************/

// add RegExp.escape if it has not been already added
if('function' !== typeof RegExp.escape) {
	RegExp.escape = function(s) {
		if('string' !== typeof s) {
			return s;
		}
		// Note: if pasting from forum, precede ]/\ with backslash manually
		return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}; // eo function escape
};
// create namespace
Ext.ns('Ext.ux.form');
/**
 *
 * @class Ext.ux.form.LovCombo
 * @extends Ext.form.ComboBox
 */
Ext.ux.form.LovCombo = Ext.extend(Ext.form.ComboBox, {

	// {{{
    // configuration options
	/**
	 * @cfg {String} checkField name of field used to store checked state.
	 * It is automatically added to existing fields.
	 * Change it only if it collides with your normal field.
	 */
	 checkField:'checked'

	/**
	 * @cfg {String} separator separator to use between values and texts
	 */
    ,separator:','

	/**
	 * @cfg {String/Array} tpl Template for items. 
	 * Change it only if you know what you are doing.
	 */
	// }}}
    // {{{
    ,initComponent:function() {
        
		// template with checkbox
		if(!this.tpl) {
			this.tpl = 
				 '<tpl for=".">'
				+'<div class="x-combo-list-item">'
				+'<img src="' + Ext.BLANK_IMAGE_URL + '" '
				+'class="ux-lovcombo-icon ux-lovcombo-icon-'
				+'{[values.' + this.checkField + '?"checked":"unchecked"' + ']}">'
				+'<div class="ux-lovcombo-item-text">{' + (this.displayField || 'text' )+ '}</div>'
				+'</div>'
				+'</tpl>'
			;
		}
 
        // call parent
        Ext.ux.form.LovCombo.superclass.initComponent.apply(this, arguments);

		// install internal event handlers
		this.on({
			 scope:this
			,beforequery:this.onBeforeQuery
			,blur:this.onRealBlur
		});

		// remove selection from input field
		this.onLoad = this.onLoad.createSequence(function() {
			if(this.el) {
				var v = this.el.dom.value;
				this.el.dom.value = '';
				this.el.dom.value = v;
			}
		});
 
    } // e/o function initComponent
    // }}}
	// {{{
	/**
	 * Disables default tab key bahavior
	 * @private
	 */
	,initEvents:function() {
		Ext.ux.form.LovCombo.superclass.initEvents.apply(this, arguments);

		// disable default tab handling - does no good
		this.keyNav.tab = false;

	} // eo function initEvents
	// }}}
	// {{{
	/**
	 * clears value
	 */
	,clearValue:function() {
		this.value = '';
		this.setRawValue(this.value);
		this.store.clearFilter();
		this.store.each(function(r) {
			r.set(this.checkField, false);
		}, this);
		if(this.hiddenField) {
			this.hiddenField.value = '';
		}
		this.applyEmptyText();
	} // eo function clearValue
	// }}}
	// {{{
	/**
	 * @return {String} separator (plus space) separated list of selected displayFields
	 * @private
	 */
	,getCheckedDisplay:function() {
		var re = new RegExp(this.separator, "g");
		return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ');
	} // eo function getCheckedDisplay
	// }}}
	// {{{
	/**
	 * @return {String} separator separated list of selected valueFields
	 * @private
	 */
	,getCheckedValue:function(field) {
		field = field || this.valueField;
		var c = [];

		// store may be filtered so get all records
		var snapshot = this.store.snapshot || this.store.data;

		snapshot.each(function(r) {
			if(r.get(this.checkField)) {
				c.push(r.get(field));
			}
		}, this);

		return c.join(this.separator);
	} // eo function getCheckedValue
	// }}}
	// {{{
	,expandSelect: function(){
		var c = [];
		c = this.getRawValue().split(this.separator);
		// store may be filtered so get all records
		var snapshot = this.store.snapshot || this.store.data;	
		var displayField = this.displayField;
		
		var isTrue = false;		
		if(this.getRawValue().indexOf(this.separator) > -1){
			snapshot.each(function(r) {
				isTrue = false;	
				for(var i= 0; i<c.length; i++){
					if(r.get(displayField) == c[i].replace(/(^\s*)|(\s*$)/g, "")) {
						isTrue = true;	
						break;					
					}
				}
				r.set(this.checkField, isTrue);
			}, this);
		}
		else if(this.getRawValue() != ""){
			snapshot.each(function(r) {
				isTrue = false;	
				if(r.get(displayField) == c) {
					isTrue = true;			
				}
				r.set(this.checkField, isTrue);
			}, this);
		}
		else{
			snapshot.each(function(r) {
				r.set(this.checkField, false);
			}, this);
		}	
		this.store.data = snapshot;	
	}
	/**
	 * beforequery event handler - handles multiple selections
	 * @param {Object} qe query event
	 * @private
	 */
	,onBeforeQuery:function(qe) {
		this.expandSelect();
		qe.query = qe.query.replace(new RegExp(this.getCheckedDisplay() + '[ ' + this.separator + ']*'), '');
	} // eo function onBeforeQuery
	// }}}
	// {{{
	/**
	 * blur event handler - runs only when real blur event is fired
	 */
	,onRealBlur:function() {
		this.list.hide();
		var rv = this.getRawValue();
		var rva = rv.split(new RegExp(RegExp.escape(this.separator) + ' *'));
		var va = [];
		var snapshot = this.store.snapshot || this.store.data;

		// iterate through raw values and records and check/uncheck items
		Ext.each(rva, function(v) {
			snapshot.each(function(r) {
				if(v === r.get(this.displayField)) {
					va.push(r.get(this.valueField));
				}
			}, this);
		}, this);
		this.setValue(va.join(this.separator));
		this.store.clearFilter();
	} // eo function onRealBlur
	// }}}
	// {{{
	/**
	 * Combo's onSelect override
	 * @private
	 * @param {Ext.data.Record} record record that has been selected in the list
	 * @param {Number} index index of selected (clicked) record
	 */
	,onSelect:function(record, index) {
        if(this.fireEvent('beforeselect', this, record, index) !== false){

			// toggle checked field
			record.set(this.checkField, !record.get(this.checkField));

			// display full list
			if(this.store.isFiltered()) {
				this.doQuery(this.allQuery);
			}

			// set (update) value and fire event
			this.setValue(this.getCheckedValue());
            this.fireEvent('select', this, record, index);
        }
	} // eo function onSelect
	// }}}
	// {{{
	/**
	 * Sets the value of the LovCombo
	 * @param {Mixed} v value
	 */
	,setValue:function(v) {
		if(v) {
			v = '' + v;
			if(this.valueField) {
				this.store.clearFilter();
				this.store.each(function(r) {
					var checked = !(!v.match(
						 '(^|' + this.separator + ')' + RegExp.escape(r.get(this.valueField))
						+'(' + this.separator + '|$)'))
					;

					r.set(this.checkField, checked);
				}, this);
				this.value = this.getCheckedValue();
				this.setRawValue(this.getCheckedDisplay());
				if(this.hiddenField) {
					this.hiddenField.value = this.value;
				}
			}
			else {
				this.value = v;
				this.setRawValue(v);
				if(this.hiddenField) {
					this.hiddenField.value = v;
				}
			}
			if(this.el) {
				this.el.removeClass(this.emptyClass);
			}
		}
		else {
			this.clearValue();
		}
	} // eo function setValue
	// }}}
	// {{{
	/**
	 * Selects all items
	 */
	,selectAll:function() {
        this.store.each(function(record){
            // toggle checked field
            record.set(this.checkField, true);
        }, this);

        //display full list
        this.doQuery(this.allQuery);
        this.setValue(this.getCheckedValue());
    } // eo full selectAll
	// }}}
	// {{{
	/**
	 * Deselects all items. Synonym for clearValue
	 */
    ,deselectAll:function() {
		this.clearValue();
    } // eo full deselectAll 
	// }}}

}); // eo extend
 
// register xtype
Ext.reg('lovcombo', Ext.ux.form.LovCombo); 
 
// eof
//===================带复选框的下拉框结束======================