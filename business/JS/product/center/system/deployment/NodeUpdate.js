Ext.namespace('Js.Center.System.Deployment.NodeUpdate');
Ext.QuickTips.init();

Js.Center.System.Deployment.NodeUpdate.func = function(row){

    if (Js.Center.System.Deployment.NodeUpdate.window == null) {
        // ================================================================ 定义FormPanel
        var UpdateInfofp = new Ext.form.FormPanel({
            frame: true,
            labelWidth: 80,
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
            	xtype:"hidden",
            	name:"flag",
            	value:"updatenode"
            },{
            	xtype:"hidden",
            	name:"numtaskid",
            	fieldLabel:"网元编号"
            },{
                xtype: "textfield",
                name: "vc2taskname",
                fieldLabel: "<font color=red>网元名称</font>",
                allowBlank: false,
                blankText: "网元名称不允许为空",
                regex: WXTL.Common.regex.Illegal,
                regexText: WXTL.Common.regexText.IllegalText,
                maxLength: 50
            },{
                xtype: "textfield",
                name: "vc2taskdesc",
                fieldLabel: "网元描述",
                regex: WXTL.Common.regex.Illegal,
                regexText: WXTL.Common.regexText.IllegalText,
                maxLength: 50
            }]
        });
        // ======================================================================= 定义窗体
        var mainForm = UpdateInfofp.getForm();
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "修改网元",
            mainForm: mainForm,
            updateURL: Js.Center.System.Deployment.DeploymentQueryURL,
            displayStore: Js.Center.System.Deployment.Node.Infostore,
            updateState: true,
            updateRecord: row,
            items: [UpdateInfofp]
        });
    }
};
