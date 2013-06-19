Ext.namespace('Js.Center.Business.ProductAdd');
Ext.QuickTips.init();

Js.Center.Business.ProductAdd.func = function(){
    
    //if (Js.Center.Business.ProductAdd.AddproductInfoWin == null) {
    // =====================================================================定义FormPanel
    var AddproductInfofp = new Ext.form.FormPanel({
        //id: "AddproductInfofp",
        //width: 600,
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
            xtype: "hidden",
            name: "flag",
            value: "insert"
        }, {
            xtype: "textfield",
            name: "vc2name",
            fieldLabel: "<font color=red>通道组名称</font>",
            allowBlank: false,
            blankText: "通道组名称不允许为空",
            regex: WXTL.Common.regex.Illegal,
            regexText: WXTL.Common.regexText.IllegalText,
            maxLength: 10
        }, {
            xtype: "combo",
            name: "vc2servicetype",
            fieldLabel: "<font color=red>短彩类型</font>",
            hiddenName: "vc2servicetype",
            readOnly: true,
            allowBlank: false,
            mode: "local",
            displayField: "show",
            valueField: "value",
            triggerAction: "all",
            value: "1",
            store: new Ext.data.SimpleStore({
                fields: ["show", "value"],
                data: [["短信", "1"], ["彩信", "2"], ["wap", "3"]]  //, ["短信PV", "4"], ["彩信PV", "5"], ["wapPV", "6"]
            })
        }, {
            //width: 460,
            height: 100,
            xtype: "textarea",
            name: "vc2dsc",
            fieldLabel: "通道组描述",
            regex: WXTL.Common.regex.Illegal,
            regexText: WXTL.Common.regexText.IllegalText,
            maxLength: 100
        }]
    
    });
    // ======================================================================= 定义窗体
    var mainForm = AddproductInfofp.getForm();
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "添加通道组",
        mainForm: mainForm,
        updateURL: Js.Center.Business.ProductUpdateURL,
        displayStore: Js.Center.Business.Product.Infostore,
        items: [AddproductInfofp]
    });
    //}
    //Js.Center.Business.ProductAdd.AddproductInfoWin.mainForm.reset();
    // ======================================================================== 执行显示    
   // Js.Center.Business.ProductAdd.AddproductInfoWin.show();
};
