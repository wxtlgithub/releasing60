/*
 *短信发送编辑页
 */
Ext.namespace('Js.Center.SendSMS.SMSsend');
Js.Center.SendSMS.SMSsend.func = function(show, row){
    var testFormat = "15";
    var LOCALUSERIOGRAPH = "";
	var LOCALUSERIOGRAPHSIZE = 0;
	
	//得到账户签名内容
	Js.Center.SendSMS.SMSsend.toggleChkGraph = function(chkbox){
		LOCALUSERIOGRAPH = chkbox ? USERIOGRAPH : "";
		LOCALUSERIOGRAPHSIZE = chkbox ? USERIOGRAPHSIZE : 0;	
		if(Js.Center.SendSMS.SMSsend.nummessageformatName == "短信"){
			//smsContent.contentMaxLength = 70 - LOCALUSERIOGRAPHSIZE;
			Ext.getCmp("Js.Center.SendSMS.SMSsend.SendSMSContent").contentMaxLength = 70 - LOCALUSERIOGRAPHSIZE;
		}else{
			//smsContent.contentMaxLength = 246 - LOCALUSERIOGRAPHSIZE;	
			Ext.getCmp("Js.Center.SendSMS.SMSsend.SendSMSContent").contentMaxLength = 246 - LOCALUSERIOGRAPHSIZE;
		}
		Ext.get("Js.Center.SendSMS.SMSsend.vc2signature").dom.value = LOCALUSERIOGRAPH;		
	};
    if (Ext.get("SMSSendPanel") == null) {
        //=============================================================产品下拉列表数据定义
        var activeTabPanel;
        Js.Center.SendSMS.SMSsend.UserGroupStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.UserGroupURL,
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
                flag: "selectallbyuserid",
                columnlist: "numusergroupid,vc2usergroupname"
            }
        });
        var groupPanel = new WXTL.Widgets.CommonPanel.CheckBoxGroupPanel({
            store: Js.Center.SendSMS.SMSsend.UserGroupStore,
            defaultItemsName: 'numusergroupid',
            defaultItemsboxLable: '对不起，没有相关客户组信息。',
            style: "padding:5px 5px 5px 5px",
            id: "Js.Center.SendSMS.SMSsend.remoteCheckboxGroup",
            numcolumns: 3,
            blankText: "请选择客户组",
            allowBlank: false,
            name: "客户组："
        });
        //Js.Center.SendSMS.SMSsend.UserGroupStore.load();
        var productCombox = new Ext.form.ComboBox({
            xtype: "xComboBox",
            name: "numproductid",
            hiddenName: "numproductid",
            id: 'Js.Center.SendSMS.SMSsend.SMSnumproductid',
            emptyText: "-=请选择=-",
            allowBlank: false,
            blankText: "请选择通道组",
            fieldLabel: "<font color=red>选择通道组</font>",
            readOnly: true,
            mode: "local",
            displayField: "vc2name",
            valueField: "numprodid",
            triggerAction: "all",
            store: Js.Center.Common.ProductStore
            //            listeners: {
            //                'select': function(combox, record, numidex){
            //                    Js.Center.SendSMS.SMSsend.UserGroupStore.reload();
            //                }
            //            }
        });
        //        Js.Center.Common.ProductStore.reload({
        //            params: {
        //               vc2servicetype : '1'
        //            },
        //            callback: function(records, options, success){
        //                if (records.length > 0) {
        //                    productCombox.setValue('1');
        //                }
        //            }
        //        });
        
        var smsContent = new WXTL.Widgets.CommonForm.Textarea({
            name: 'vc2content',
            id: "Js.Center.SendSMS.SMSsend.SendSMSContent",
            labelText: Ext.isIE ? "账户签名：<input type='checkbox' value='1' onclick='Js.Center.SendSMS.SMSsend.toggleChkGraph(this.checked)' id='Js.Center.SendSMS.SMSsend.cbk'>" + USERIOGRAPH : "<div style='height: 13px; display: block; float: left; width: 66px;'>账户签名：</div><div style='height: 13px; width: 13px; display: block; float: left; padding: 2px 0pt 0pt;'><input type='checkbox' value='1' onclick='Js.Center.SendSMS.SMSsend.toggleChkGraph(this.checked)' id='Js.Center.SendSMS.SMSsend.cbk' /></div>" + USERIOGRAPH,
			fieldLabel: '<font color=red>短信内容</font>',
			contentMaxLength: 246 - LOCALUSERIOGRAPHSIZE,
			textareaConfig: {
                allowBlank: false,
                autocomplete: 'on',
                blankText: "请输入短信内容",
				regex:WXTL.Common.regex.IllegalDiy,
				regexText:WXTL.Common.regexText.IllegalText
            }
        });
        var smsFieldSet = new Ext.form.FieldSet({
            title: '短信内容',
            collapsible: false,
            autoHeight: true,
            defaultType: 'textfield',
            style: Ext.isIE ? 'padding:5px 0 0 10px;' : 'padding:0 0 0 10px;',
            layout: 'form',
            items: [{
                xtype: "radiogroup",
                fieldLabel: "<font color=red>短信模式</font>",
                allowBlank: true,
                horizontal: true,
                defaultValue: 'true',
                items: [{
                    boxLabel: getHelpMsg("短信", false, '1、内容长度须小于等于70字。'),
                    inputValue: '15',
                    name: 'nummessageformat',
                    listeners: {
                        "check": function(checkbox, checked){ //选中时,调用的事件
                            if (checked) {
                                smsContent.contentMaxLength = 70 - LOCALUSERIOGRAPHSIZE;
                                testFormat = "15";
                                Js.Center.SendSMS.SMSsend.nummessageformatName = "短信";
                            }
                        }
                    }
                }, {
                    boxLabel: getHelpMsg("长短信", false, '1、内容长度须小于等于246字。'),
                    inputValue: '32',
                    name: 'nummessageformat',
                    checked: true,
                    listeners: {
                        "check": function(checkbox, checked){ //选中时,调用的事件
                            if (checked) {
                                smsContent.contentMaxLength = 246 - LOCALUSERIOGRAPHSIZE;
                                Js.Center.SendSMS.SMSsend.nummessageformatName = "长短信";
                                testFormat = "32";
                            }
                            
                        }
                    }
//                }, {
//                    boxLabel: getHelpMsg("WapPush", false, '1、内容长度须小于等于70字。<br>2、短信格式如：<font color=red>短信内容|wap地址</font>'),
//                    inputValue: '31',
//                    name: 'nummessageformat',
//                    listeners: {
//                        "check": function(checkbox, checked){ //选中时,调用的事件
//                            if (checked) {
//                                smsContent.contentMaxLength = 70 - LOCALUSERIOGRAPHSIZE;
//                                Js.Center.SendSMS.SMSsend.nummessageformatName = "WapPush";
//                                testFormat = "31";
//                            }
//                            
//                        }
//                    }
                }]
            
            }, {
                xtype: 'hidden',
                name: 'flag',
                id: 'sendflag',
                fieldLabel: '<font color=red>操作类型</font>'
            }, {
                xtype: 'hidden',
                name: 'numcontentid',
                fieldLabel: '短信内容编号'
            }, smsContent, {
                xtype: 'hidden',
                name: 'vc2signature',
                id: 'Js.Center.SendSMS.SMSsend.vc2signature',
                value: '',
                readOnly: true,
                fieldLabel: '<font color=red>账户签名</font>'
            }, {
                xtype: "radiogroup",
                fieldLabel: "<font color=red>发送方式</font>",
				id: "Js.Center.SendSMS.SMSsend.SendMethod",
                allowBlank: true,
                horizontal: true,
                defaultValue: 'true',
                value: '1',
                items: [{
                    boxLabel: '立即发送',
                    name: "numsendmethod",
                    inputValue: '1',
                    checked: true,
                    listeners: {
                        "check": function(checkbox, checked){
                            if (checked) {
                                Js.Center.SendSMS.SMSsend.columnSMSsendMethod = "立即发送";
                            }
                        }
                    }
                }, {
                    boxLabel: '定时发送',
                    name: "numsendmethod",
                    inputValue: '2',
                    listeners: {
                        "check": function(checkbox, checked){
                            if (checked) {
                                Js.Center.SendSMS.SMSsend.columnSMSsendMethod = "定时发送";
                            }
                        }
                    }
                }]
            }, {
                xtype: 'xDateTime',
                fieldLabel: '发送时间',
                name: "datsend",
                id: "Js.Center.SendSMS.SMSsend.datsend",
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
            }]
        });
        //=============================================================定义发送测试短信Panel
        var smsSendTestPanel = new Ext.Panel({
            frame: true,
            labelWidth: 80,
            border: false,
			bodyBorder:false,
            items: [{
                layout: 'column',
                defaults: {
                    bodyStyle: 'padding:0px 0 0 5px;',
                    anchor: '90%'
                },
                items: [{
                    columnWidth: .7,
                    layout: 'form',
                    border: false,
                    defaults: {
                        anchor: '90%'
                    },
                    items: [{
                        xtype: "textfield",
                        name: "vc2mobile",
                        value: Js.Center.Common.userMobile,
                        id: "SMSsendtestmobile",
                        fieldLabel: "测试手机号",
                        validator: function(value){	
							var regex = new RegExp(WXTL.Common.regex.Mobile);
							if(value.indexOf(',')>-1){
								var list = value.split(',');
								if(list.length >5){
									return false;
								}	
								for(var i=0; i<list.length; i++){
									if(!regex.test(list[i])){
										return false;
									}
								}
								return true;
							}
							else{
								return regex.test(value);
							}
                        },
						invalidText: '手机号码格式不正确，最多可输入5个用半角逗号隔开的手机号码'
                    }]
                }, {
                    columnWidth: .3,
                    layout: 'form',
                    border: false,
                    items: [{
                        xtype: 'button',
                        id: 'SMSsendtestbtnsendtest',
                        text: '发送测试短信',
                        handler: function(){
                            if ( Ext.getCmp("Js.Center.SendSMS.SMSsend.SMSnumproductid").getValue() == "") {
                                Ext.Msg.alert("温馨提示", "通道组不能为空!");
                            }else if(Ext.get("SMSsendtestmobile").getValue() == ""){
                            	Ext.Msg.alert("温馨提示", "测试手机号码不能为空!");
                            }else {
                                if (smsContent.isValid()) {
//                                    Js.Center.SendSMS.SMSsend.saveSMS("sendtest");
                                    if (Ext.get("sendflag") != null) 
                                        Ext.get("sendflag").dom.value = "sendtest";
            
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
                                    
                                    var parms = {
                                        flag: 'sendtest',
                                        vc2mobile: Ext.get("SMSsendtestmobile").dom.value,
                                        numclassid: '0',
                                        vc2content: smsContent.getValue(),
                                        vc2signature: LOCALUSERIOGRAPH,
                                        nummessageformat: testFormat,
                                        numproductid: Ext.getCmp("Js.Center.SendSMS.SMSsend.SMSnumproductid").getValue(),
                                        datsend: Ext.get("Js.Center.SendSMS.SMSsend.datsend").dom.value
                                    };
                                    
                                    doAjax(Js.Center.SendSMS.SmsContentUpdateURL, parms, Js.Center.SendSMS.Send.DisplayStore);
                                }
                                
                            }
                        }
                    }]
                }]
            
            }]
        });
        //=============================================================定义formpanel
