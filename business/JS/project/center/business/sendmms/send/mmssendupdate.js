/**
 * @author 赵艳华
 * 普通彩信编辑
 */
Ext.namespace('Js.Center.SendMMS.MMSsendUpdate');
Js.Center.SendMMS.MMSsendUpdate.func = function(show,row){
	var firstShow=true;

    //if (Ext.get("Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel") == null) {
	if (Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin == null) {
    //=============================================================通道组下拉列表数据定义
    var activeTabPanel;
    Js.Center.SendMMS.MMSsendUpdate.UserGroupStore = new WXTL.Widgets.CommonData.GroupingStore({
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
        store: Js.Center.SendMMS.MMSsendUpdate.UserGroupStore,
        defaultItemsName: 'numusergroupid',
        defaultItemsboxLable: '对不起，没有相关客户组信息。',
        style: "padding:5px 5px 5px 5px",
        id: "Js.Center.SendMMS.MMSsendUpdate.remoteCheckboxGroup",
        numcolumns: 3,
        blankText: "请选择客户组",
        allowBlank: false,
        name: "客户组："
    });
    var productCombox = new Ext.form.ComboBox({
        xtype: "xComboBox",
        name: "numproductid",
        hiddenName: "numproductid",
        id: 'Js.Center.SendMMS.MMSsendUpdate.SMSnumproductid',
        emptyText: "-=请选择=-",
        allowBlank: false,
        blankText: "请选择通道组",
        fieldLabel: "<font color=red>选择通道组</font>",
        readOnly: true,
        mode: "local",
        displayField: "vc2name",
        valueField: "numprodid",
        triggerAction: "all",
        store: Js.Center.Common.ProductStore,
    	listeners: {
    		'select': function(combox, record, numidex){
    			var productId = record.data.numprodid;
    			Js.Center.SendMMS.MMSsendUpdate.UserGroupStore.baseParams={
    	                flag: "selectallbyprodid",
    					prodId: productId
    			};
    			Js.Center.SendMMS.MMSsendUpdate.UserGroupStore.reload();
    		}
    	}
    });
    Js.Center.SendMMS.MMSsendUpdate.MMSFieldSet = new Ext.Panel({
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
            bodyStyle: "padding:10px 0 10px 15px",
            items: [{
                xtype: 'xDateTime',
                fieldLabel: '发送时间',
                layout: 'form',
                name: "datstarttime",
                id: "Js.Center.SendMMS.MMSsendUpdate.datStartTime",
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
                id: "Js.Center.SendMMS.MMSsendUpdate.nummmsid",
                name: "nummmsid"
            }]
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
            bodyStyle: "padding:10px 0 10px 15px",
            items: [{
                xtype: 'xDateTime',
                fieldLabel: '结束时间',
                layout: 'form',
                name: "datendtime",
				addDays:1,
                id: "Js.Center.SendMMS.MMSsendUpdate.datEndTime",
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
    Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel = new Ext.FormPanel({
        id: "Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel",
        fileUpload: true,
        labelAlign: 'left',
        frame: true,
        labelWidth: 80,
        defaults: {
            msgTarget: "side"
        },
        items: [{
            xtype: 'hidden',
            fieldLabel: "发送方式 1、栏目 2、客户组 3、持仓股票 4、文件  5、手机号码",
            name: 'numsendtype',
            id: 'Js.Center.SendMMS.MMSsendUpdate.sendnumsendtype',
            value: 'Js.Center.SendMMS.MMSsendUpdate.sendbyusergroup'
        }, {
            xtype: 'hidden',
            fieldLabel: "内容ID",
            name: 'numcontentid',
            id: "Js.Center.SendMMS.MMSsendUpdate.numcontentid"
        }, {
            xtype: 'hidden',
            fieldLabel: "彩信内容Json",
            name: 'vc2contentJson',
            id: "Js.Center.SendMMS.MMSsendUpdate.vc2contentJson",
            value: ''
        }, {
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
                    buttonAlign: "center"
                }]
            }]
        }, {
            xtype: 'tabpanel',
            layoutOnTabChange: true,
            defaults: {
                //bodyStyle: 'padding:5px 0 0 10px;'
            },
            plain: true,
            activeTab: 0,
            height: 220,
            items: [{
                title: '按客户组发送',
                autoScroll: true,
                layout: 'form',
                defaultType: 'textfield',
                id: "Js.Center.SendMMS.MMSsendUpdate.sendbyusergroup",
                items: [groupPanel]
            }, {

                title: '按文件发送',
                layout: 'form',
                id: "Js.Center.SendMMS.MMSsendUpdate.sendbyfile",
                defaultType: 'textfield',
                bodyStyle: "padding:15px 0 10px 15px",
                items: [{
						xtype: 'fileuploadfield',
						name: 'mobilefile',
						fieldLabel: getHelpMsg("文件", true, "1、文件格式为txt<br>2、客户端文件请选择小于4M的文件，大文件请选择服务器端文件；<br>3、内容格式:　<img src=jspack/product/common/Images/help/mobilefile.jpg align=top/>"),
						allowBlank: false,							
						blankText: "请选择上传文件",
						width: 500,
						validator: function(){
							var mainForm = Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel.getForm();
							var filePath = mainForm.items.items[4].getValue();
							if (filePath != '') {
								mainForm.items.items[5].el.dom.value = getFileMessage(filePath);
								document.getElementById("Js.Center.SendMMS.MMSsendUpdate.ClientFileName").value = escape(filePath);
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
						width: 500,
						height: 120
					},{
                        xtype: 'hidden',
                        name: 'vc2clientfilename',
                        id: "Js.Center.SendMMS.MMSsendUpdate.ClientFileName"
                    },
                    {
    					xtype: 'hidden',
    					name: 'vc2loadfilename',
    					value:''
                    }]
            }, {
                title: '按输入号码发送',
                id: "Js.Center.SendMMS.MMSsendUpdate.sendbylist",
                layout: 'form',
                bodyStyle: "padding:15px 0 10px 15px",
                items: [{
                    xtype: 'textarea',
                    name: 'mobilelist',
                    id: 'Js.Center.SendMMS.MMSsendUpdate.SMSmobilelist',
                    allowBlank: false,
                    fieldLabel: WXTL.Common.help.MOBILELIST,
                    width: 300,
                    height: 103,
                    blankText: "请输入手机号码列表",
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
                    Js.Center.SendMMS.MMSsendUpdate.sendtypename = Panel.title;
                    
                    if (Ext.get("Js.Center.SendMMS.MMSsendUpdate.sendnumsendtype") != null) {
                        Ext.get("Js.Center.SendMMS.MMSsendUpdate.sendnumsendtype").dom.value = Panel.id;
                    }
                }
            }
        }, Js.Center.SendMMS.MMSsendUpdate.MMSFieldSet]
    });
    
    
    //定义tabpanel
    var MMSSendUpdateTabpanel = new Ext.Panel({
        id: "Js.Center.SendMMS.MMSSend.SMSSendUpdatePanel",
        labelAlign: 'left',
        frame: true,
        labelWidth: 60,
        style: "background-color:#DFE8F6",
        defaults: {
            msgTarget: "side"
        },
        items: [{
            xtype: 'tabpanel',
            layoutOnTabChange: true,
            plain: true,
            activeTab: 0,
            height: 620,
            width: 774,
            border: true,
            items: [{
                title: '彩信内容',
                //autoScroll: true,
                layout: 'form',
                style: "background-color:#DFE8F6",
                id: "Js.Center.SendMMS.MMSSend.MMSsendUpdateContent",
                border: true,
                frame: false,
				items:[Js.Center.SendMMS.MMSsendUpdate.ShowPanel]
            },{
                title: '发送号码',
                //autoScroll: true,
                layout: 'form',
                style: "background-color:#DFE8F6",
                defaultType: 'textfield',
                id: "Js.Center.SendMMS.MMSSend.MMSsendUpdateList",
                items: [Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel]//Js.Center.SendMMS.MMSsendUpdate.MMSFieldSet]//
            }],
			listeners:{
				'tabchange': function(TabPanel, Panel){
                    if (Panel.id == "Js.Center.SendMMS.MMSSend.MMSsendUpdateList") {
						Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel.items.items[4].setActiveTab(0);
						if(firstShow){
						    Js.Center.SendMMS.MMSsendUpdate.UserGroupStore.reload();
							firstShow=false;
						}
                        if (Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord != null) {
                            Ext.get('Js.Center.SendMMS.MMSsendUpdate.nummmsid').dom.value = Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord.get("nummmsid");
                            Ext.get('Js.Center.SendMMS.MMSsendUpdate.numcontentid').dom.value = Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord.get("numcontentid");
                            Ext.get('Js.Center.SendMMS.MMSsendUpdate.vc2contentJson').dom.value = Ext.encode(Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson);
                        }
                    }
					
				}
			}
        }]
    });
    //=====================================================定义主窗体
    Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin = new WXTL.Widgets.CommonWindows.Window({
        title: "普通彩信编辑",
        width: 819,
        height: 522,
        autoScroll: true,
        closeAction: 'hide',//关闭方式
        layout: 'form',
        mainForm: Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel.getForm(),
        updateURL: Js.Center.SendMMS.YXTMMSContentUpdateURL,
        displayStore: Js.Center.SendMMS.Send.DisplayStore,
        needButtons: false,
        updateState: false,
        items: [MMSSendUpdateTabpanel],
        buttons: [new Ext.Button({
            text: '提交',
            minWidth: 70,
            qtip: "提交",
            handler: function(){
                    Ext.getCmp("Js.Center.SendMMS.MMSsendUpdate.datStartTime").updateDate();
                    Ext.getCmp("Js.Center.SendMMS.MMSsendUpdate.datStartTime").updateTime();
                    Ext.getCmp("Js.Center.SendMMS.MMSsendUpdate.datEndTime").updateDate();
                    Ext.getCmp("Js.Center.SendMMS.MMSsendUpdate.datEndTime").updateTime();   
                    var datStart_date = Js.Center.SendMMS.MMSsendUpdate.MMSFieldSet.findById("Js.Center.SendMMS.MMSsendUpdate.datStartTime").getValue();
                    var datend_date = Js.Center.SendMMS.MMSsendUpdate.MMSFieldSet.findById("Js.Center.SendMMS.MMSsendUpdate.datEndTime").getValue();
                                 
                //检测开始时间不得晚于当前时间
                
                if (Date.parse(WXTL.Common.dateTime.getNowDate()) - Date.parse(datStart_date) > 0) {
                    Ext.Msg.alert("温馨提示：", "发送时间不能晚于当前时间");
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
                if (checkMMS(Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson)) {
                    //避免客户组异步加载导致提交验证异常
                    if (firstShow) {
                        MMSSendUpdateTabpanel.items.items[0].setActiveTab(1);
                        Js.Center.SendMMS.MMSsendUpdate.UserGroupStore.reload({
                            callback: function(records, options, success) {
                                Ext.get("Js.Center.SendMMS.MMSsendUpdate.vc2contentJson").dom.value = Ext.encode(Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson);
                                Js.Center.SendMMS.MMSsendUpdate.saveSMS();
                            }
                        });
                        firstShow = false;
                    }
                    else {
                        MMSSendUpdateTabpanel.items.items[0].setActiveTab(1);
                        Ext.get("Js.Center.SendMMS.MMSsendUpdate.vc2contentJson").dom.value = Ext.encode(Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson);
                        Js.Center.SendMMS.MMSsendUpdate.saveSMS();
                    }
                }
            }
        }), new Ext.Button({
            hidden: true,
            text: '测试发送',
            qtip: "测试发送",
            minWidth: 70,
            handler: function(){
                Js.Center.SendMMS.SendTest.func(Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson);
            }
        }), new Ext.Button({
            text: '取消',
            qtip: "取消",
            minWidth: 70,
            handler: function(){
            	Js.Center.SendMMS.MMSsendUpdate.UserGroupStore.baseParams={
    	                flag: "selectallbyprodid",
    					prodId: ""
    			};
            	Js.Center.SendMMS.MMSsendUpdate.UserGroupStore.reload();
                Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.hide();
                Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.items.items[0].items.items[0].setActiveTab(0);
				//Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel.getForm().reset();
				
            }
        })],
            listeners: {
                "show": function(){
                    Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.items.items[0].items.items[0].setActiveTab(0);
                    if (Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord != null) {
						var jsonUpdateMMS = eval(doSynRequest(Js.Center.SendMMS.MMSQueryDescURL + "?flag=selecthismms&nummmsseqid=" + Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord.get("nummmsid")));
                        Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson = jsonUpdateMMS;
						Js.Center.SendMMS.MMSsendUpdate.FramePanel.contentJson = jsonUpdateMMS;
						Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.currFrame = 0;
						Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.refreshAll();
						//Js.Center.SendMMS.MMSsendUpdate.FramePanel.refreshAll();
						Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.refreshBrotherPanel(0);
						
						Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[0].setValue(Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord.get("vc2name"));
						Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[8].setValue(Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord.get("nummmsid"));
						//Ext.get("Js.Center.SendMMS.MMSsendUpdate.Contentmmsid").dom.value=Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord.get("nummmsid");
						//Ext.get("Js.Center.SendMMS.MMSsendUpdate.ContentMMSName").dom.value=Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord.get("vc2name");
						
						//Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[0].dom.value=Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord.get("vc2name");
						//Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[8].dom.value=Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord.get("nummmsid");
	
                    }
                    Js.Center.Common.ProductStore.load({
                        params: {
                            vc2servicetype: '2'
                        }
                    });
					Js.Center.SendMMS.MMSsendUpdate.UserGroupStore.reload();
                    Js.Center.SendMMS.MMSsendUpdate.MMSFieldSet.findById("Js.Center.SendMMS.MMSsendUpdate.datEndTime").setValue(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), 1));
				   
                    //Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.stopCurrFrame();
                },
				"hide": function(){
				    //解决彩信编辑播放、停止，和彩信预览播放、 停止问题
				    if(Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.bottomToolbar.items.items[0].text != "播放"){
				        previewMMS(Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson.frame.length);
                        window.clearInterval(playTime);
                    }
                    Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.items.items[0].items.items[0].setActiveTab(0);
				}
            }
    });
    };
	
	var isSelfValid = function(){
        var valid = true;
		var panel = Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.items.items[0].items.items[0].items.items[1].items.items[0].items.items[4].getActiveTab();
        if (!Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.mainForm.items.items[3].validate()) {
            valid = false;
        }
        panel.items.each(function(f){
            if (panel.id != "Js.Center.SendMMS.MMSsendUpdate.sendbyusergroup") {
                if (f.xtype == "UploadLargeFilePanel") {
                    if (!f.items.items[0].items.items[2].items.items[0].validate()) {
                        valid = false;
                    }
                }
                else {
                    if (!f.validate()) {
                        valid = false;
                    }
                }
                
            }
            else {
                if (f.xtype != "hidden") {
                    if (!f.items.items[1].validate()) {
                        valid = false;
                    }
                }
            }
        });

        return valid;
    };
    Js.Center.SendMMS.MMSsendUpdate.saveSMS = function(){
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
            
            Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.mainFormSubmitFunc();

        }
        
    };
};
