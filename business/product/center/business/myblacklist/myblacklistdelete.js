/*
 *退出客户黑名单
 */
Ext.namespace('Js.Center.Business.MyBlacklistDelete');
Ext.QuickTips.init();

Js.Center.Business.MyBlacklistDelete.func = function() {
if(Js.Center.Business.MyBlacklistDelete.window==null)
{
    //=============================================================通道下拉列表数据定义
    Js.Center.Common.ProductStore.reload();
    //============================================================================ 定义文件formpanel
    var MyDeleteByFilePanel = new Ext.form.FormPanel({
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
            xtype: 'fileuploadfield',
            style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
            name: 'mobilefile',
            fieldLabel: WXTL.Common.help.MOBILEFILE,
            allowBlank: false,
            blankText: "请选择上传文件",
            width: 500,
            //inputType: 'file',
            validator: function() {
                var filePath = mainForm.items.items[0].getValue();
                if (filePath != '') {
                    mainForm.items.items[1].el.dom.value = getFileMessage(filePath);
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
            height: 180
        }, {
            xtype: 'hidden',
            name: 'flag',
            value: 'deletebyfile'
}]
        });
        //============================================================================ 定义列表formpanel	
        var MyDeleteByListPanel = new Ext.form.FormPanel({
            title: "列表方式",
            width: 600,
            border: false,
            frame: true,
            labelWidth: 80,
            defaults: {
                msgTarget: "side"
            },
            items: [{
                xtype: 'textarea',
                name: 'mobilelist',
                fieldLabel: WXTL.Common.help.MOBILELIST,
                width: 300,
                height: 200,
                allowBlank: false,
                blankText: "请输入手机号码列表",
                validator: function(value) {
                    return checkMobileList(value, 1000);
                }
            }, {
                xtype: 'hidden',
                name: 'flag',
                value: 'deletebylist'
}]
            });
            var mainForm = MyDeleteByFilePanel.getForm();
            //============================================================================ 定义tabpanel
            var tabPanel = new Ext.TabPanel({
                height: 300,
                border: false,
                width: 650,
                activeTab: 0, //默认激活第一个tab页
                animScroll: true, //使用动画滚动效果
                enableTabScroll: true, //tab标签超宽时自动出现滚动按钮
                items: [MyDeleteByFilePanel, MyDeleteByListPanel],
                listeners: {
                    "tabchange": function(TabPanel, Panel) {
                        if (Js.Center.Business.MyBlacklistDelete.window) {
                            mainForm = Panel.getForm();
                            Js.Center.Business.MyBlacklistDelete.window.mainForm = mainForm;
                        }
                    }
                }
            });
            //============================================================================ 定义窗体
            this.window = new WXTL.Widgets.CommonWindows.Window({
                title: "退出客户黑名单",
                iconCls: 'deleteicon',
                mainForm: mainForm,
                updateURL: Js.Center.Business.MyBlackUpdateURL,
                displayStore: Js.Center.Business.Myblacklist.Infostore,
                items: [tabPanel],
			    listeners:{
			        "show":function (){
			           Js.Center.Business.MyBlacklistDelete.window.items.items[0].setActiveTab(0);
			           Js.Center.Business.MyBlacklistDelete.window.items.items[0].items.items[0].getForm().reset();
			           Js.Center.Business.MyBlacklistDelete.window.items.items[0].items.items[1].getForm().reset();
			        }
			    }
            });
            //============================================================================执行显示
}
};