//		var uploadFilePanel = new WXTL.Widgets.CommonPanel.UploadLargeFilePanel({
//			url:'/url/upload.ashx',
//			id: "Js.Center.SendSMS.SMSsend.UploadLargeFile"
//		});
        var SMSSendPanel = new Ext.FormPanel({
            id: "SMSSendPanel",
            fileUpload: true,
            labelAlign: 'left',
            frame: true,
            //title: 'Inner Tabs',
            style: "background-color:#e7e8f0",
            //bodyStyle: 'padding:5px 0 0 5px;',
            defaults: {
                msgTarget: "side"
            },
            items: [{
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
                            xtype: "combo",
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
                            value: 0,
                            store: new Ext.data.SimpleStore({
                                fields: ["show", "value"],
                                data: [["正常", "0"], ["及时", "1"], ["紧急", "2"]]
                            })
                        }]
                    }]
                }]
            }, {
                xtype: 'tabpanel',
                layoutOnTabChange: true,
                plain: true,
                activeTab: 0,
                height: 125,
                items: [{
                    title: '按客户组发送',
                    autoScroll: true,
                    layout: 'form',
                    defaultType: 'textfield',
                    id: "sendbyusergroup",
                    items: [{
                        xtype: 'hidden',
                        fieldLabel: "发送方式 1、栏目 2、客户组 3、持仓股票 4、文件  5、手机号码",
                        name: 'numsendtype',
                        id: 'sendnumsendtype',
                        value: 'sendbyusergroup'
                    }, groupPanel]//remoteCheckboxGroupPanel]
                }, {
                    title: '按文件发送',
                    layout: 'form',
                    id: "sendbyfile",
                    defaultType: 'textfield',
                    //bodyStyle: 'padding:5px 0 0 5px;',
					items:[{
						xtype:'UploadLargeFilePanel',
						id:'Js.Center.SendSMS.SMSsend.UploadLargeFile',
						txtMsgHeight:60,
						needLargfile: false
					}]//,uploadFilePanel]
//                    items: [{
//                        xtype: 'fileuploadfield',
//                        //id: 'SMSmobilefile',
//                        style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
//                        name: 'mobilefile',
//                        fieldLabel: WXTL.Common.help.MOBILEFILE,//getHelpMsg("文件", true, "1、文件格式为txt<br>2、文件大小须小于2M<br>3、内容格式:　<img src=help/mobilefile.jpg align=top/>"),
//                        allowBlank: false,
//                        blankText: "请选择上传文件",
//                        width: 400,
//                        //inputType: 'file',
//                        validator: function(){
//                            var filePath = mainForm.items.items[3].getValue();
//                            if (filePath != '') {
//                                mainForm.items.items[4].el.dom.value = getFileMessage(filePath);
//                                if (checkFile(filePath) != '') {
//                                    this.invalidText = checkFile(filePath);
//                                    return false;
//                                }
//                                else {
//                                    return true;
//                                }
//                            }
//                            else 
//                                return false;
//                        }
//                    }, {
//                        xtype: 'textarea',
//                        name: 'filemessage',
//                        //id: 'SMSfilemessage',
//                        fieldLabel: '文件信息',
//                        readOnly: true,
//                        disabled: true,
//                        width: 400,
//                        height: 55
//                    }]
                }, {
                    title: '按输入号码发送',
                    id: "sendbylist",
                    layout: 'form',
                    bodyStyle: 'padding:5px 0 0 5px;',
                    items: [{
                        xtype: 'textarea',
                        name: 'mobilelist',
                        id: 'SMSmobilelist',
                        allowBlank: false,
                        blankText: "请输入手机号码列表",
                        fieldLabel: WXTL.Common.help.MOBILELIST,
                        width: 300,
                        height: 80,
                        //regex:  WXTL.Common.regex.MobileList,
                        //regexText: WXTL.Common.regexText.MobileListText,
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
                        //alert(Panel.title);
                        Js.Center.SendSMS.SMSsend.sendtypename = Panel.title;
                        
                        if (Ext.get("sendnumsendtype") != null) {
                            Ext.get("sendnumsendtype").dom.value = Panel.id;
                        }
                    }
                }
            }, smsFieldSet, smsSendTestPanel]
        });
        var mainForm = SMSSendPanel.getForm();
        
        //============================================================================ 定义窗体
        Js.Center.SendSMS.SMSsend.SMSsendInfoWin = new WXTL.Widgets.CommonWindows.Window({
            title: "发送短信",
            //height:480,
            mainForm: SMSSendPanel.getForm(),
            needButtons: false,
            closeAction: 'hide',//关闭方式
            updateURL: Js.Center.SendSMS.SmsContentUpdateURL,
            displayStore: Js.Center.SendSMS.Send.DisplayStore,
            updateState: true,
            updateRecord: row,
            items: [SMSSendPanel],
            buttons: [new Ext.Button({
                text: '提交发送',
                minWidth: 70,
                handler: function(){
                    Js.Center.SendSMS.SMSsend.saveSMS("submit");
                    //sendSMSReview();
                }
            }), new Ext.Button({
                text: '保存',
                minWidth: 70,
                handler: function(){
                    Js.Center.SendSMS.SMSsend.saveSMS("save");
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(){
                	var row = Js.Center.SendSMS.SMSsend.SMSsendInfoWin.updateRecord;
                    if (row != null) {
                        SMSSendPanel.getForm().reset();
                        groupPanel.reset();
                        SMSSendPanel.getForm().loadRecord(row);
                        
                        if(row.data.vc2content.indexOf(USERIOGRAPH)> -1){
							Ext.getCmp("Js.Center.SendSMS.SMSsend.SendSMSContent").setValue(row.data.vc2content.replace(USERIOGRAPH,''));
			        		document.getElementById("Js.Center.SendSMS.SMSsend.cbk").checked = true;
			        		Js.Center.SendSMS.SMSsend.toggleChkGraph(true);
			        	}
			        	else{
			        		Js.Center.SendSMS.SMSsend.toggleChkGraph(false);
			        	}
					}
                    else {
                        SMSSendPanel.getForm().reset();
                        groupPanel.reset();
                        document.getElementById("Js.Center.SendSMS.SMSsend.cbk").checked = false;
                        Js.Center.SendSMS.SMSsend.toggleChkGraph(false);                     
                    }
                    //activeTabPanel.remove("SMSremoteCheckboxGroup");
                	SMSSendPanel.items.items[1].setActiveTab(0);					
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
                    Js.Center.SendSMS.SMSsend.SMSsendInfoWin.hide();
                    SMSSendPanel.getForm().reset();
                    groupPanel.reset();
                    
                }
            })],
            listeners: {
                "show": function(){
                	//Js.Center.SendSMS.SMSsend.SMSsendInfoWin.add(SMSSendPanel);
					//Js.Center.SendSMS.SMSsend.SMSsendInfoWin.doLayout();
					
					//activeTabPanel=SMSSendPanel.items.items[1].getActiveTab();
                    Js.Center.Common.ProductStore.reload({
                        params: {
                            vc2servicetype: '1'
                        }//,
//                        callback: function(records, options, success){
//                            if (records.length > 0) {
//                                productCombox.setValue('1');
//                            }
//                        }
                    });
                    Js.Center.SendSMS.SMSsend.UserGroupStore.reload({
						callback: function(){
							//WXTL.Common.showWaitLoading(false);
						}
					});
					//smsContent.setLableText("短信签名：123");
					
                },
                "beforehide": function(){
                    SMSSendPanel.getForm().reset();
                    groupPanel.reset();
                    Js.Center.SendSMS.SMSsend.SMSsendInfoWin.mainForm.reset();
                    SMSSendPanel.items.items[1].setActiveTab(0);
					document.getElementById("Js.Center.SendSMS.SMSsend.cbk").checked = false;
					Js.Center.SendSMS.SMSsend.toggleChkGraph(false);
                }
            }
        });
    }
    else {
        Js.Center.SendSMS.SMSsend.SMSsendInfoWin.mainForm.items.each(function(f){
            if (f.xtype != null) 
                f.reset();
            else {
                f.df.reset();
            }
        });
        Js.Center.SendSMS.SMSsend.SMSsendInfoWin.updateRecord = row;
    };
    
    var isSelfValid = function(){
        var valid = true;
		var panel = Js.Center.SendSMS.SMSsend.SMSsendInfoWin.items.items[0].items.items[1].getActiveTab();
		if(!Js.Center.SendSMS.SMSsend.SMSsendInfoWin.mainForm.items.items[0].isValid()){
			valid = false;
		}
//        if (!productCombox.validate()) {
//            valid = false;
//        }
        panel.items.each(function(f){
            if (panel.id == "sendbyusergroup") {
                if (f.xtype != "hidden") {
                    if (!f.items.items[1].validate()) {
                        valid = false;
                    }
                }
            }
            else {
				if(f.xtype == "UploadLargeFilePanel"){
					if(!f.items.items[0].items.items[2].items.items[0].validate()){
						valid = false;
					}
					if(!f.items.items[0].items.items[0].items.items[2].validate()){
						valid = false;
					}
				}
				else{
				    if (!f.validate()) {
						valid = false;
					}
				}
                
            }
        });
        if (Ext.getCmp("Js.Center.SendSMS.SMSsend.SendMethod").items.items[1].checked) {
			var sendTime = Ext.get("Js.Center.SendSMS.SMSsend.datsend").getValue();
			var datNow = Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d h:m:s');
			if (sendTime < datNow) {
				Ext.Msg.alert("温馨提示", " 定时发送短信发送时间不能早于当前时间!");
				valid = false;
			}
		}
        Js.Center.SendSMS.SMSsend.SMSsendInfoWin.items.items[0].items.items[2].items.each(function(f){
            if (f.id != "SMSsendbtnsendtest") {
                if (!f.validate()) {
                    valid = false;
                }
            }
            
        });
        return valid;
    };
    var sendSMSReview = function(){
        mainForm.valid = true;
        if (isSelfValid(activeTabPanel)) {
            if (Js.Center.SendSMS.SMSsend.columnSMSsendMethod == "立即发送") {
                Js.Center.SendSMS.SMSsend.columnSMSsendDatetime = "";
            }
            if (Js.Center.SendSMS.SMSsend.columnSMSsendMethod == "定时发送") {
                Js.Center.SendSMS.SMSsend.columnSMSsendDatetime = Ext.get("Js.Center.SendSMS.SMSsend.datsend-date").getValue() + ' ' + Ext.get("Js.Center.SendSMS.SMSsend.datsend-time").getValue();
            }
            Js.Center.SendSMS.SMSsend.columnSMScontent = smsFieldSet.items.items[6].getValue() + LOCALUSERIOGRAPH;
            
            Js.Center.SendSMS.SMSsend.saveSMS("submit");
        }
    };
    
    Js.Center.SendSMS.SMSsend.saveSMS = function(method){
        if (Ext.get("sendflag") != null) 
            Ext.get("sendflag").dom.value = method;
        Js.Center.SendSMS.SMSsend.SMSsendInfoWin.mainForm.valid = true;
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
            
            Js.Center.SendSMS.SMSsend.SMSsendInfoWin.mainFormSubmitFunc();
            
            //            mainForm.submit({
            //                url: Js.Center.SendSMS.SmsContentUpdateURL,
            //                method: "POST",
            //                success: function(form, action){
            //                    if (action.response.responseText != "") {
            //                        var objJson = Ext.util.JSON.decode(action.response.responseText);
            //                        var falg = objJson.success;
            //                        if (falg == true) {
            //                            Ext.Msg.alert("温馨提示", "操作成功了!");
            //                            if (method != "sendtest") {
            //                                Js.Center.SendSMS.SMSsend.SMSsendInfoWin.close();
            //                                Js.Center.SendSMS.Send.DisplayStore.reload();
            //                            }
            //                            
            //                        }
            //                        else 
            //                            Ext.Msg.alert('温馨提示', objJson.info);
            //                    }
            //                    else 
            //                        Ext.Msg.alert("温馨提示", "操作成功了!");
            //                },
            //                failure: function(form, action){
            //                    var objJson = Ext.util.JSON.decode(action.response.responseText);
            //                    Ext.Msg.alert('温馨提示', objJson.info);
            //                }
            //            });
        }
    };
    
    //============================================================================执行显示
    if (show) {
            Js.Center.SendSMS.SMSsend.SMSsendInfoWin.show();
    }
};
