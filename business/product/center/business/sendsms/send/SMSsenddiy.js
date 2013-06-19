/*
 *短信发送编辑页
 */
Ext.namespace('Js.Center.SendSMS.SMSsenddiy');
Js.Center.SendSMS.SMSsenddiy.func = function(show, row){
    var testFormat = "15";
	var LOCALUSERIOGRAPH = "";
	var LOCALUSERIOGRAPHSIZE = 0;
	
	//得到账户签名内容
	Js.Center.SendSMS.SMSsenddiy.toggleChkGraph = function(chkbox){
		LOCALUSERIOGRAPH = (chkbox) ? USERIOGRAPH : "";
		LOCALUSERIOGRAPHSIZE = (chkbox) ? USERIOGRAPHSIZE : 0;	
		//smsContentdiy.contentMaxLength = 246 - LOCALUSERIOGRAPHSIZE;	
		Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SendSMSContentdiy").contentMaxLength = 246 - LOCALUSERIOGRAPHSIZE;
		Ext.get("Js.Center.SendSMS.SMSsenddiy.vc2signature").dom.value = LOCALUSERIOGRAPH;		
	};
    if (Ext.get("SMSSenddiyPanelDiy") == null) {
        //=============================================================产品下拉列表数据定义
        
        var productCombox = new Ext.form.ComboBox({
            xtype: "xComboBox",
            name: "numproductid",
            hiddenName: "numproductid",
            id: 'Js.Center.SendSMS.SMSsenddiy.SMSnumproductiddiy',
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
        });
        Js.Center.Common.ProductStore.load({
            params: {
                vc2servicetype: '1'
            }
            //            ,
            //            callback: function(records, options, success){
            //                if (records.length > 0) {
            //                    productCombox.setValue('2');
            //                }
            //            }
        });
        var smsContentdiy = new WXTL.Widgets.CommonForm.Textarea({
            //name: 'vc2content',
            id: "Js.Center.SendSMS.SMSsenddiy.SendSMSContentdiy",
            labelText: Ext.isIE ? "账户签名：<input type='checkbox' value='1' id='Js.Center.SendSMS.SMSsenddiy.cbk' onclick='Js.Center.SendSMS.SMSsenddiy.toggleChkGraph(this.checked)'>" + USERIOGRAPH : "<div style='height: 13px; display: block; float: left; width: 66px;'>账户签名：</div><div style='height: 13px; width: 13px; display: block; float: left; padding: 2px 0pt 0pt;'><input type='checkbox' value='1' id='Js.Center.SendSMS.SMSsenddiy.cbk' onclick='Js.Center.SendSMS.SMSsenddiy.toggleChkGraph(this.checked)'></div>" + USERIOGRAPH,
			fieldLabel: getHelpMsg("短信模板内容", true, '1、内容长度须小于等于246字。<br>2、内容格式：<br>${v0}:您好，您${v1}当日净值为${v2}元'),
            contentMaxLength: 246 - LOCALUSERIOGRAPHSIZE,
            textareaConfig: {
                allowBlank: false,
                autocomplete: 'on',
                regex: WXTL.Common.regex.IllegalDiy,
                regexText: WXTL.Common.regexText.IllegalText,
                blankText: "请输入短信模板内容"
            }
        });
        var smsFieldSetDiy = new Ext.form.FieldSet({
            //title: '短信内容',
            collapsible: false,
            autoHeight: true,
            defaultType: 'textfield',
            style: Ext.isIE ? 'padding:5px 0 0 10px;' : 'padding:0 0 0 10px;',
            layout: 'form',
            items: [{
                xtype: 'hidden',
                name: 'nummessageformat',
                value: '34'
            }, {
                xtype: 'hidden',
                name: 'flag',
                id: 'sendflagdiy',
                fieldLabel: '<font color=red>操作类型</font>'
            }, {
                xtype: 'hidden',
                name: 'numcontentid',
                fieldLabel: '短信内容编号'
            }, {
                xtype: 'hidden',
                name: 'vc2content',
                id: 'Js.Center.SendSMS.SMSsenddiy.smscontent'
            },  {
                xtype: 'hidden',
                name: 'vc2signature',
                id: 'Js.Center.SendSMS.SMSsenddiy.vc2signature',
                value: LOCALUSERIOGRAPH,
                readOnly: true,
                fieldLabel: '<font color=red>账户签名</font>'
            }, {
                xtype: 'hidden',
                name: 'numsendtype',
                value: 'sendbyfilediy'
            },{
				xtype:'hidden',
				name:'numreftime',
				id:'Js.Center.SendSMS.SMSsenddiy.numreftime'
			}, {
                xtype: "radiogroup",
                fieldLabel: "<font color=red>发送方式</font>",
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
                                Js.Center.SendSMS.SMSsenddiy.columnSMSsendMethod = "立即发送";
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
                                Js.Center.SendSMS.SMSsenddiy.columnSMSsendMethod = "定时发送";
                            }
                        }
                    }
                }]
            }, {
                xtype: 'xDateTime',
                fieldLabel: '发送时间',
                name: "datsend",
                id: "datsenddiy",
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
        var smsSendTestPanelDiy = new Ext.Panel({
            frame: true,
            labelWidth: 80,
            border: false,
            items: [{
                layout: 'column',
                defaults: {
                    bodyStyle: 'padding:0px 0 0 5px;',
                    anchor: '100%'
                },
                items: [{
                    columnWidth: .6,
                    layout: 'form',
                    border: false,
                    defaults: {
                        anchor: '90%'
                    },
                    items: [{
                        xtype: "textfield",
                        name: "vc2mobile",
                        value: Js.Center.Common.userMobile,
                        id: "SMSsendtestmobilediy",
                        fieldLabel: "测试手机号"//,
                        //allowBlank: false
                        //regex: WXTL.Common.regex.Mobile,
                        //regexText: "手机号码格式不正确"
                    }]
                }, {
                    columnWidth: .4,
                    layout: 'form',
                    border: false,
                    items: [{
                        xtype: 'button',
                        id: 'SMSsenddiytestbtnsendtest',
                        text: '发送测试短信',
                        allowBlank: false,
                        handler: function(){
                            if (Ext.get("SMSsendtestmobilediy").getValue() == "" || Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SMSnumproductiddiy").getValue() == "") {
                                Ext.Msg.alert("温馨提示", "测试手机号码和通道组不能为空!");
                            }
                            else {
                            
                                if (smsContentdiy.isValid()) {
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
                                        flag: 'sendtestdiy',
                                        vc2mobile: Ext.get("SMSsendtestmobilediy").dom.value,
                                        numclassid: '0',
                                        vc2content: smsContentdiy.getValue(),
                                        vc2signature: LOCALUSERIOGRAPH,
                                        nummessageformat: 34,
                                        numproductid: Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SMSnumproductiddiy").getValue(),
                                        datsend: Ext.get("datsenddiy").dom.value
                                    };
                                    
                                    doAjax(Js.Center.SendSMS.SmsContentUpdateURL, parms);
                                }
                                
                            }
                            
                            
                        }
                    }]
                }]
            
            }]
        });
        
        var smsSendContentPanelDiy = new Ext.Panel({
            frame: true,
            labelWidth: 95,
            border: false,
            items: [{
                layout: 'column',
                defaults: {
                    bodyStyle: 'padding:0px 0 0 0px;',
                    anchor: '100%'
                },
                items: [{
                    columnWidth: .88,
                    layout: 'form',
                    border: false,
                    defaults: {
                        anchor: '96%'
                    },
                    items: [smsContentdiy]
                }, {
                    columnWidth: .12,
                    layout: 'form',
                    border: false,
                    items: [{
                        xtype: 'button',
                        text: '使用模板',
                        handler: function(){
                            Js.Center.SendSMS.SMSTemplateinfo.func();
                        	Js.Center.SendSMS.SMSTemplateinfo.Window.setPosition(200, 80);
                        }
                    }]
                }]
            
            }]
        });
        //=============================================================定义formpanel
        var SMSSenddiyPanelDiy = new Ext.FormPanel({
            id: "SMSSenddiyPanelDiy",
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
                        //bodyStyle: "padding:10px 0 10px 15px",
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
                        //bodyStyle: "padding:10px 0 10px 15px",
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
				xtype:'UploadLargeFilePanel',
				id:'Js.Center.SendSMS.SMSsenddiy.UploadLargeFile',
				txtMsgHeight:'75',
				needLargfile: false,
				fieldlableFile:getHelpMsg("文件", true, "1.上传的文件扩展名必须是txt<br>2.支持客户端文件,客户端文件大小最大限制为4M<br>3.个性化内容的格式是:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot李先生&quot,&quot富国天益&quot,&quot 1.003&quot]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot刘先生&quot,&quot华夏成长&quot,&quot 1.173&quot]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot赵先生&quot,&quot富国天益&quot,&quot 1.003&quot]")
//                xtype: 'fileuploadfield',
//                id: 'Js.Center.SendSMS.SMSsenddiy.SMSmobilefilediy',
//                style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
//                name: 'mobilefile',
//                fieldLabel:getHelpMsg("文件", true, "1.上传的文件扩展名必须是txt<br>2.支持客户端文件,客户端文件大小最大限制为2M<br>3.个性化内容的格式是:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot李先生&quot,&quot富国天益&quot,&quot 1.003&quot]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot刘先生&quot,&quot华夏成长&quot,&quot 1.173&quot]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot赵先生&quot,&quot富国天益&quot,&quot 1.003&quot]"),
//                allowBlank: false,
//                blankText: "请选择上传文件",
//                width: 400,
//                //inputType: 'file',
//                validator: function(){
//                    var filePath = Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SMSmobilefilediy").getValue();
//                    if (filePath != '') {
//                    
//                        if (checkFile(filePath) != '') {
//                            this.invalidText = checkFile(filePath);
//                            return false;
//                        }
//                        else {
//                            return true;
//                        }
//                    }
//                    else 
//                        return false;
//                }
            },smsSendContentPanelDiy, smsFieldSetDiy, smsSendTestPanelDiy]
        });
        //var mainForm = SMSSenddiyPanelDiy.getForm();
        
        //============================================================================ 定义窗体
        Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin = new WXTL.Widgets.CommonWindows.Window({
            title: "发送个性化短信",
            //height:500,
            mainForm: SMSSenddiyPanelDiy.getForm(),
            needButtons: false,
            updateURL: Js.Center.SendSMS.SmsContentUpdateURL,
            displayStore: Js.Center.SendSMS.Send.DisplayStore,
            closeAction: 'hide',
            updateState: true,
            updateRecord: row,
            items: [SMSSenddiyPanelDiy],
            buttons: [new Ext.Button({
                text: '提交发送',
                minWidth: 70,
                handler: function(){
                    Js.Center.SendSMS.SMSsenddiy.saveSMS("submit");
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(){
                	var row = Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.updateRecord;
                    if (row != null) {
                        SMSSenddiyPanelDiy.getForm().reset();
                        SMSSenddiyPanelDiy.getForm().loadRecord(row);
						
						if(row.data.vc2content.indexOf(USERIOGRAPH)> -1){
							Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SendSMSContentdiy").setValue(row.data.vc2content.replace(USERIOGRAPH,''));
				        	document.getElementById("Js.Center.SendSMS.SMSsenddiy.cbk").checked = true;
				        	Js.Center.SendSMS.SMSsenddiy.toggleChkGraph(true);
						}
						else{
							Js.Center.SendSMS.SMSsenddiy.toggleChkGraph(false);
						}
                    }
                    else {
                        SMSSenddiyPanelDiy.getForm().reset();
						document.getElementById("Js.Center.SendSMS.SMSsenddiy.cbk").checked = false;
						Js.Center.SendSMS.SMSsenddiy.toggleChkGraph(false);                    	
                    }
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
                    // Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.close();
                    Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.hide();
                    //groupPanel.reset();
                    SMSSenddiyPanelDiy.getForm().reset();
                    
                }
            })],
            listeners: {
                "show": function(){
                    Js.Center.Common.ProductStore.reload({
                        params: {
                            vc2servicetype: '1'
                        }
                    });
                    
                    //SMSSenddiyPanelDiy.items.items[1].hideTabStripItem("sendbyproductdiy");
                },
                "beforehide": function(){
                    SMSSenddiyPanelDiy.getForm().reset();
                    //groupPanel.reset();
                    
                    Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.mainForm.reset();
                    //SMSSenddiyPanelDiy.items.items[1].setActiveTab(0);
                	document.getElementById("Js.Center.SendSMS.SMSsenddiy.cbk").checked = false;
                	Js.Center.SendSMS.SMSsenddiy.toggleChkGraph(false);
                }
            }
        });
    }
    else {
        Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.mainForm.items.each(function(f){
            if (f.xtype != null) 
                f.reset();
            else {
                f.df.reset();
            }
        });
        Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.updateRecord = row;
    };
    
    var isSelfValid = function(method){
        var valid = true;
        if (method == "submit") {
            if (!Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.mainForm.items.items[0].isValid()) {
                valid = false;
            }
			if(!Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.UploadLargeFile").items.items[0].items.items[2].items.items[0].validate()){
				return false;
			}
			if(!Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.UploadLargeFile").items.items[0].items.items[0].items.items[2].validate()){
				return false;
			}
//            if (!Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SMSmobilefilediy").isValid()) 
//                valid = false;
            if (!Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SendSMSContentdiy").isValid()) 
                valid = false;
        }
        else 
            if (method == "sendtest") {
                if (!Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SendSMSContentdiy").isValid()) 
                    valid = false;
            //if (!Ext.getCmp("SMSsenddiytestbtnsendtest").isValid()) 
            //  valid = false;
            }
        /*  panel.items.each(function(f){
         //if (panel.id != "sendbyproductdiy") {
         if (method != "sendtest") {
         if (panel.id == "sendbyusergroupdiy") {
         
         if (f.xtype != "hidden") {
         if (!f.items.items[1].validate()) {
         valid = false;
         }
         }
         }
         
         else {
         if (!f.validate())
         valid = false;
         }
         }
         // }
         
         });
         Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.items.items[0].items.items[2].items.each(function(f){
         if (f.id != "SMSsendbtnsendtestdiy") {
         if (!f.validate()) {
         valid = false;
         }
         }
         
         });*/
        return valid;
    };
    
    
    Js.Center.SendSMS.SMSsenddiy.saveSMS = function(method){
    
        if (Ext.get("sendflagdiy") != null) 
            Ext.get("sendflagdiy").dom.value = method;
        
        Ext.getCmp('Js.Center.SendSMS.SMSsenddiy.smscontent').setValue(Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SendSMSContentdiy").getValue());    
        if (isSelfValid(method)) {
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
            Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.mainFormSubmitFunc(); 
            
        }
    };
    if (show != null) {
        if (show != false) {
            Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.show();
        }
    }
    else {
        Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.show();
    }
    //============================================================================执行显示
    //Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.show();
    //setUserGroupList();
};
