Ext.namespace('Js.Center.Business.Product.ppbalanceAdd');
Ext.QuickTips.init();

Js.Center.Business.Product.ppbalanceAdd.func = function(){

    if (Js.Center.Business.Product.ppbalanceAdd.window == null) {
        // ================================================================ 定义FormPanel
        var ppbalanceAddInfofp = new Ext.form.FormPanel({
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
            bodyStyle: "padding:10px 0 10px 10px",
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "addrotestarbalance"
            }, {
                xtype: "hidden",
                name: "numprodid",
                id: "Js.Center.Business.Product.ppbalanceAdd.numprodid",
                value: ""
            }, {
                xtype: "hidden",
                name: "numtypeid",
                value: "3"
            }, {
                xtype: "textfield",
                fieldLabel: "选择可使用的通道",
                hidden: true
            }, {
                html: '<div id="Js.Center.Business.Product.ppbalanceAdd.productPanelFieldSet" style="float:left;margin:0px;border:1px solid #c3daf9;width:98%;height:150px;"></div>'
            }]
        });
        // ======================================================================= 定义窗体
        var mainForm = ppbalanceAddInfofp.getForm();
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "添加均衡策略",
            mainForm: mainForm,
            updateURL: Js.Center.Business.RoutestraURL,
            displayStore: Js.Center.Business.productpolicy.BalancedInfostore,
            items: [ppbalanceAddInfofp],
            needLoadDataStore: true,
            width: 590,
            loadDataStoreFunc: function(){
            
                var numprodid = Ext.fly("Js.Center.Business.productpolicy.propermitsvcnumprodid").getValue();
                //Ext.get("Js.Center.Business.Product.ppbalanceAdd.numprodid").dom.vlaue=numprodid;
                Js.Center.Business.Product.ppbalanceAdd.window.mainForm.items.items[1].setValue(numprodid);
                createProductPanel(1, 2);
            },
            needButtons: false,
            buttons: [new Ext.Button({
                text: '确定',
                minWidth: 70,
                handler: function(){
                    if (Js.Center.Business.Product.ppbalanceAdd.window.mainForm.isValid()) {
                        Js.Center.Business.Product.ppbalanceAdd.window.mainFormSubmitFunc();
                        
                    }
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(){
                    Js.Center.Business.Product.ppbalanceAdd.window.mainForm.reset();
                    
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
                    Js.Center.Business.Product.ppbalanceAdd.window.hide();
                }
            })]
        });
    }
    function createProductPanel(productsid, numstraid){
        //通道列表
        document.getElementById('Js.Center.Business.Product.ppbalanceAdd.productPanelFieldSet').innerHTML = '';
        Ext.get('Js.Center.Business.Product.ppbalanceAdd.productPanelFieldSet').dom.innerHTML = '';
        var productList = new WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup({
            url: Js.Center.Business.RoutestraURL,//'testURL/purview/roleupdate.aspx',//
            queryparams: 'flag=addrotestarbalancestore',
            requestname: 'numsvcids',
            defaultsItemsName: 'numsvcids',
            defaultsItemsboxLable: '对不起，没有相关通道信息。',
            numcolumns: 3,
            //blankText: "请选择通道组",
            //allowBlank: false,
            fieldLabel: '<font color=red>通道组</font>',
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
            applyTo: 'Js.Center.Business.Product.ppbalanceAdd.productPanelFieldSet',
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
