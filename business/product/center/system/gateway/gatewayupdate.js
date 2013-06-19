Ext.namespace('Js.Center.Business.GatewayUpdate');

Js.Center.Business.GatewayUpdate.func = function(row){

    //if(Js.Center.Business.GatewayUpdate.UpdateGatewaymWin==null){
    // ================================================================ 定义FormPanel
    var updateGatewaymfp = new Ext.form.FormPanel({
        frame: true,
        labelWidth: 80,
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: 'updateall'
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
                    name: "numgwid",
                    fieldLabel: "<font color=red>网关编号</font>",
                    allowBlank: false,
                    readOnly: true,
                    blankText: "网关编号不允许为空",
                    regex: WXTL.Common.regex.Integer,
                    regexText: "网关编号不允许为空,且只能输入数字",
                    maxLength: 10
                }, {
                    xtype: "textfield",
                    name: "vc2gatewayname",
                    fieldLabel: "<font color=red>网关名称</font>",
                    allowBlank: false,
                    blankText: "网关名称不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 50
                }, {
                    xtype: "textfield",
                    name: "vc2spnum",
                    fieldLabel: "<font color=red>服务号码</font>",
                    allowBlank: false,
                    blankText: "服务号码不允许为空",
                    regex: /^\d+$/,
                    regexText: "长号码必须为20个以内的数字",
                    maxLength: 20
                }, {
                    xtype: "textfield",
                    name: "vc2gwip",
                    fieldLabel: "<font color=red>网关地址IP</font>",
                    allowBlank: false,
                    blankText: "网关地址IP不允许为空",
                    regex: WXTL.Common.regex.IP,
                    regexText: '网关地址IP格式不正确',
                    maxLength: 50
                },{
                    xtype: "textfield",
                    name: "vc2moip",
                    fieldLabel: "<font color=red>网关MOIP</font>",
                    allowBlank: false,
                    blankText: "网关MOIP不允许为空",
                    regex: WXTL.Common.regex.IP,
                    regexText: '网关MOIP格式不正确',
                    maxLength: 50
                }, {
                    xtype: "textfield",
                    name: "vc2gwusername",
                    fieldLabel: "<font color=red>登录用户</font>",
                    allowBlank: false,
                    blankText: "登录用户不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 50
                }, {
                    xtype: "textfield",
                    name: "vc2spid",
                    fieldLabel: "<font color=red>企业编码</font>",
                    allowBlank: false,
                    blankText: "企业编码不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 50
                }, {
                    xtype: "textfield",
                    name: "vc2speed",
                    fieldLabel: "<font color=red>流速控制</font>",
                    allowBlank: false,
                    blankText: "流速控制不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 50
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
                    name: "vc2type",
                    fieldLabel: "<font color=red>网关类型</font>",
                    hiddenName: "vc2type",
                    allowBlank: false,
                    blankText: "网关类型不允许为空",
                    readOnly: true,
                    mode: "local",
                    displayField: "show",
                    valueField: "value",
                    triggerAction: "all",
                    value: "1",
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["短信", "1"], ["彩信", "2"], ["WAP", "3"], ["短信PV", "4"], ["彩信PV", "5"], ["wapPV", "6"]]
                    })
                }, {
                    xtype: "combo",
                    name: "numopid",
                    fieldLabel: "<font color=red>运营商</font>",
                    hiddenName: "numopid",
                    allowBlank: false,
                    blankText: "运营商不允许为空",
                    readOnly: true,
                    mode: "local",
                    displayField: "vc2name",
                    valueField: "numopid",
                    triggerAction: "all",
                    emptyText: "-=请选择=-",
                    store: Js.Center.Common.OperatorStore
                }, {
                    xtype: "combo",
                    name: "numinstid",
                    fieldLabel: "<font color=red>网关地区</font>",
                    hiddenName: "numinstid",
                    allowBlank: false,
                    blankText: "网关地区不允许为空",
                    readOnly: true,
                    mode: "local",
                    displayField: "vc2name",
                    valueField: "numinstid",
                    triggerAction: "all",
                    emptyText: "-=请选择=-",
                    store: Js.Center.Common.InstStore
                },{
                    xtype: "textfield",
                    name: "vc2gwport",
                    fieldLabel: "<font color=red>网关端口</font>",
                    allowBlank: false,
                    blankText: "网关端口不允许为空",
                    //regex: WXTL.Common.regex.IPPORT,
                    //regexText: '网关端口格式不正确',
                    maxLength: 50
                },{
                    xtype: "textfield",
                    name: "vc2moport",
                    fieldLabel: "<font color=red>网关MO端口</font>",
                    allowBlank: false,
                    blankText: "网关MO端口不允许为空",
                    //regex: WXTL.Common.regex.IPPORT,
                    //regexText: '网关MO端口格式不正确',
                    maxLength: 50
                }, {
                    xtype: "textfield",
                    name: "vc2gwpassword",
                    fieldLabel: "<font color=red>登录密码</font>",
                    inputType:'password',
                    allowBlank: false,
                    blankText: "登录密码不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 50
                },{
                    id: "Js.Center.Business.GatewayUpdate.PactType",
                    xtype: "combo",
                    name: "numgwtypeid",
                    fieldLabel: "<font color=red>协议类型</font>",
                    hiddenName: "numgwtypeid",
                    allowBlank: false,
                    blankText: "协议类型不允许为空",
                    readOnly: true,
                    mode: "local",
                    displayField: "vc2gwtypename",
                    valueField: "numgwtypeid",
                    triggerAction: "all",
                    emptyText: "-=请选择=-",
                    store: Js.Center.Common.GatewayTypeStore,
                    listeners: {
                        "select": function(){
                            if(this.getValue() == "1" || this.getValue() == "2" || this.getValue() == "3" || this.getValue() == "4"){
                            	Ext.getCmp("Js.Center.Business.GatewayUpdate.GroupMemberMax").maxValue=1;
                            }
                            else{
                            	Ext.getCmp("Js.Center.Business.GatewayUpdate.GroupMemberMax").maxValue=1000;
                            }
                        }
                        
                    }
                }, {
                    xtype: "numberfield",
                    name: "numgroupmembermax",
                    id:"Js.Center.Business.GatewayUpdate.GroupMemberMax",
                    fieldLabel: "<font color=red>批次手机号码数量</font>",
                    allowBlank: false,
                    blankText: "批次手机号码数量",
                    minValue: 1,
                    maxValue:1
                }]
            }]
        }]
    });
    
    //==============================================================定义窗体
    var mainForm = updateGatewaymfp.getForm();
    
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "修改网关",
        mainForm: mainForm,
        updateURL: Js.Center.Business.GatewayUpdateURL,
        displayStore: Js.Center.Business.Gateway.Infostore,
        updateState: true,
        updateRecord: row,
        items: [updateGatewaymfp],
        needLoadDataStore: true,
        loadDataStoreFunc: function(){                    	var groupMemberMax = Js.Center.Business.GatewayUpdate.window.updateRecord.get("numgwtypeid");
        	if(groupMemberMax == "1" || groupMemberMax == "2" || groupMemberMax == "3" || groupMemberMax == "4"){
            	Ext.getCmp("Js.Center.Business.GatewayUpdate.GroupMemberMax").maxValue=1;
            }
            else{
            	Ext.getCmp("Js.Center.Business.GatewayUpdate.GroupMemberMax").maxValue=1000;
            }                    },
        needButtons: false,
        buttons: [new Ext.Button({
            text: '确定',
            minWidth: 70,
            handler: function(){
                if (Js.Center.Business.GatewayUpdate.window.mainForm.isValid()) {
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
                    Js.Center.Business.GatewayUpdate.window.mainFormSubmitFunc();
                    
                }
            }
        }), new Ext.Button({
            text: '重置',
            minWidth: 70,
            qtip: "重置数据",
            handler: function(){
                Js.Center.Business.GatewayUpdate.window.mainForm.reset();
                if (Js.Center.Business.GatewayUpdate.window.updateState && Js.Center.Business.GatewayUpdate.window.updateRecord != null){ 
                    Js.Center.Business.GatewayUpdate.window.mainForm.loadRecord(Js.Center.Business.GatewayUpdate.window.updateRecord);
                }
                var groupMemberMax = Js.Center.Business.GatewayUpdate.window.updateRecord.get("numgwtypeid");
            	if(groupMemberMax == "1" || groupMemberMax == "2" || groupMemberMax == "3" || groupMemberMax == "4"){
                	Ext.getCmp("Js.Center.Business.GatewayUpdate.GroupMemberMax").maxValue=1;
                }
                else{
                	Ext.getCmp("Js.Center.Business.GatewayUpdate.GroupMemberMax").maxValue=1000;
                }
            }
        }), new Ext.Button({
            text: '取消',
            minWidth: 70,
            handler: function(){
                if (Js.Center.Business.GatewayUpdate.window.closeAction == 'close') {
                    Js.Center.Business.GatewayUpdate.window.close();
                }
                else {
                    Js.Center.Business.GatewayUpdate.window.hide();
                }
                
            }
        })]
    });
    //}
    // else 
    //    Js.Center.Business.GatewayUpdate.UpdateGatewaymWin.updateRecord = row;


    //=============================================================执行显示
    //Js.Center.Business.GatewayUpdate.UpdateGatewaymWin.show();
};
