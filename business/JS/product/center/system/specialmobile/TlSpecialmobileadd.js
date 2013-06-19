
Ext.namespace('Js.Center.System.SpecialMobileAdd');

Js.Center.System.SpecialMobileAdd.func = function(){

    // ---------------------------------------------------- 定义FormPanel
    var AddtlspecialmobileInfofp = new Ext.form.FormPanel({
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
        	xtype: "combo",
            name: "numsvcid",
            fieldLabel: "<font color=red>通道</font>",
            hiddenName: "numsvcid",
            readOnly: true,
            mode: "local",
            typeAhead: true,
            triggerAction: 'all',
            selectOnFocus: true,
            emptyText: '-=请选择=-',
            allowBlank: false,
            blankText: "通道不允许为空",
            displayField: "vc2svcname",
            valueField: "numsvcid",
            store: Js.Center.Common.ServiceCodeStore
        },{
        	xtype:'textarea',
        	name:'mobilelist',
            fieldLabel: getHelpMsg("手机号码", true, "1、每行一个手机号码，以回车换行<br>2、最多可输入100行<br>3、示例：<br>13800000000<br>13900000000"),
            width: 300,
            height: 200,
        	allowBlank: false,
            blankText: "请输入手机号码列表",
            maxLength: 2000,
            maxLengthText: "请将输入内容控制在100行以内！",
            validator: function(value){
                return checkMobileList(value, 100);
            }
        }]
    });
    
 // ======================================================================= 定义窗体
    var mainForm = AddtlspecialmobileInfofp.getForm();
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "添加特殊手机号码",
        mainForm: mainForm,
        updateURL: Js.Center.System.SpecialMobileUpdateURL,
        displayStore: Js.Center.System.SpecialMobile.Infostore,
        items: [AddtlspecialmobileInfofp]
    });
};

