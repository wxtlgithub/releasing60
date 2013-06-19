Ext.namespace('Js.Center.Business.Product.ppmainbackupAdd');
Ext.QuickTips.init();

Js.Center.Business.Product.ppmainbackupAdd.func = function(){

    if (Js.Center.Business.Product.ppmainbackupAdd.window == null) {
        // ================================================================ 定义FormPanel
        var AddgatewayInfofp = new Ext.form.FormPanel({
        
            //id: "AddgatewayInfofp",
            frame: true,
            labelWidth: 80,
            items: [{
                layout: 'column',
                items: [{
                    xtype: "hidden",
                    name: "flag",
                    value: "addrotestaras"
                },{
                    xtype: "hidden",
                    name: "numtypeid",
                    value: "2"
                },{
                    xtype: "hidden",
					id:"Js.Center.Business.Product.ppmainbackupAdd.numprodid",
                    name: "numprodid"
                    //value:Ext.fly("Js.Center.Business.productpolicy.propermitsvcnumprodid").getValue()
                }, {
                    columnWidth: .5,
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
                        xtype: "combo",
                        name: "numsvcid",
                        fieldLabel: "<font color=red>主通道</font>",
                        hiddenName: "numsvcid",
						id:"Js.Center.Business.Product.ppmainbackupAdd.numsvcid",
                        allowBlank: false,
                        blankText: "主通道不允许为空",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2svcname",
                        valueField: "numsvcid",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                        store:  Js.Center.Common.ServiceCodeStore,
                        listeners: {
                            "select": function(){
                    	if(Ext.fly("Js.Center.Business.Product.ppmainbackupAdd.numsvcid").getValue()==Ext.fly("Js.Center.Business.Product.ppmainbackupAdd.numassvcid").getValue()){
							   //Ext.fly("numsvcid").dom.value="";
								//Ext.fly("Js.Center.Business.Product.ppmainbackupAdd.numsvcid").reset();
							   Js.Center.Business.Product.ppmainbackupAdd.window.mainForm.items.items[3].reset();
							   }
                            }
                        }
                    }]
                }, {
                    columnWidth: .5,
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
                        xtype: "combo",
                        name: "numassvcid",
                        fieldLabel: "<font color=red>备用通道</font>",
                        hiddenName: "numassvcid",
						id:"Js.Center.Business.Product.ppmainbackupAdd.numassvcid",
                        allowBlank: false,
                        blankText: "备用通道不允许为空",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2svcname",
                        valueField: "numsvcid",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                        store:  Js.Center.Common.ServiceCodeStore,
						 listeners: {
                            "select": function(){
                                if(Ext.fly("Js.Center.Business.Product.ppmainbackupAdd.numsvcid").getValue()==Ext.fly("Js.Center.Business.Product.ppmainbackupAdd.numassvcid").getValue()){
                                Js.Center.Business.Product.ppmainbackupAdd.window.mainForm.items.items[4].reset();
							   }
                            }
                        }
                    }]
                }]
            }]
        });
        // ======================================================================= 定义窗体
        var mainForm = AddgatewayInfofp.getForm();
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "添加主备策略",
            mainForm: mainForm,
            updateURL: Js.Center.Business.RoutestraURL,
            displayStore: Js.Center.Business.productpolicy.MainBackupInfostore,
            items: [AddgatewayInfofp],
            needLoadDataStore: true,
            loadDataStoreFunc: function(){
        		Js.Center.Common.ServiceCodeStore.reload();
	            var numprodid = Ext.fly("Js.Center.Business.productpolicy.propermitsvcnumprodid").getValue();
				Ext.getCmp("Js.Center.Business.Product.ppmainbackupAdd.numprodid").setValue(numprodid);
            },
            needButtons: false,
            buttons: [new Ext.Button({
                text: '确定',
                minWidth: 70,
                handler: function(){
					 if (Js.Center.Business.Product.ppmainbackupAdd.window.mainForm.isValid()) {
                        // 弹出效果
                        Ext.MessageBox.show({
                            msg: '正在保存，请稍等...',
                            progressText: 'Saving...',
                            width: 300,
                            wait: true,
                            icon: 'download',
                            animEl: 'saving'
                        });
                        setTimeout(function(){
                            Ext.MessageBox.hide();
                        }, 300000);
                        Js.Center.Business.Product.ppmainbackupAdd.window.mainForm.submit({
                            url: Js.Center.Business.Product.ppmainbackupAdd.window.updateURL,
                            method: "POST",
                            success: function(form, action){
                                var objJson = Ext.util.JSON.decode(action.response.responseText);
                                var falg = objJson.success;
                                if (falg == true) {
                                    Ext.Msg.alert("温馨提示", "操作成功了!");
                                    Js.Center.Business.Product.ppmainbackupAdd.window.hide();
                                    Js.Center.Business.Product.ppmainbackupAdd.window.displayStore.reload();
                                }
                                else 
                                    Ext.Msg.alert('温馨提示', objJson.info);
                            },
                            failure: function(form, action){
                                var objJson = Ext.util.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('温馨提示', objJson.info);
                            }
                        });
                        
                    }
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(){
                    Js.Center.Business.Product.ppmainbackupAdd.window.mainForm.reset();
                    
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
                    Js.Center.Business.Product.ppmainbackupAdd.window.hide();
                }
            })]
        });
    }
    //Js.Center.Business.Product.ppmainbackupAdd.AddgatewayInfoWin.mainForm.reset();	

    // ================================================================== 执行显示


};
