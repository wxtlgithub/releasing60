/*
 * 报警短信设置
 */
Ext.namespace('Js.Center.Alert.AlertMobileSet');
Js.Center.Alert.AlertMobileSet.func = function(row){
	//Js.Center.Common.ProductStore.reload();
	//===================定义FormPanel
	if(Js.Center.Alert.AlertMobileSet.window == null){
		var mainFormPanel = new Ext.form.FormPanel({
			frame: true,
	        labelWidth: 110,
	        layout: 'form',
	        //defaultType: "textfield",
	        //锚点布局-
	        defaults: {
	            anchor: "90%",
	            msgTarget: "side"
	        },
	        buttonAlign: "right",
	        bodyStyle: "padding:10px 0 10px 15px",
	        items:[{
	        	xtype:'hidden',
	        	name:'flag',
	        	value:'updatealertmobileset'
	        },{
	        	xtype: "combo",
                name: "8001_defaultproduct",
                fieldLabel: "<font color=red>通道组</font>",
                hiddenName: "8001_defaultproduct",
                readOnly: true,
                mode: "local",
                typeAhead: true,
                triggerAction: 'all',
                selectOnFocus: true,
                emptyText: '-=请选择=-',
                allowBlank: false,
                blankText: "通道组不允许为空",
                displayField: 'vc2name',
                valueField: 'numprodid',
                store: Js.Center.Common.ProductStore
	        },{
	        	xtype:'textarea',
	        	name:'8001_mobilelist',
                fieldLabel: getHelpMsg("接收预警信息的手机号码", true, "1、每行一个手机号码，以回车换行<br>2、最多可输入15行<br>3、示例：<br>13800000000<br>13900000000"),
                width: 300,
                height: 200,
	        	allowBlank: false,
                blankText: "请输入手机号码列表",
                maxLength: 200,
                maxLengthText: "请将输入内容控制在15行以内！",
                validator: function(value){
                    return checkMobileList(value, 15);
                }
	        }]
		});
		// ======================================================================= 定义窗体
	    var mainForm = mainFormPanel.getForm();
	    this.window = new WXTL.Widgets.CommonWindows.Window({
	        title: "手机号码设置",
	        mainForm: mainForm,
	        updateURL: Js.Center.Alert.AlertUpdateURL,
	        updateState: true,
	        updateRecord:row,
	        displayStore: null,
	        items: [mainFormPanel],
	        needLoadDataStore: true,
	    	loadDataStoreFunc: function(){
	    		Js.Center.Common.ProductStore.reload();
	    	}
	    });
	};
	//Js.Center.Alert.AlertMobileSet.window.show();
};