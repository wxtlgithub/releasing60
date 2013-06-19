Ext.namespace('Js.Center.Business.UserGroupUpdate');

Js.Center.Business.UserGroupUpdate.func = function(row){
    
    //=============================================================产品下拉列表数据定义
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
            value: "updateall"
        }, {
            xtype: "hidden",
            name: "numusergroupid",
            fieldLabel: "客户组编号"
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
            value: 0
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
    
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "修改客户组",
        mainForm: mainForm,
        updateURL: Js.Center.Business.UserGroupUpdateURL,
        displayStore: Js.Center.Business.UserGroup.Infostore,
        updateState: true,
        updateRecord: row,
        items: [updateInfofp]
    });
    //Js.Center.Business.UserGroupUpdate.UpdateUserGroupmWin.show();
};
