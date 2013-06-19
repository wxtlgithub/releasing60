Ext.namespace('Js.Center.OtherEC.OtherDataUpdate');

Js.Center.OtherEC.OtherDataUpdate.func = function(row){
	// ---------------------------------------------------- 定义FormPanel
	var updateInfoFormPanel = new Ext.form.FormPanel({
		plain : true,
		layout : "form",
		labelWidth : 80,
		defaults : {
			anchor : "95%",
			msgTarget : "side"
		},
		buttonAlign : "center",
        bodyStyle: "padding:10px 0 10px 15px",
        bodyBorder: false,
        border: false,
		items : [{
			xtype : "hidden",
			name : "flag",
			value : "updateotherdata"
		}, {
			xtype : "hidden",
			name : "numsvctype"
		}, {
			xtype : "hidden",
			name : "numopid"
		}, {
			xtype : "textfield",
			name : "vc2month",
			fieldLabel : "账期",
            blankText: "账期",
	        readOnly: true
		}, {
			xtype : "textfield",
			name : "vc2ecid",
			fieldLabel : "客户id",
            blankText: "客户id",
	        readOnly: true
		}, {
			xtype : "textfield",
			name : "vc2servcode",
			fieldLabel : "服务代码",
            blankText: "服务代码",
	        readOnly: true
		}, {
			xtype : "textfield",
			name : "vc2svctype",
			fieldLabel : "短彩类型",
	        readOnly: true
        }, {
			xtype : "textfield",
			name : "vc2name",
			fieldLabel : "运营商",
	        readOnly: true
        }, {
			xtype : "textfield",
			name : "nummtcnt",
			fieldLabel : "<font color=red>发送量<font>",
            regex: WXTL.Common.regex.Integer,
            regexText: "只能输入数字",
            allowBlank:false,
            maxLength: 9,
			maxLengthText:'长度不能超过9'
		}]
	});
    var mainForm = updateInfoFormPanel.getForm();
    //============================================================================定义窗体
    this.window = new WXTL.Widgets.CommonWindows.Window({
		width: 400,
        title: "修改其他平台数据",
        mainForm: mainForm,
        updateURL: Js.Center.OtherEC.OtherDataURL,
        displayStore: Js.Center.OtherEC.OtherData.OtherDatastore,
        updateState: true,
        updateRecord: row,
        items: [updateInfoFormPanel]
    });
};