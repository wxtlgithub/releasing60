Ext.namespace('Js.Center.Business.MORouterUpdate');

Js.Center.Business.MORouterUpdate.func = function(row){
   
    //=============================================================产品下拉列表数据定义
    
    var updateInfoFormPanel = new Ext.form.FormPanel({
        frame: true,
        labelWidth: 88,
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "update"
            }, {
                xtype: "hidden",
                name: "numrouteid",
                fieldLabel: "路由编号"
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
                    xtype: "textfield",
                    name: "vc2longcode",
                    fieldLabel: "长号码",
                    regex: /^\d{0,20}$/,
                    regexText: '请输入长度20以内的数字！'
                }, {
                    xtype: "combo",
                    name: "vc2lcmatch",
                    fieldLabel: "<font color=red>长号码匹配标志</font>",
                    hiddenName: "vc2lcmatch",
                    emptyText: "请选择",
                    readOnly: true,
                    mode: "local",
                    displayField: "show",
                    valueField: "value",
                    triggerAction: "all",
                    value: 0,
                    allowBlank: false,
                    blankText: "长号码匹配标志不允许为空",
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["模糊", "0"], ["精确", "1"]]
                    })
                }, {
                    xtype: "xComboBox",
                    name: "numrpgmid",
                    fieldLabel: "<font color=red>程序名称</font>",
                    hiddenName: "numrpgmid",
                    readOnly: true,
                    mode: "local",
                    displayField: 'vc2clientname',
                    valueField: 'numclientid',
                    triggerAction: "all",
                    allowBlank: false,
                    blankText: "程序名称不允许为空",
                    emptyText: '-=请选择=-',
                    store: Js.Center.Common.ProgramStore
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
                    xtype: "textfield",
                    name: "vc2cmd",
                    fieldLabel: "指令",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 10,
                    maxLengthText: '长度不能超过10！'
                }, {
                    xtype: "combo",
                    name: "vc2cmdmatch",
                    fieldLabel: "<font color=red>指令匹配标志</font>",
                    hiddenName: "vc2cmdmatch",
                    emptyText: "请选择",
                    readOnly: true,
                    mode: "local",
                    displayField: "show",
                    valueField: "value",
                    triggerAction: "all",
                    value: 0,
                    allowBlank: false,
                    blankText: "指令匹配标志不允许为空",
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["模糊", "0"], ["精确", "1"]]
                    })
                }, {
                    xtype: "xComboBox",
                    name: "numgwid",
                    fieldLabel: "<font color=red>网关名称</font>",
                    hiddenName: "numgwid",
                    readOnly: true,
                    mode: "local",
                    displayField: 'vc2gatewayname',
                    valueField: 'numgwid',
                    triggerAction: "all",
                    allowBlank: false,
                    blankText: "网关名称不允许为空",
                    emptyText: '-=请选择=-',
                    store: Js.Center.Common.GatewayStore
                }]
            }]
        }, {
            layout: 'form',
            defaultType: "textfield",
            //锚点布局-
            defaults: {
                anchor: "90%",
                msgTarget: "side"
            },
            buttonAlign: "center",
            bodyStyle: "padding:0px 0 0px 15px",
            items: [{
                //width: 500,
                height: 100,
                xtype: "textarea",
                name: "vc2dsc",
                fieldLabel: "路由描述",
                regex: WXTL.Common.regex.Illegal,
                regexText: WXTL.Common.regexText.IllegalText,
                maxLength: 100
            }]
        }]
    });
    
    var mainForm = updateInfoFormPanel.getForm();
    
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "修改路由",
        mainForm: mainForm,
        updateURL: Js.Center.Business.MORouterUpdateURL,
        displayStore: Js.Center.Business.MORouter.Infostore,
        updateState: true,
        updateRecord: row,
        items: [updateInfoFormPanel],        needLoadDataStore:true,        loadDataStoreFunc: function(){            Js.Center.Common.ProgramStore.reload();            Js.Center.Common.GatewayStore.reload();        }
    });
    
    //Js.Center.Business.MORouterUpdate.UpdateWin.show();
};
