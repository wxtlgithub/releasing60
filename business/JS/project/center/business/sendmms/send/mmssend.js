/*
 *普通彩信发送页
 */
Ext.namespace('Js.Center.SendMMS.MMSSend');
Js.Center.SendMMS.MMSSend.func = function(show, row){
    if (Ext.get("Js.Center.SendMMS.MMSSend.MMSSendPanel") == null) {
        //=============================================================通道组下拉列表数据定义
        var activeTabPanel;
        Js.Center.SendMMS.MMSSend.UserGroupStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.YXTUserGroupURL,
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
                    mapping: "vc2usergroupname"
                }, {
                    name: 'inputValue',
                    mapping: "numusergroupid"
                }, {
                    name: 'checked'
                }]
            }),
            baseParams: {
                flag: "selectallbyprodid",
                prodId: "",
                columnlist: "numusergroupid,vc2usergroupname"
            }
        });
        var groupPanel = new WXTL.Widgets.CommonPanel.CheckBoxGroupPanel({
            store: Js.Center.SendMMS.MMSSend.UserGroupStore,
            defaultItemsName: 'numusergroupid',
            defaultItemsboxLable: '对不起，没有相关客户组信息。',
            style: "padding:5px 5px 5px 5px",
            id: "Js.Center.SendMMS.MMSSend.remoteCheckboxGroup",
            numcolumns: 3,
            blankText: "请选择客户组",
            allowBlank: false,
            name: "客户组："
        });
        var productCombox = new WXTL.Widgets.CommonForm.ComboBox({
            xtype: "xComboBox",
            name: "numproductid",
            hiddenName: "numproductid",
            id: 'Js.Center.SendMMS.MMSSend.numproductid',
            emptyText: "-=请选择=-",
            allowBlank: false,
            isNeedDefaultChoose:false,
            blankText: "请选择通道组",
            fieldLabel: "<font color=red>选择通道组</font>",
            //readOnly: true,
            mode: "local",
            displayField: "vc2name",
            valueField: "numprodid",
            triggerAction: "all",
            store: Js.Center.Common.ProductStore,
            
            initDefault:function(o){
		    	
		    	 //自动添加一个空选择项
            	Js.Center.SendMMS.MMSSend.obj = this;
		        o.on("blur", function(){
		        	Js.Center.SendMMS.MMSSend.count = o.store.getCount();
		        	if(Js.Center.SendMMS.MMSSend.count >0){
		        		return true;
		            }
		        	else{
		        		o.setValue('');
			            return false;
		        	}
		        });
		        o.on('beforequery', function(e){   
		                  
		           Js.Center.SendMMS.MMSSend.combo = e.combo;     
		            if(!e.forceAll){     
		                var input = Js.Center.SendMMS.MMSSend.combo.getRawValue();//e.query;     
		                // 检索的正则   
		                var regExp = new RegExp(".*" + input + ".*");   
		                // 执行检索   
		                Js.Center.SendMMS.MMSSend.combo.store.filterBy(function(record,id){     
		                    // 得到每个record的项目名称值   
		                    var text = record.get(Js.Center.SendMMS.MMSSend.combo.displayField);     
		                    return regExp.test(text);    
		                });   
		                Js.Center.SendMMS.MMSSend.combo.expand();     
		                return false;   
		            }   
		        });
		    	this.store.on("load", function(a){
//		    		alert(a.data.length);
		    			if(a.data.length == 1){
		    			
			    				Js.Center.SendMMS.MMSSend.obj.setValue(a.data.items[0].id);
			    				Js.Center.SendMMS.MMSSend.obj.fireEvent('select', Js.Center.SendMMS.MMSSend.obj,a.data.items[0]);
		    			}
		    				else if(a.data.length == 2){
					    		if(a.data.items[0].data.numprodid == ''){
					    			Js.Center.SendMMS.MMSSend.obj.setValue(a.data.items[1].id);
					    			Js.Center.SendMMS.MMSSend.obj.fireEvent('select', Js.Center.SendMMS.MMSSend.obj,a.data.items[1]);
						    	
					    		} 
					    	} 
			    						 
		    	}); 
		    	
		    	
	    },
	    initComponent: function(){
	    	this.addEvents(   
	                'select',   
	                'expand',   
	                'collapse',   
	                'beforeselect'
	        ); 
//	        this.initCancleText(this);
	        this.initDefault(this);
	        WXTL.Widgets.CommonForm.ComboBox.superclass.initComponent.call(this);
	        this.on("keyup",function(f,e){
	        	this.doQuery();  	
	        });
	    },
           
        	listeners: {
        		'select': function(combox, record, numidex){
        			var productId = record.data.numprodid;
        			Js.Center.SendMMS.MMSSend.UserGroupStore.baseParams={
        	                flag: "selectallbyprodid",
        					prodId: productId
        			};
        			Js.Center.SendMMS.MMSSend.UserGroupStore.reload();
        		}
        	}
         });
    Js.Center.SendMMS.MMSSend.smsFieldSet = new Ext.Panel({
            layout: 'column',
            labelWidth: 60,
            items: [{
                columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:10px 0 0 0px",
                items: [{
                    xtype: 'hidden',
                    fieldLabel: "发送方式 1、栏目 2、客户组 3、持仓股票 4、文件  5、手机号码",
                    name: 'numsendtype',
                    id: 'Js.Center.SendMMS.MMSSend.sendnumsendtype',
                    value: 'Js.Center.SendMMS.MMSSend.sendbyusergroup'
                }, {
                    xtype: 'xDateTime',
                    fieldLabel: '发送时间',
                    layout: 'form',
                    name: "datstarttime",
                    id: "Js.Center.SendMMS.MMSSend.datstarttime",
                    timeFormat: 'H:i:s',
                    value: WXTL.Common.dateTime.getNow(),
                    timeConfig: {
                        altFormats: 'H:i:s',
                        allowBlank: true,
                        invalidText: '{0} 是无效的时间-必须符合格式为：H:i:s'
                    },
                    dateFormat: 'Y-m-d',
                    dateConfig: {
                        altFormats: 'Y-m-d',
                        allowBlank: true
                    }
                }, {
                    xtype: 'hidden',
                    fieldLabel: '要发送的彩信',
                    id: "Js.Center.SendMMS.MMSSend.nummmsid",
                    name: "nummmsid"
                }, {
                    xtype: 'hidden',
                    fieldLabel: '发送彩信标题',
                    id: "Js.Center.SendMMS.MMSSend.vc2name",
                    name: "vc2name"
                }, {
                    xtype: 'hidden',
                    fieldLabel: '资源编号',
                    id: "Js.Center.SendMMS.MMSSend.vc2centerid",
                    name: "vc2centerid"
                }
                ]
            }, {
                columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:10px 0 0 0px",
                items: [{
                    xtype: 'xDateTime',
                    fieldLabel: '结束时间',
                    layout: 'form',
                    name: "datendtime",
					addDays:1,
                    id: "Js.Center.SendMMS.MMSSend.datendtime",
                    timeFormat: 'H:i:s',
                    value: WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), 1),
                    timeConfig: {
                        altFormats: 'H:i:s',
                        allowBlank: true,
                        invalidText: '{0} 是无效的时间-必须符合格式为：H:i:s'
                    },
                    dateFormat: 'Y-m-d',
                    dateConfig: {
                        altFormats: 'Y-m-d',
                        allowBlank: true
                    }
                }]
            }]
        });
        Js.Center.SendMMS.MMSSend.MMSinfo();
        Js.Center.SendMMS.MMSSend.MMSSendPanel = new Ext.FormPanel({
            id: "Js.Center.SendMMS.MMSSend.MMSSendPanel",
            fileUpload: true,
            labelAlign: 'left',
            frame: true,
            labelWidth: 80,
            style: "background-color:#e7e8f0",
            bodyStyle: 'padding:5px 0 0 5px;',
            defaults: {
                msgTarget: "side"
            },
            items: [{
                layout: 'column',
                items: [{
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    items: [productCombox]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    items: [{
                        xtype: "hidden",
                        name: "numpriority",
                        fieldLabel: "<font color=red>优先级</font>",
                        hiddenName: "numpriority",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        allowBlank: false,
                        blankText: "优先级类型不允许为空",
                        emptyText: "请选择",
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["正常", "0"], ["及时", "1"], ["紧急", "2"]]
                        }),
                        value: 0
                    }]
                }]
            }, {
                xtype: 'tabpanel',
                layoutOnTabChange: true,                
                plain: true,
                activeTab: 0,
                height: 130,
                items: [{
                    title: '按客户组发送',
                    autoScroll: true,
                    layout: 'form',
                    defaultType: 'textfield',
                    id: "Js.Center.SendMMS.MMSSend.sendbyusergroup",
                    items: [groupPanel]
                }, {
                    title: '按文件发送',
                    layout: 'form',
                    bodyStyle: "padding:15px 0 10px 15px",
                    id: "Js.Center.SendMMS.MMSSend.sendbyfile",
                    defaultType: 'textfield',
                    items: [
                    	{
							xtype: 'fileuploadfield',
							name: 'mobilefile',
							fieldLabel: getHelpMsg("文件", true, "1、文件格式为txt<br>2、客户端文件请选择小于4M的文件，大文件请选择服务器端文件；<br>3、内容格式:　<img src=jspack/product/common/Images/help/mobilefile.jpg align=top/>"),
							allowBlank: false,							
							blankText: "请选择上传文件",
							width: 480,
							validator: function(){
								var filePath = mainForm.items.items[2].getValue();
								if (filePath != '') {
									mainForm.items.items[3].el.dom.value = getFileMessage(filePath);
									document.getElementById("Js.Center.SendMMS.MMSSend.ClientFileName").value = escape(filePath);
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
						}, {
							xtype: 'textarea',
							name: 'filemessage',
							fieldLabel: '文件信息',
							readOnly: true,
							width: 480,
							height: 58
						},{
	                        xtype: 'hidden',
	                        name: 'vc2clientfilename',
	                        id: "Js.Center.SendMMS.MMSSend.ClientFileName"
	                    },
	                    {
	    					xtype: 'hidden',
	    					name: 'vc2loadfilename',
	    					value:''
	                    }
	                    ]
                }, {
                    title: '按输入号码发送',
                    id: "Js.Center.SendMMS.MMSSend.sendbylist",
                    layout: 'form',
                    autoScroll: true,
                    bodyStyle: "padding:15px 0 10px 15px",
                    items: [{
                        xtype: 'textarea',
                        name: 'mobilelist',
                        id: 'Js.Center.SendMMS.MMSSend.mobilelist',
                        allowBlank: false,
                        blankText: "请输入手机号码列表",
                        fieldLabel: WXTL.Common.help.MOBILELIST,
                        width: 300,
                        height: 66,
                        maxLength: 13000,
                        maxLengthText: "请将输入内容控制在1000行以内！",
                        validator: function(value){
                            return checkMobileList(value, 1000);
                        }
                    }]
                }],
                listeners: {
                    "tabchange": function(TabPanel, Panel){
                        activeTabPanel = TabPanel.getActiveTab();
                        Js.Center.SendMMS.MMSSend.sendtypename = Panel.title;
                        if (Ext.get("Js.Center.SendMMS.MMSSend.sendnumsendtype") != null) {
                            Ext.get("Js.Center.SendMMS.MMSSend.sendnumsendtype").dom.value = Panel.id;
                        }
                    }
                }
            }, Js.Center.SendMMS.MMSSend.smsFieldSet]
        });
        var mainForm = Js.Center.SendMMS.MMSSend.MMSSendPanel.getForm();
        
        //============================================================================ 定义窗体
        Js.Center.SendMMS.MMSSend.MMSSendInfoWin = new WXTL.Widgets.CommonWindows.Window({
            title: "发送普通彩信",
            mainForm: Js.Center.SendMMS.MMSSend.MMSSendPanel.getForm(),
            needButtons: false,
            closeAction: 'hide',//关闭方式
            updateURL: Js.Center.SendMMS.mmscontentaddURL,
            displayStore: Js.Center.SendMMS.MMSSend.Infostore,
            updateState: true,
            updateRecord: row,
            items: [Js.Center.SendMMS.MMSSend.MMSSendPanel, Js.Center.SendMMS.MMSSend.MainPanel],
            buttons: [new Ext.Button({
                text: '提交',
                minWidth: 70,
                handler: function(){
                    //检测开始时间不得晚于当前时间
                    Ext.getCmp("Js.Center.SendMMS.MMSSend.datstarttime").updateDate();
                    Ext.getCmp("Js.Center.SendMMS.MMSSend.datendtime").updateDate();
                    Ext.getCmp("Js.Center.SendMMS.MMSSend.datstarttime").updateTime();
                    Ext.getCmp("Js.Center.SendMMS.MMSSend.datendtime").updateTime();                    
                    

                    var datStart_date = Js.Center.SendMMS.MMSSend.smsFieldSet.items.items[0].items.items[1].getValue();
                    var datend_date = Js.Center.SendMMS.MMSSend.smsFieldSet.items.items[1].items.items[0].getValue();
                   if (Date.parse(WXTL.Common.dateTime.getNowDate()) - Date.parse(datStart_date) > 0) {
                        Ext.Msg.alert("温馨提示：", "发送时间不能早于当前时间");
                        return false;
                    }
                    //检测结束时间是否早于开始时间
                    if (Date.parse(datStart_date) - Date.parse(datend_date) > 0) {
                        Ext.Msg.alert("温馨提示：", "结束时间不能早于发送时间");
                        return false;
                    }
                    //检测结束时间是否当前时间
                    if (Date.parse(datend_date) - Date.parse(WXTL.Common.dateTime.getNow()) < 0) {
                        Ext.Msg.alert("温馨提示：", "结束时间不能早于当前时间");
                        return false;
                    }
                    
//                    if (Date.parse(WXTL.Common.dateTime.getNowDate()) - Date.parse(WXTL.Common.dateTime.formatDate(Js.Center.SendMMS.MMSSend.smsFieldSet.findById("Js.Center.SendMMS.MMSSend.datstarttime").getValue())) > 0) {
//                        Ext.Msg.alert("温馨提示：", "发送时间不能早于当前时间");
//                        return false;
//                    }
//                    //检测结束时间是否早于开始时间
//                    if (Date.parse(Js.Center.SendMMS.MMSSend.smsFieldSet.findById("Js.Center.SendMMS.MMSSend.datstarttime").getValue()) - Date.parse(Js.Center.SendMMS.MMSSend.smsFieldSet.findById("Js.Center.SendMMS.MMSSend.datendtime").getValue()) > 0) {
//                        Ext.Msg.alert("温馨提示：", "结束时间不能早于发送时间");
//                        return false;
//                    }
//                    //检测结束时间是否当前时间
//                    if (Date.parse(Js.Center.SendMMS.MMSSend.smsFieldSet.findById("Js.Center.SendMMS.MMSSend.datendtime").getValue()) - Date.parse(WXTL.Common.dateTime.getNow()) < 0) {
//                        Ext.Msg.alert("温馨提示：", "结束时间不能早于当前时间");
//                        return false;
//                    }
                    
                	Js.Center.SendMMS.MMSSend.MMSSendInfoWin.updateURL = Js.Center.SendMMS.YXTmmscontentaddURL;
                    Js.Center.SendMMS.MMSSend.saveSMS("submit");
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
                	Js.Center.SendMMS.MMSSend.UserGroupStore.baseParams={
        	                flag: "selectallbyprodid",
        					prodId: ""
        			};
                	Js.Center.SendMMS.MMSSend.UserGroupStore.reload();
                    Js.Center.SendMMS.MMSSend.MMSSendInfoWin.hide();
                }
            })],
            listeners: {
                "show": function(){
                    Js.Center.Common.ProductStore.reload({
                        params: {
                            vc2servicetype: '2'
                        }
                    });
                   
                    Js.Center.SendMMS.MMSSend.UserGroupStore.reload();
//                    productCombox.store.data[1].checked = true;
                    Js.Center.SendMMS.MMSSend.queryGrid();
					Js.Center.SendMMS.MMSSend.MainPanel.items.items[1].getSelectionModel().clearSelections();
                },
                "beforehide": function(){
                    Js.Center.SendMMS.MMSSend.MMSSendInfoWin.mainForm.reset();
                    groupPanel.reset();
					Ext.getCmp("Js.Center.SendMMS.MMSsend.SelectPanel").getForm().reset();
					Js.Center.SendMMS.MMSSend.MMSSendPanel.items.items[1].setActiveTab(0);
                }
            }
        });
    }
    else {
        Js.Center.SendMMS.MMSSend.MMSSendInfoWin.mainForm.items.each(function(f){
            if (f.xtype != null) 
                f.reset();
            else {
                f.df.reset();
            }
        });
        Js.Center.SendMMS.MMSSend.MMSSendInfoWin.updateRecord = row;
    };
	var isSelfValid = function(){
            var valid = true;
			var panel = Js.Center.SendMMS.MMSSend.MMSSendInfoWin.items.items[0].items.items[1].getActiveTab();
            if (!Js.Center.SendMMS.MMSSend.MMSSendInfoWin.mainForm.items.items[0].validate()) {
                valid = false;
            }
            
            panel.items.each(function(f){
                if (panel.id != "Js.Center.SendMMS.MMSSend.sendbyusergroup") {
                    
                    if (f.xtype == "UploadLargeFilePanel") {
                        if (!f.items.items[0].items.items[2].items.items[0].validate()) {
                            valid = false;
                        }
                        if (!f.items.items[0].items.items[0].items.items[2].validate()) {
                            valid = false;
                        }
                    }
                    else {
                        if (!f.validate()) {
							valid = false;
						}
                    }
					
                }
                else{
					if (f.xtype != "hidden") {
                        if (!f.items.items[1].validate()) {
                            valid = false;
                        }
                    }
				}
            });
            if( Js.Center.SendMMS.MMSSend.smsFieldSet.items.items[0].items.items[4].getValue() =="" ){
            	Ext.Msg.alert("温馨提示", "对不起,请先上传彩信资源!");
                valid = false;
            }
            if (Js.Center.SendMMS.MMSSend.smsFieldSet.items.items[0].items.items[2].getValue() == "") {
                Ext.Msg.alert("温馨提示", "对不起,请先选择一条彩信!");
                valid = false;
            }
            
            return valid;
        };
    Js.Center.SendMMS.MMSSend.saveSMS = function(method){
        if (Ext.get("sendflag") != null) 
            Ext.get("sendflag").dom.value = method;
        Js.Center.SendMMS.MMSSend.MMSSendInfoWin.mainForm.valid = true;
        
        if (isSelfValid()) {
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
            
            Js.Center.SendMMS.MMSSend.MMSSendInfoWin.mainFormSubmitFunc();
            
        }
    };
    //============================================================================执行显示
    if (show) {
        
            Js.Center.SendMMS.MMSSend.MMSSendInfoWin.show();
        
    }
};
