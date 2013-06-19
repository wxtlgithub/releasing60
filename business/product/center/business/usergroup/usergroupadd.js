Ext.namespace('Js.Center.Business.UserGroupAdd');
Ext.QuickTips.init();

Js.Center.Business.UserGroupAdd.func = function(){
    
    //============================================================================定义FormPanel
    var updateInfofp = new Ext.form.FormPanel({
        frame: true,
        labelWidth: 80,
        defaults: {
            anchor: '90%',
            msgTarget: 'side'
        },
        items: [{
            xtype: "hidden",
            name: "flag",
            value: "insert"
        }, {
            xtype: "textfield",
            name: "vc2usergroupname",
            fieldLabel: "<font color=red>客户组名称</font>",
            allowBlank: false,
            blankText: "客户组名称不允许为空",
            regex: WXTL.Common.regex.Illegal,
            regexText: WXTL.Common.regexText.IllegalText,
            maxLength: 15,
			maxLengthText:'长度不能超过15'
        }, {
            xtype: "hidden",
            name: "numprodid",
            value: 1
        }, {
            xtype: "textarea",
            name: "vc2usergroupdesc",
            fieldLabel: "备注",
            regex: WXTL.Common.regex.Illegal,
            regexText: WXTL.Common.regexText.IllegalText,
            height: 100,
            maxLength: 100
        }]
    });
    var mainForm = updateInfofp.getForm();
    //============================================================================定义窗体
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "添加客户组",
        mainForm: mainForm,
        updateURL: Js.Center.Business.UserGroupUpdateURL,
        displayStore: Js.Center.Business.UserGroup.Infostore,
        items: [updateInfofp]
    });
    
    //============================================================================执行显示
    //Js.Center.Business.UserGroupAdd.AddUserGroupInfoWin.show();
};
