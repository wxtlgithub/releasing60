Ext.namespace('Js.Center.Business.Product.ppmainbackupUpdate');

Js.Center.Business.Product.ppmainbackupUpdate.func = function(row){

    if(Js.Center.Business.Product.ppmainbackupUpdate.window==null){
    // ================================================================ 定义FormPanel
    var updateGatewaymfp = new Ext.form.FormPanel({
        frame: true,
        labelWidth: 80,
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: 'updaterotestaras'
            }, {
                xtype: "hidden",
                name: "numstraid"
            
            }, {
                xtype: "hidden",
                name: "numtypeid",
                value: "2"
            }, {
                xtype: "hidden",
                id: "Js.Center.Business.Product.ppmainbackupUpdate.numprodid",
                name: "numprodid"
            
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
                    id: "Js.Center.Business.Product.ppmainbackupUpdate.numsvcid",
                    allowBlank: false,
                    blankText: "主通道区不允许为空",
                    readOnly: true,
                    mode: "local",
                    displayField: "vc2svcname",
                    valueField: "numsvcid",
                    triggerAction: "all",
                    emptyText: "-=请选择=-",
                    store: Js.Center.Common.ServiceCodeStore,
                    listeners: {
                        "select": function(){
                			if (Ext.fly("Js.Center.Business.Product.ppmainbackupUpdate.numsvcid").getValue() == Ext.fly("Js.Center.Business.Product.ppmainbackupUpdate.numassvcid").getValue()) {
                                Ext.getCmp("Js.Center.Business.Product.ppmainbackupUpdate.numsvcid").reset();
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
                    id: "Js.Center.Business.Product.ppmainbackupUpdate.numassvcid",
                    hiddenName: "numassvcid",
                    allowBlank: false,
                    blankText: "备用通道不允许为空",
                    readOnly: true,
                    mode: "local",
                    displayField: "vc2svcname",
                    valueField: "numsvcid",
                    triggerAction: "all",
                    emptyText: "-=请选择=-",
                    store: Js.Center.Common.ServiceCodeStore,
                    listeners: {
                        "select": function(){
                            if (Ext.fly("Js.Center.Business.Product.ppmainbackupUpdate.numsvcid").getValue() == Ext.fly("Js.Center.Business.Product.ppmainbackupUpdate.numassvcid").getValue()) {
                                Ext.getCmp("Js.Center.Business.Product.ppmainbackupUpdate.numassvcid").reset();
                            }
                        }
                    }
                }]
            }]
        }]
    });
    
    //==============================================================定义窗体
    var mainForm = updateGatewaymfp.getForm();
    
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "修改主备策略",
        mainForm: mainForm,
        updateURL: Js.Center.Business.RoutestraURL,
        displayStore: Js.Center.Business.productpolicy.MainBackupInfostore,
        updateState: true,
        updateRecord: row,
        items: [updateGatewaymfp],
        needLoadDataStore: true,
        loadDataStoreFunc: function(){
    		Js.Center.Common.ServiceCodeStore.reload();
            if (Js.Center.Business.Product.ppmainbackupUpdate.window.mainForm) 
                Js.Center.Business.Product.ppmainbackupUpdate.window.mainForm.reset();
            
            Js.Center.Business.Product.ppmainbackupUpdate.window.center();
            if (Js.Center.Business.Product.ppmainbackupUpdate.window.updateState && Js.Center.Business.Product.ppmainbackupUpdate.window.updateRecord != null) {
                Js.Center.Business.Product.ppmainbackupUpdate.window.mainForm.loadRecord(Js.Center.Business.Product.ppmainbackupUpdate.window.updateRecord);
            }
            
        },
        needButtons: false,
        buttons: [new Ext.Button({
            text: '确定',
            minWidth: 70,
            handler: function(){
                if (Js.Center.Business.Product.ppmainbackupUpdate.window.mainForm.isValid()) {
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
                    Js.Center.Business.Product.ppmainbackupUpdate.window.mainFormSubmitFunc();
                    
                }
            }
        }), new Ext.Button({
            text: '重置',
            minWidth: 70,
            qtip: "重置数据",
            handler: function(){
                Js.Center.Business.Product.ppmainbackupUpdate.window.mainForm.reset();
                if (Js.Center.Business.Product.ppmainbackupUpdate.window.updateRecord.get('vc2type') == 1 || Js.Center.Business.Product.ppmainbackup.window.updateRecord.get('vc2type') == 4) {
                    Ext.getCmp("Js.Center.Business.Product.ppmainbackup.Package").setValue(1);
                    Ext.getCmp("Js.Center.Business.Product.ppmainbackup.Package").disable();
                }
                else {
                    Ext.getCmp("Js.Center.Business.Product.ppmainbackup.Package").enable();
                }
                if (Js.Center.Business.Product.ppmainbackupUpdate.window.updateState && Js.Center.Business.Product.ppmainbackupUpdate.window.updateRecord != null) 
                    Js.Center.Business.Product.ppmainbackupUpdate.window.mainForm.loadRecord(Js.Center.Business.Product.ppmainbackupUpdate.window.updateRecord);
            }
        }), new Ext.Button({
            text: '取消',
            minWidth: 70,
            handler: function(){
                if (Js.Center.Business.Product.ppmainbackupUpdate.window.closeAction == 'close') {
                    Js.Center.Business.Product.ppmainbackupUpdate.window.close();
                }
                else {
                    Js.Center.Business.Product.ppmainbackupUpdate.window.hide();
                }
                
            }
        })]
    });
    }
    // else 
    //    Js.Center.Business.Product.ppmainbackup.UpdateGatewaymWin.updateRecord = row;


    //=============================================================执行显示
    //Js.Center.Business.Product.ppmainbackup.UpdateGatewaymWin.show();
};
