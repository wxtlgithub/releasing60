Ext.namespace('Js.Center.Business.WhitelistAdd');
Ext.QuickTips.init();

Js.Center.Business.WhitelistAdd.func = function(){
    if (Js.Center.Business.WhitelistAdd.window == null) {
		var uploadFilePanel = new WXTL.Widgets.CommonPanel.UploadLargeFilePanel({
			//url:'/url/upload.ashx',
			needLargfile: false,
			id: "Js.Center.Business.WhitelistAdd.UploadLargeFile"
		});
        //============================================================================ 定义文件formpanel
        var addByFilePanel = new Ext.form.FormPanel({
            title: "文件方式",
            width: 600,
            border: false,
            fileUpload: true,
            frame: true,
            labelWidth: 80,
            defaults: {
                msgTarget: "side"
            },
            items: [{
                xtype: "hidden",
                name: "whitelistaddnumsvcid",
                value: "1"
            }, uploadFilePanel,{
//                //                xtype: "xComboBox",
//                //                name: "numsvcid",
//                //                fieldLabel: "<font color=red>选择业务</font>",
//                //                hiddenName: "whitelistaddnumsvcid",
//                //                allowBlank: false,
//                //                blankText: "业务不允许为空",
//                //                readOnly: true,
//                //                mode: "local",
//                //                displayField: "vc2svcname",
//                //                valueField: "numsvcid",
//                //                triggerAction: "all",
//                //                store: Js.Center.Common.ServiceCodeStore
//                //            }, {
//                xtype: 'fileuploadfield',
//                //id: 'whitelistaddmobilefile',
//                style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
//                name: 'mobilefile',
//                fieldLabel: WXTL.Common.help.MOBILEFILE,
//                allowBlank: false,
//                blankText: "请选择上传文件",
//                width: 500,
//                //inputType: 'file',
//                validator: function(){
//                    var filePath = mainForm.items.items[1].getValue();
//                    if (filePath != '') {
//                        mainForm.items.items[2].el.dom.value = getFileMessage(filePath);
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
//            }, {
//                xtype: 'textarea',
//                name: 'filemessage',
//                //id: 'whitelistaddfilemessage',
//                fieldLabel: '文件信息',
//                readOnly: true,
//                width: 500,
//                height: 180
//            }, {
                xtype: 'hidden',
                name: 'flag',
                value: 'insertbyfile'
            }]
        });
        //============================================================================ 定义列表formpanel	
        var addByListPanel = new Ext.form.FormPanel({
            title: "列表方式",
            width: 600,
            border: false,
            frame: true,
            labelWidth: 80,
            defaults: {
                msgTarget: "side"
            },
            items: [{
                xtype: "hidden",
                name: "whitelistaddnumsvcid",
                value: "1"
            }, {
                //                xtype: "xComboBox",
                //                name: "numsvcid",
                //                fieldLabel: "<font color=red>选择业务</font>",
                //                hiddenName: "whitelistaddnumsvcid",
                //                allowBlank: false,
                //                blankText: "业务不允许为空",
                //                readOnly: true,
                //                mode: "local",
                //                displayField: "vc2svcname",
                //                valueField: "numsvcid",
                //                triggerAction: "all",
                //                store: Js.Center.Common.ServiceCodeStore
                //            }, {
                xtype: 'textarea',
                name: 'mobilelist',
                fieldLabel: WXTL.Common.help.MOBILELIST,
                width: 300,
                height: 200,
                allowBlank: false,
                blankText: "请输入手机号码列表",
                validator: function(value){
                    return checkMobileList(value, 1000);
                }
            }, {
                xtype: 'hidden',
                name: 'flag',
                value: 'insertbylist'
            }]
        });
        var mainForm = addByFilePanel.getForm();
        //============================================================================ 定义tabpanel
        var tabPanel = new Ext.TabPanel({
            height: 260,
            border: false,
            width: 650,
            activeTab: 0, //默认激活第一个tab页
            animScroll: true, //使用动画滚动效果
            enableTabScroll: true, //tab标签超宽时自动出现滚动按钮
            items: [addByFilePanel, addByListPanel],
            listeners: {
                "tabchange": function(TabPanel, Panel){
                    if (Js.Center.Business.WhitelistAdd.window) {
                        mainForm = Panel.getForm();
                        Js.Center.Business.WhitelistAdd.window.mainForm = mainForm;
                    }
                }
            }
        });
        //============================================================================ 定义窗体
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "添加系统白名单",
            mainForm: mainForm,
            updateURL: Js.Center.Business.WhiteUpdateURL,
            displayStore: Js.Center.Business.WhitelistAdd.Infostore,
            items: [tabPanel],
            listeners: {
                "show": function(){
                    Js.Center.Business.WhitelistAdd.window.items.items[0].setActiveTab(0);
                    Js.Center.Business.WhitelistAdd.window.items.items[0].items.items[0].getForm().reset();
                    Js.Center.Business.WhitelistAdd.window.items.items[0].items.items[1].getForm().reset();
                }
            }
        });
        
    }
};
