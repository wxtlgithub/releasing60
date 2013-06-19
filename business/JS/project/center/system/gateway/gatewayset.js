Ext.namespace('Js.Center.Business.GatewaySet');
Js.Center.Business.GatewaySet.func = function(row){
	//获取配置项Js.Center.Business.GatewayURL
	var configData = doSynRequest(Js.Center.Business.GatewayURL+"?flag=getgatewayconfigitembytype&numgwid="+row.data.numgwid+"&typeid=" + row.data.numgwtypeid);
	// ================================================================ 定义FormPanel
    var updateGatewaymfp = new Ext.form.FormPanel({
    	frame: true,
        labelWidth: 150,
        layout: 'form',
        defaultType: "textfield",
      //锚点布局-
        defaults: {
            anchor: "90%",
            msgTarget: "side"
        },
        buttonAlign: "center",
        bodyStyle: "padding:10px 0 10px 15px",
        items:[{
            xtype: "hidden",
            name: "flag",
            value: 'updateset'
        },{
            xtype: "hidden",
            name: "numgwtypeid",
            value: row.data.numgwtypeid
        },{
            xtype: "hidden",
            name: "vc2gwid",
            value: row.data.numgwid
        }]
    });
  //动态生成配置项
    WXTL.Common.generateConfigFormItem(configData,updateGatewaymfp);
	//===================定义窗体
    var mainForm = updateGatewaymfp.getForm();
	this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "网关配置",
        mainForm: mainForm,
        updateURL: Js.Center.Business.GatewayUpdateURL,
        displayStore: Js.Center.Business.Gateway.Infostore,
        updateState: true,
        updateRecord: row,
        autoScroll:true,
        items: [updateGatewaymfp]
	});
	if(configData.data.length>12){
		this.window.setHeight(400);
	};
	Js.Center.Business.GatewaySet.window.show();
};
//Js.Center.Business.GatewaySet.generateConfigFormItem = function(configData,formPanel){
//	var item;
//	for(var i=0; i<configData.data.length;i++){
//		//判断配置表中是否有值，如果没有配置项的值显示默认值
//		var _value = configData.data[i].itemvalue != ""?configData.data[i].itemvalue:configData.data[i].vc2value;
//    	//根据不同类型创建不同控件
//		if(configData.data[i].numtypeid == 1 || configData.data[i].numtypeid == 5 || configData.data[i].numtypeid == 6|| configData.data[i].numtypeid == 7|| configData.data[i].numtypeid == 8){
//    		item = new Ext.form.TextField({
//    			fieldLabel: configData.data[i].vc2name,
//    			name:configData.data[i].vc2key,
//    			value:_value,
//    			maxLength:configData.data[i].vc2range
//    		});
//    		formPanel.add(item);
//    	}
//    	if(configData.data[i].numtypeid == 2){
//    		//获取配置项范围
//    		var range;
//    		if(configData.data[i].vc2range != ""){
//    			range = configData.data[i].vc2range.split(",");
//    		}
//    		item = new Ext.form.NumberField({
//    			fieldLabel:configData.data[i].vc2name,
//    			name:configData.data[i].vc2key,
//    			value:_value,
//    			minValue:range[0],
//    			maxValue:range[1]
//    		});
//    		formPanel.add(item);
//    	}
//    	if(configData.data[i].numtypeid == 3){
//    		item = new Ext.form.TextArea({
//    			fieldLabel:configData.data[i].vc2name,
//    			name:configData.data[i].vc2key,
//    			value:_value,
//    			maxLength:configData.data[i].vc2range,
//    			height:100
//    		});
//    		formPanel.add(item);
//    	}
//    	if(configData.data[i].numtypeid == 4){
//    		item = new Ext.form.DateField({
//    			fieldLabel:configData.data[i].vc2name,
//    			name:configData.data[i].vc2key,
//    			value:WXTL.Common.dateTime.parseDate(_value),
//    			readOnly: true,
//                emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow()), 'Y-m-d'),
//                format: 'Y-m-d',
//                validateOnBlur: false
//    		});
//    		formPanel.add(item);
//    	}
//    	if(configData.data[i].numtypeid == 9){
//    		item = new Ext.form.ComboBox({
//    			fieldLabel:configData.data[i].vc2name,
//    			name:configData.data[i].vc2key,
//    			hiddenName: configData.data[i].vc2key,
//    			value:_value,
//                readOnly: true,
//                mode: "local",
//                displayField: "show",
//                valueField: "value",
//                triggerAction: "all",
//                emptyText: "请选择",
//                store: new Ext.data.SimpleStore({
//                    fields: ["show", "value"],
//                    data:eval(configData.data[i].vc2range)
//                })
//    		});
//    		formPanel.add(item);
//    	}
//    }
//}
