Ext.namespace('Js.Center.Business.Product.ppbalanceUpdate');
Ext.QuickTips.init();

Js.Center.Business.Product.ppbalanceUpdate.func = function(row){

    if (Js.Center.Business.Product.ppbalanceUpdate.window == null) {
        // ================================================================ 定义FormPanel
        var ppbalanceUpdateInfofp = new Ext.form.FormPanel({
            frame: true,
            labelWidth: 130,
            layout: 'form',
            //defaultType: "textfield",
            //锚点布局-
            defaults: {
                anchor: "99%",
                msgTarget: "side"
            },
            buttonAlign: "center",
            bodyStyle: "padding:10px 0 10px 15px",
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "updaterotestarbalance"
            },{
                xtype: "hidden",
                name: "numprodid",
                id: "Js.Center.Business.Product.ppbalanceUpdate.numprodid",
                value: ""
            }, {
                xtype: "hidden",
                name: "numtypeid",
                value: "3"
            }, {
                xtype: "hidden",
                name: "numstraid",
                fieldLabel: "路由策略id"
            },  {
                xtype: "textfield",
                fieldLabel: "选择可使用的通道",
                hidden: true
            }, {
                html: '<div id="Js.Center.Business.Product.ppbalanceUpdate.productPanelFieldSet" style="float:left;margin:0px;border:1px solid #c3daf9;width:100%;height:150px;"></div>'
            }]
        });
        // ======================================================================= 定义窗体
        var mainForm = ppbalanceUpdateInfofp.getForm();
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "修改均衡策略",
            mainForm: mainForm,
            updateURL: Js.Center.Business.RoutestraURL,
            displayStore: Js.Center.Business.productpolicy.BalancedInfostore,
            updateState: true,
            updateRecord: row,
            items: [ppbalanceUpdateInfofp],
            needLoadDataStore: true,
            width: 590,
            loadDataStoreFunc: function(){
        		var numprodid = Ext.fly("Js.Center.Business.productpolicy.propermitsvcnumprodid").getValue();
        		Js.Center.Business.Product.ppbalanceUpdate.window.mainForm.items.items[1].setValue(numprodid);
        		createProductPanel(Js.Center.Business.Product.ppbalanceUpdate.window.updateRecord.get("numprodid"), Js.Center.Business.Product.ppbalanceUpdate.window.updateRecord.get("numstraid"));
            },
            needButtons: false,
            buttons: [new Ext.Button({
                text: '确定',
                minWidth: 70,
                handler: function(){
                    if (Js.Center.Business.Product.ppbalanceUpdate.window.mainForm.isValid()) {
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
                        Js.Center.Business.Product.ppbalanceUpdate.window.mainForm.submit({
                            url: Js.Center.Business.Product.ppbalanceUpdate.window.updateURL,
                            method: "POST",
                            success: function(form, action){
                                var objJson = Ext.util.JSON.decode(action.response.responseText);
                                var falg = objJson.success;
                                if (falg == true) {
                                    Ext.Msg.alert("温馨提示", "操作成功了!");
                                    Js.Center.Business.Product.ppbalanceUpdate.window.hide();
                                    Js.Center.Business.Product.ppbalanceUpdate.window.displayStore.reload();
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
                    Js.Center.Business.Product.ppbalanceUpdate.window.mainForm.reset();
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
                    Js.Center.Business.Product.ppbalanceUpdate.window.hide();
                }
            })]
        });
    }
    function createProductPanel(productsid, numstraid){
        //通道列表
        document.getElementById('Js.Center.Business.Product.ppbalanceUpdate.productPanelFieldSet').innerHTML = '';
        Ext.get('Js.Center.Business.Product.ppbalanceUpdate.productPanelFieldSet').dom.innerHTML = '';
        var productList = new WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup({
            url: Js.Center.Business.RoutestraURL,//'testURL/purview/roleupdate.aspx',//
            queryparams: 'flag=updatgerotestarbalancestore&numprodid=' + productsid + '&numstraid=' + numstraid,
            requestname: 'numsvcids',
            defaultsItemsName: 'numsvcids',
            defaultsItemsboxLable: '对不起，没有相关通道信息。',
            numcolumns: 3,
            //blankText: "请选择通道组",
            //allowBlank: false,
            //fieldLabel: '<font color=red>通道组</font>',
            messageID: 1,
            reader: new Ext.data.JsonReader({
                totalProperty: 'totalProperty',
                root: 'data',
                fields: [{
                    name: 'id'
                }, {
                    name: 'name'
                
                }, {
                    name: 'boxLabel',
                    mapping: "vc2svcname"
                }, {
                    name: 'inputValue',
                    mapping: "numsvcid"
                }, {
                    name: 'checked',
                    mapping: 'ischecked'
                }]
            })
        });
        var productPanel = new Ext.Panel({
            style: 'padding:0 0 0 5px',
            applyTo: 'Js.Center.Business.Product.ppbalanceUpdate.productPanelFieldSet',
            //autoHeight: true,
            width: 530,
            autoScroll: true,
            items: [{
                items: [productList]
            }]
        });
        productPanel.doLayout();
    };
};
