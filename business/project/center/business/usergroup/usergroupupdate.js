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
//        }, {
//            xtype: "hidden",
//            name: "numprodid",
//            value: 0
        }, {
			// 通道组下拉菜单，2011-10-11，yuanwei add
			xtype : "xComboBox",
			name : "numprodid",
			hiddenName : "numprodid",
			id : 'Js.Center.userGroup.userGroupModifyId',
			emptyText : "-=请选择=-",
			allowBlank : false,
			blankText : "请选择通道组",
			fieldLabel : "<font color=red>选择通道组</font>",
			//readOnly : true,
			mode : "local",
			displayField : "vc2name",
			valueField : "numprodid",
			triggerAction : "all",
			store : Js.Center.Common.UserGroupSelectStore
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
        items: [updateInfofp],
        needLoadDataStore : true,
        loadDataStoreFunc : function() {
        	Js.Center.Common.UserGroupSelectStore.reload();
        }
    });
    //Js.Center.Business.UserGroupUpdate.UpdateUserGroupmWin.show();
};
